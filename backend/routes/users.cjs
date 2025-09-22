const express = require('express');
const db = require('../db.cjs');

const router = express.Router();

// GET semua pengguna (kecuali admin)
router.get('/', async (req, res) => {
  try {
    // REVISI: Menambahkan klausa WHERE untuk tidak menyertakan admin
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


// PUT untuk update status pengguna
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['unverified', 'pending', 'verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid.' });
  }

  try {
    await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: `Status pengguna berhasil diubah menjadi ${status}` });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});


module.exports = router;

