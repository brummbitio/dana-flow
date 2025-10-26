const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth.cjs');
const userRoutes = require('./routes/users.cjs');
const verificationRoutes = require('./routes/verification.cjs');
const projectRoutes = require('./routes/projects.cjs'); // <-- Import rute proyek baru
const { adminAuth } = require('./middleware/authMiddleware.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Rute users sekarang TIDAK perlu adminAuth di sini karena sudah ada di dalam filenya
app.use('/api/verification', verificationRoutes);
app.use('/api/projects', projectRoutes); // <-- Daftarkan rute proyek baru (sudah ada adminAuth di dalam filenya)

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
