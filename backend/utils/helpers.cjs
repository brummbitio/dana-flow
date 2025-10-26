const db = require('../db.cjs'); // Asumsi db.cjs ada di level atas

// Fungsi sederhana untuk membuat slug
// Di aplikasi production, pertimbangkan library seperti slugify
// atau penanganan karakter unicode yang lebih baik
const generateBasicSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Ganti non-alfanumerik dengan strip
        .replace(/^-+|-+$/g, '');   // Hapus strip di awal/akhir
};

// Fungsi untuk membuat slug unik dengan mengecek ke database
const generateSlug = async (title, connection) => {
    const baseSlug = generateBasicSlug(title);
    let slug = baseSlug;
    let counter = 1;
    let isUnique = false;

    // Gunakan koneksi yang sudah ada jika dalam transaksi
    const queryRunner = connection || db;

    while (!isUnique) {
        const [existing] = await queryRunner.query('SELECT id FROM projects WHERE slug = ?', [slug]);
        if (existing.length === 0) {
            isUnique = true;
        } else {
            counter++;
            slug = `${baseSlug}-${counter}`;
        }
    }
    return slug;
};

module.exports = {
    generateSlug
};
