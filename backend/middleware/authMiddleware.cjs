const jwt = require('jsonwebtoken');
const db = require('../db.cjs');

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Tidak ada token.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    
    // Cek apakah user ada di DB dan memiliki peran admin
    const [users] = await db.query('SELECT role FROM users WHERE id = ?', [decoded.id]);
    
    if (users.length === 0 || users[0].role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Anda bukan admin.' });
    }

    req.user = decoded; // Menyimpan data user dari token ke request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid.' });
  }
};

module.exports = { adminAuth };
