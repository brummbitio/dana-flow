const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.cjs');
const userRoutes = require('./routes/users.cjs'); // Impor rute pengguna baru
const { adminAuth } = require('./middleware/authMiddleware.cjs'); // Impor middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// Gunakan rute pengguna baru dengan proteksi middleware admin
app.use('/api/users', adminAuth, userRoutes); 

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
