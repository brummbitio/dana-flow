const jwt = require('jsonwebtoken');
const db = require('../db.cjs');

// Middleware untuk memastikan pengguna adalah admin
const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Tidak ada token.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    
    const [users] = await db.query('SELECT role FROM users WHERE id = ?', [decoded.id]);
    
    if (users.length === 0 || users[0].role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Anda bukan admin.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid.' });
  }
};

// Middleware untuk memastikan pengguna sudah login (peran apa pun)
const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Tidak ada token.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    
    const [users] = await db.query('SELECT id FROM users WHERE id = ?', [decoded.id]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Pengguna tidak ditemukan.' });
    }

    req.user = decoded; // Menyimpan data user (id, email, role) dari token
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid.' });
  }
};


module.exports = { adminAuth, userAuth };
