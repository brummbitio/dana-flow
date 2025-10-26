const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const db = require('../db.cjs');
const { userAuth } = require('../middleware/authMiddleware.cjs');

const router = express.Router();

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Pastikan direktori ada
    const dir = path.join(__dirname, '..', 'public', 'uploads', 'verification');
    try {
      await fs.mkdir(dir, { recursive: true });
      cb(null, dir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk pengajuan/pengajuan ulang verifikasi
router.post(
  '/submit',
  userAuth,
  upload.fields([{ name: 'ktpImage', maxCount: 1 }, { name: 'selfieImage', maxCount: 1 }]),
  async (req, res) => {
    const userId = req.user.id;
    const { nik, fullNameKtp, addressKtp } = req.body;
    const files = req.files;

    if (!nik || !fullNameKtp || !addressKtp || !files?.ktpImage?.[0] || !files?.selfieImage?.[0]) {
      return res.status(400).json({ message: 'Semua data dan file wajib diisi.' });
    }

    // --- PERUBAHAN DIMULAI DI SINI ---
    // Simpan path relatif bukan absolut
    const ktpImagePath = path.join('uploads', 'verification', files.ktpImage[0].filename);
    const selfieImagePath = path.join('uploads', 'verification', files.selfieImage[0].filename);
    // --- PERUBAHAN SELESAI DI SINI ---

    try {
      const [existing] = await db.query('SELECT * FROM user_verifications WHERE user_id = ?', [userId]);

      if (existing.length > 0) {
        const oldData = existing[0];
        // Hapus file lama menggunakan path absolut
        if (oldData.ktp_image_path) {
            const oldKtpFullPath = path.join(__dirname, '..', 'public', oldData.ktp_image_path);
            await fs.unlink(oldKtpFullPath).catch(console.error);
        }
        if (oldData.selfie_image_path) {
            const oldSelfieFullPath = path.join(__dirname, '..', 'public', oldData.selfie_image_path);
            await fs.unlink(oldSelfieFullPath).catch(console.error);
        }
        
        await db.query(
          'UPDATE user_verifications SET nik = ?, full_name_ktp = ?, address_ktp = ?, ktp_image_path = ?, selfie_image_path = ?, submission_date = NOW(), review_date = NULL, reviewed_by = NULL, notes = NULL WHERE user_id = ?',
          [nik, fullNameKtp, addressKtp, ktpImagePath, selfieImagePath, userId]
        );
      } else {
        await db.query(
          'INSERT INTO user_verifications (user_id, nik, full_name_ktp, address_ktp, ktp_image_path, selfie_image_path) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, nik, fullNameKtp, addressKtp, ktpImagePath, selfieImagePath]
        );
      }

      await db.query("UPDATE users SET status = 'pending' WHERE id = ?", [userId]);

      res.status(200).json({ message: 'Data verifikasi berhasil dikirim dan sedang ditinjau.' });
    } catch (error) {
      console.error('Error submitting verification:', error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  }
);

// Endpoint BARU: GET status verifikasi untuk pengguna yang login
router.get('/status', userAuth, async (req, res) => {
    const userId = req.user.id;
    try {
        const [verificationData] = await db.query('SELECT * FROM user_verifications WHERE user_id = ?', [userId]);
        if (verificationData.length === 0) {
            return res.status(404).json({ message: 'Anda belum mengajukan verifikasi.' });
        }
        res.json(verificationData[0]);
    } catch (error) {
        console.error('Error fetching own verification data:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

module.exports = router;

