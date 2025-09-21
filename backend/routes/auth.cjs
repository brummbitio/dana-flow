const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db.cjs'); // Perbarui path ini

const router = express.Router();

// Endpoint untuk Registrasi
router.post('/register', async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Nama lengkap, email, dan password dibutuhkan.' });
  }

  try {
    // Cek jika email sudah ada
    const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user baru
    await db.query('INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)', [
      fullName,
      email,
      phone,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'Registrasi berhasil!' });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// Endpoint untuk Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password dibutuhkan.' });
  }

  try {
    // Cek user berdasarkan email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const user = users[0];

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Buat JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1d',
    });
    
    // Hapus password dari objek user sebelum dikirim ke client
    delete user.password;

    res.json({ token, user });
  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;
