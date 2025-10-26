const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const db = require('../db.cjs');
const { adminAuth } = require('../middleware/authMiddleware.cjs');
const { generateSlug } = require('../utils/helpers.cjs');

const router = express.Router();

// --- Konfigurasi Multer ---
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let subFolder = 'images'; // Default for imageUrl and galleryImages
    if (file.fieldname === 'projectDocuments') {
      subFolder = 'documents';
    }
    const dir = path.join(__dirname, '..', 'public', 'uploads', 'projects', subFolder);
    try {
      await fs.mkdir(dir, { recursive: true });
      cb(null, dir);
    } catch (error) {
      console.error("Error creating upload directory:", error);
      cb(error instanceof Error ? error : new Error('Failed to create directory'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Batas ukuran file 10MB
    fileFilter: (req, file, cb) => {
        // Filter sederhana untuk gambar dan PDF
        if (file.fieldname === 'projectDocuments') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Hanya file PDF yang diizinkan untuk dokumen!'));
            }
        } else { // Untuk imageUrl dan galleryImages
             if (['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Hanya file PNG, JPG, WEBP yang diizinkan untuk gambar!'));
            }
        }
    }
});

// Middleware Multer untuk field spesifik
const projectUploadMiddleware = upload.fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'galleryImages', maxCount: 10 },
    { name: 'projectDocuments', maxCount: 5 }
]);
// --- Akhir Konfigurasi Multer ---

// === GET /api/projects/public - Mengambil Daftar Proyek Publik ===
router.get('/public', async (req, res) => {
  const { limit } = req.query;
  try {
    let query = 'SELECT id, title, slug, description, category, target_amount, current_amount, backers, deadline, status, image_url, location FROM projects WHERE status = ? OR status = ? ORDER BY created_at DESC';
    const queryParams = ['Pendanaan', 'Aktif'];

    if (limit && !isNaN(parseInt(limit))) {
      query += ' LIMIT ?';
      queryParams.push(parseInt(limit));
    }

    const [projects] = await db.query(query, queryParams);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching public projects:', error);
    res.status(500).json({ message: 'Gagal mengambil daftar proyek.' });
  }
});

// === GET /api/projects/public/:slug - Mengambil Detail Proyek Publik ===
router.get('/public/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const [projects] = await db.query('SELECT * FROM projects WHERE slug = ? AND (status = ? OR status = ?)', [slug, 'Pendanaan', 'Aktif']);

    if (projects.length === 0) {
      return res.status(404).json({ message: 'Proyek tidak ditemukan.' });
    }

    const project = projects[0];

    // Ambil data terkait (kecuali documents untuk publik)
    const [galleries] = await db.query('SELECT id, image_url, caption FROM project_galleries WHERE project_id = ?', [project.id]);
    const [highlights] = await db.query('SELECT id, title, description FROM project_highlights WHERE project_id = ?', [project.id]);
    const [returns] = await db.query('SELECT id, period, projection FROM project_returns WHERE project_id = ?', [project.id]);

    res.json({
      project,
      galleries,
      highlights,
      returns
    });
  } catch (error) {
    console.error(`Error fetching public project detail for slug ${slug}:`, error);
    res.status(500).json({ message: 'Gagal mengambil detail proyek.' });
  }
});

// === GET /api/projects - Mengambil Daftar Proyek ===
router.get('/', adminAuth, async (req, res) => {
  const { status } = req.query;
  try {
    let query = 'SELECT id, title, slug, category, target_amount, current_amount, backers, deadline, status, image_url FROM projects';
    const queryParams = [];

    if (status && status !== 'Semua') {
      query += ' WHERE status = ?';
      queryParams.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [projects] = await db.query(query, queryParams);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Gagal mengambil daftar proyek.' });
  }
});

// === POST /api/projects - Membuat Proyek Baru ===
router.post('/', adminAuth, projectUploadMiddleware, async (req, res) => {
    // Gunakan transaksi
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const { title, description, overview, target_amount, deadline, location, category, status, highlights, returns } = req.body;
        const created_by = req.user?.id; // Ambil ID admin dari token

        // Validasi dasar
        if (!title || !target_amount || !overview || !category) {
            await connection.rollback(); // Batalkan transaksi
            return res.status(400).json({ message: 'Judul, Kategori, Overview, dan Target Dana wajib diisi.' });
        }

        // Generate slug
        const slug = await generateSlug(title, connection); // Kirim connection untuk cek duplikat

        // Proses path file
        const imageUrlPath = req.files?.imageUrl ? path.join('uploads', 'projects', 'images', req.files.imageUrl[0].filename) : null;
        const galleryImagePaths = req.files?.galleryImages ? req.files.galleryImages.map(file => path.join('uploads', 'projects', 'gallery', file.filename)) : [];
        const documentPaths = req.files?.projectDocuments ? req.files.projectDocuments.map(file => ({
            name: file.originalname,
            url: path.join('uploads', 'projects', 'documents', file.filename)
        })) : [];

        // Insert ke tabel projects
        const [projectResult] = await connection.query(
            'INSERT INTO projects (title, slug, description, overview, target_amount, deadline, location, category, image_url, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, slug, description || null, overview, target_amount, deadline || null, location || null, category, imageUrlPath, status || 'Draft', created_by || null]
        );

        // Ambil ID proyek yang baru dibuat
        const projectId = projectResult.insertId;
        if (!projectId) {
            throw new Error('Gagal mendapatkan ID proyek baru.');
        }

        // Insert galeri
        if (galleryImagePaths.length > 0) {
            const galleryValues = galleryImagePaths.map(imgPath => [projectId, imgPath]);
            await connection.query('INSERT INTO project_galleries (project_id, image_url) VALUES ?', [galleryValues]);
        }

        // Insert highlights
        if (highlights) {
             try {
                const parsedHighlights = JSON.parse(highlights);
                if (Array.isArray(parsedHighlights) && parsedHighlights.length > 0) {
                    const highlightValues = parsedHighlights.map(h => [projectId, h.title, h.description]);
                    await connection.query('INSERT INTO project_highlights (project_id, title, description) VALUES ?', [highlightValues]);
                }
            } catch (e) { console.error("Error parsing highlights JSON:", e); /* Abaikan jika parsing gagal */ }
        }


        // Insert documents
        if (documentPaths.length > 0) {
            const documentValues = documentPaths.map(doc => [projectId, doc.name, doc.url]);
            await connection.query('INSERT INTO project_documents (project_id, name, file_url) VALUES ?', [documentValues]);
        }

        // Insert returns
         if (returns) {
             try {
                const parsedReturns = JSON.parse(returns);
                if (Array.isArray(parsedReturns) && parsedReturns.length > 0) {
                    const returnValues = parsedReturns.map(r => [projectId, r.period, r.projection]);
                    await connection.query('INSERT INTO project_returns (project_id, period, projection) VALUES ?', [returnValues]);
                }
            } catch (e) { console.error("Error parsing returns JSON:", e); /* Abaikan jika parsing gagal */ }
        }


        // Commit transaksi jika semua berhasil
        await connection.commit();
        res.status(201).json({ message: 'Proyek berhasil dibuat.', projectId: projectId });

    } catch (error) {
        // Rollback jika ada error
        await connection.rollback();
        console.error('Error creating project:', error);

        // Hapus file yang sudah terupload jika terjadi error database
        const filesToDelete = [];
        if (req.files?.imageUrl) filesToDelete.push(req.files.imageUrl[0].path);
        if (req.files?.galleryImages) req.files.galleryImages.forEach(f => filesToDelete.push(f.path));
        if (req.files?.projectDocuments) req.files.projectDocuments.forEach(f => filesToDelete.push(f.path));

        for (const filePath of filesToDelete) {
            try {
                await fs.unlink(filePath);
            } catch (unlinkError) {
                console.error(`Failed to delete uploaded file ${filePath} after error:`, unlinkError);
            }
        }

        if (error instanceof multer.MulterError) {
             res.status(400).json({ message: `Kesalahan upload: ${error.message}` });
        } else if (error.message.includes('duplikat')) { // Cek pesan error slug duplikat
             res.status(409).json({ message: error.message });
        } else {
             res.status(500).json({ message: error.message || 'Gagal membuat proyek.' });
        }
    } finally {
        // Selalu release koneksi
        connection.release();
    }
});


// === GET /api/projects/:id - Mengambil Detail Proyek ===
router.get('/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const [projects] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);

    // *** PERBAIKAN: Cek jika proyek tidak ditemukan ***
    if (projects.length === 0) {
        return res.status(404).json({ message: 'Proyek tidak ditemukan.' });
    }
    const project = projects[0];

    // Ambil data terkait
    const [galleries] = await db.query('SELECT id, image_url, caption FROM project_galleries WHERE project_id = ?', [id]);
    const [highlights] = await db.query('SELECT id, title, description FROM project_highlights WHERE project_id = ?', [id]);
    const [documents] = await db.query('SELECT id, name, file_url FROM project_documents WHERE project_id = ?', [id]);
    const [returns] = await db.query('SELECT id, period, projection FROM project_returns WHERE project_id = ?', [id]);

    res.json({
        project,
        galleries,
        highlights,
        documents,
        returns
    });
  } catch (error) {
    console.error(`Error fetching project detail for ID ${id}:`, error);
    res.status(500).json({ message: 'Gagal mengambil detail proyek.' });
  }
});


// === PUT /api/projects/:id - Mengupdate Proyek ===
// Catatan: Endpoint PUT ini belum sepenuhnya mengimplementasikan penghapusan/penambahan file galeri/dokumen
// dan update highlights/returns. Ini hanya contoh dasar untuk update data utama.
router.put('/:id', adminAuth, projectUploadMiddleware, async (req, res) => {
    const { id } = req.params;
    // Gunakan transaksi
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const { title, description, overview, target_amount, deadline, location, category, status /*, highlights, returns, deletedGalleryIds, deletedDocumentIds, etc... */ } = req.body;

        // 1. Ambil data proyek yang ada
        const [existingProjects] = await connection.query('SELECT image_url FROM projects WHERE id = ?', [id]);
        if (existingProjects.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Proyek tidak ditemukan.' });
        }
        const existingProject = existingProjects[0];

        // 2. Generate slug baru jika judul berubah (opsional, pertimbangkan dampaknya)
        // const slug = title ? await generateSlug(title, connection, id) : undefined; // generateSlug perlu dimodifikasi untuk exclude ID saat cek duplikat

        // 3. Proses path file baru (jika ada)
        let newImageUrlPath = undefined;
        let oldImageUrlPath = existingProject.image_url;
        if (req.files?.imageUrl) {
            newImageUrlPath = path.join('uploads', 'projects', 'images', req.files.imageUrl[0].filename);
        }

        // 4. Update tabel projects
        const updateFields = {};
        if (title) updateFields.title = title;
        // if (slug) updateFields.slug = slug;
        if (description !== undefined) updateFields.description = description;
        if (overview !== undefined) updateFields.overview = overview;
        if (target_amount !== undefined) updateFields.target_amount = target_amount;
        if (deadline !== undefined) updateFields.deadline = deadline;
        if (location !== undefined) updateFields.location = location;
        if (category !== undefined) updateFields.category = category;
        if (status !== undefined) updateFields.status = status;
        if (newImageUrlPath !== undefined) updateFields.image_url = newImageUrlPath; // Gunakan path baru

        // Hanya update jika ada field yang dikirim
        if (Object.keys(updateFields).length > 0) {
            await connection.query('UPDATE projects SET ? WHERE id = ?', [updateFields, id]);
        }

        // TODO: Implementasi logika update/delete/insert untuk galeri, highlights, documents, returns
        // Ini lebih kompleks karena perlu membandingkan data lama dan baru, menghapus file fisik, dll.

        // Commit transaksi
        await connection.commit();

        // Hapus gambar utama lama JIKA gambar baru diupload
        if (newImageUrlPath && oldImageUrlPath) {
             try {
                const oldFullPath = path.join(__dirname, '..', 'public', oldImageUrlPath);
                await fs.unlink(oldFullPath);
                console.log("Deleted old main image:", oldFullPath);
             } catch (unlinkError) {
                 console.error(`Failed to delete old main image ${oldImageUrlPath}:`, unlinkError);
                 // Tidak perlu mengembalikan error ke user jika hanya gagal hapus file lama
             }
        }

        res.json({ message: 'Proyek berhasil diperbarui (data dasar).' });

    } catch (error) {
        await connection.rollback();
        console.error(`Error updating project ID ${id}:`, error);

        // Hapus file baru yang mungkin terupload jika error
        const filesToDelete = [];
        if (req.files?.imageUrl) filesToDelete.push(req.files.imageUrl[0].path);
        // Tambahkan galeri & dokumen baru jika sudah dihandle di atas
        for (const filePath of filesToDelete) {
             try { await fs.unlink(filePath); } catch (e) { console.error("Failed to delete new file on error:", e); }
        }

        res.status(500).json({ message: error.message || 'Gagal memperbarui proyek.' });
    } finally {
        connection.release();
    }
});


// === DELETE /api/projects/:id - Menghapus Proyek ===
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        // 1. Ambil path semua file terkait SEBELUM menghapus dari DB
        const [projects] = await connection.query('SELECT image_url FROM projects WHERE id = ?', [id]);
        if (projects.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Proyek tidak ditemukan.' });
        }
        const mainImagePath = projects[0].image_url;

        const [galleries] = await connection.query('SELECT image_url FROM project_galleries WHERE project_id = ?', [id]);
        const galleryPaths = galleries.map(g => g.image_url);

        const [documents] = await connection.query('SELECT file_url FROM project_documents WHERE project_id = ?', [id]);
        const documentPaths = documents.map(d => d.file_url);

        // 2. Hapus data dari database (CASCADE akan menangani tabel terkait)
        const [deleteResult] = await connection.query('DELETE FROM projects WHERE id = ?', [id]);

        if (deleteResult.affectedRows === 0) {
             throw new Error('Proyek tidak ditemukan atau gagal dihapus dari database.');
        }

        // 3. Commit transaksi database
        await connection.commit();

        // 4. Hapus file fisik (setelah commit DB berhasil)
        const filesToDelete = [];
        if (mainImagePath) filesToDelete.push(mainImagePath);
        filesToDelete.push(...galleryPaths);
        filesToDelete.push(...documentPaths);

        for (const relativePath of filesToDelete) {
            if (relativePath) { // Pastikan path tidak null/kosong
                 try {
                    const fullPath = path.join(__dirname, '..', 'public', relativePath);
                    await fs.unlink(fullPath);
                    console.log("Deleted file:", fullPath);
                 } catch (unlinkError) {
                     // Log error tapi jangan gagalkan respons utama jika DB sudah terhapus
                    console.error(`Failed to delete file ${relativePath}:`, unlinkError);
                 }
            }
        }

        // Mengirim respons 204 No Content yang lebih sesuai untuk DELETE sukses
        res.status(204).send();
        // Atau jika ingin mengirim pesan:
        // res.json({ message: 'Proyek berhasil dihapus.' });

    } catch (error) {
        await connection.rollback();
        console.error(`Error deleting project ID ${id}:`, error);
        res.status(500).json({ message: error.message || 'Gagal menghapus proyek.' });
    } finally {
        connection.release();
    }
});

module.exports = router;