const express = require('express');
const db = require('../db.cjs');

const router = express.Router();

// GET semua pengguna (kecuali admin)
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, fullName, email, createdAt, status, role FROM users WHERE role != 'admin'");
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// GET detail satu pengguna
router.get('/:id', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, fullName, email, phone, createdAt, status, role FROM users WHERE id = ?', [req.params.id]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        res.json(users[0]);
    } catch (error) {
        console.error('Error fetching user detail:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// GET data verifikasi untuk seorang pengguna (oleh admin)
router.get('/:id/verification', async (req, res) => {
    try {
        const [verificationData] = await db.query('SELECT * FROM user_verifications WHERE user_id = ?', [req.params.id]);
        if (verificationData.length === 0) {
            return res.status(404).json({ message: 'Data verifikasi tidak ditemukan.' });
        }
        res.json(verificationData[0]);
    } catch (error) {
        console.error('Error fetching verification data:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});


// PUT untuk update status pengguna (oleh admin)
router.put('/:id/status', async (req, res) => {
  const { status, notes } = req.body; // Ambil 'notes' dari body
  const { id } = req.params;
  const adminId = req.user.id; // ID admin yang melakukan aksi

  if (!['unverified', 'pending', 'verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid.' });
  }

  // Jika status ditolak, 'notes' wajib diisi
  if (status === 'rejected' && !notes) {
      return res.status(400).json({ message: 'Alasan penolakan wajib diisi.' });
  }

  try {
    // 1. Update status di tabel 'users'
    await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);

    // 2. Jika ditolak, simpan catatan di tabel 'user_verifications'
    if (status === 'rejected') {
        await db.query(
            'UPDATE user_verifications SET review_date = NOW(), reviewed_by = ?, notes = ? WHERE user_id = ?',
            [adminId, notes, id]
        );
    } else if (status === 'verified') {
        // Jika diterima, kosongkan catatan sebelumnya
         await db.query(
            'UPDATE user_verifications SET review_date = NOW(), reviewed_by = ?, notes = NULL WHERE user_id = ?',
            [adminId, id]
        );
    }

    res.json({ message: `Status pengguna berhasil diubah menjadi ${status}` });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});


module.exports = router;

