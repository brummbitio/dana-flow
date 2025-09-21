export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  imageUrl: string;
  readTime: string;
  content: string; // Konten lengkap artikel
}

export const articlesData: Article[] = [
  {
    id: "tips-investasi-koperasi-digital",
    title: "Tips Memulai Investasi di Koperasi Digital untuk Pemula",
    excerpt: "Panduan lengkap untuk memahami investasi koperasi digital, mulai dari dasar-dasar hingga strategi yang tepat untuk pemula yang ingin memulai journey investasi.",
    author: "Dr. Siti Nurhaliza",
    publishDate: "15 Mar 2024",
    category: "Edukasi",
    imageUrl: "https://placehold.co/1200x600/2563EB/FFFFFF?text=Investasi+Digital",
    readTime: "5 min baca",
    content: `
      <p>Investasi di koperasi digital telah menjadi alternatif menarik bagi banyak orang, terutama bagi mereka yang ingin mendukung usaha kecil dan menengah (UMKM) sambil mendapatkan imbal hasil yang kompetitif. Namun, bagi pemula, dunia ini mungkin tampak membingungkan. Artikel ini akan memandu Anda melalui langkah-langkah awal untuk memulai investasi di platform seperti KoperasiKu.</p>
      <h2>1. Pahami Konsep Dasar Koperasi Digital</h2>
      <p>Koperasi digital pada dasarnya adalah platform teknologi finansial (fintech) yang menerapkan prinsip-prinsip koperasi. Platform ini menghubungkan investor (anggota) dengan peminjam (biasanya UMKM) yang membutuhkan dana untuk pengembangan usaha. Sebagai investor, Anda memberikan pinjaman dan akan menerima imbal hasil berupa bunga atau bagi hasil sesuai dengan kesepakatan.</p>
      <h2>2. Lakukan Riset dan Pilih Platform Terpercaya</h2>
      <p>Tidak semua platform diciptakan sama. Pastikan platform yang Anda pilih, seperti KoperasiKu, telah terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK). Ini adalah jaminan keamanan pertama bagi dana Anda. Periksa juga rekam jejak, ulasan pengguna, dan transparansi yang ditawarkan oleh platform tersebut.</p>
      <h2>3. Mulai dengan Modal Kecil dan Diversifikasi</h2>
      <p>Sebagai pemula, jangan terburu-buru menginvestasikan seluruh dana Anda pada satu proyek. Mulailah dengan modal kecil yang Anda siap jika terjadi risiko. Sebar investasi Anda ke beberapa proyek di sektor yang berbeda (diversifikasi). Ini akan membantu meminimalkan risiko jika salah satu proyek mengalami kendala.</p>
      <p>Dengan mengikuti langkah-langkah ini, Anda dapat memulai perjalanan investasi Anda di dunia koperasi digital dengan lebih percaya diri dan terinformasi. Selamat berinvestasi!</p>
    `
  },
  {
    id: "kisah-sukses-umkm-urunan-dana",
    title: "Kisah Sukses UMKM yang Berkembang Berkat Urunan Dana",
    excerpt: "Mengenal lebih dekat perjalanan UMKM lokal yang berhasil berkembang pesat melalui platform urunan dana komunitas dan mencapai omzet jutaan rupiah.",
    author: "Ahmad Rizki",
    publishDate: "12 Mar 2024",
    category: "Cerita Sukses",
    imageUrl: "https://placehold.co/1200x600/10B981/FFFFFF?text=Kisah+Sukses",
    readTime: "7 min baca",
    content: `
      <p>Di tengah persaingan bisnis yang ketat, akses permodalan seringkali menjadi tantangan terbesar bagi UMKM. Namun, berkat inovasi di bidang fintech, platform urun dana seperti KoperasiKu telah membuka pintu peluang baru. Salah satu contohnya adalah "Kopi Senja", sebuah kedai kopi kecil di sudut kota Malang.</p>
      <p>Bapak Budi, sang pemilik, bermimpi untuk memperluas usahanya namun terhalang oleh modal. Melalui KoperasiKu, ia berhasil mengumpulkan dana sebesar Rp 75.000.000 dari 89 investor komunitas. Dana tersebut digunakannya untuk membeli mesin kopi baru, merenovasi interior, dan meluncurkan kampanye pemasaran digital.</p>
      <p>Hasilnya luar biasa. Dalam enam bulan, omzet "Kopi Senja" meningkat hingga 200%. Kisah Bapak Budi adalah bukti nyata bagaimana kekuatan kolektif dari komunitas investor dapat secara langsung memberdayakan dan mengangkat perekonomian lokal.</p>
    `
  },
  {
    id: "regulasi-terbaru-ojk",
    title: "Regulasi Terbaru OJK untuk Platform Koperasi Digital",
    excerpt: "Update terkini mengenai regulasi dan kebijakan OJK yang perlu diketahui oleh pengguna platform koperasi digital untuk memastikan keamanan investasi.",
    author: "Lisa Wulandari, S.H.",
    publishDate: "10 Mar 2024",
    category: "Regulasi",
    imageUrl: "https://placehold.co/1200x600/8B5CF6/FFFFFF?text=Regulasi+OJK",
    readTime: "4 min baca",
    content: `
      <p>Otoritas Jasa Keuangan (OJK) terus memperbarui regulasi untuk melindungi konsumen dan menjaga stabilitas sektor jasa keuangan, termasuk platform koperasi digital. Peraturan terbaru, POJK Nomor 10/POJK.05/2022, menekankan pentingnya transparansi, manajemen risiko, dan tata kelola yang baik bagi penyelenggara.</p>
      <p>Beberapa poin penting yang perlu diperhatikan investor adalah kewajiban platform untuk melakukan penilaian kredit yang ketat terhadap peminjam dan menyediakan informasi yang jelas mengenai risiko setiap proyek pendanaan. Sebagai investor, pastikan Anda hanya menggunakan platform yang patuh terhadap regulasi ini untuk keamanan dana Anda.</p>
    `
  },
  {
    id: "strategi-diversifikasi-portfolio",
    title: "Strategi Diversifikasi Portfolio dalam Investasi Koperasi",
    excerpt: "Pelajari cara mendiversifikasi portfolio investasi Anda di platform koperasi untuk memaksimalkan return sambil meminimalkan risiko.",
    author: "Budi Hartono, CFA",
    publishDate: "8 Mar 2024",
    category: "Tips",
    imageUrl: "https://placehold.co/1200x600/F59E0B/FFFFFF?text=Strategi+Investasi",
    readTime: "6 min baca",
    content: "<p>Konten lengkap tentang strategi diversifikasi akan ditambahkan di sini.</p>"
  },
  {
    id: "pertumbuhan-ekonomi-digital-2024",
    title: "Pertumbuhan Ekonomi Digital di Indonesia 2024",
    excerpt: "Analisis mendalam tentang pertumbuhan sektor ekonomi digital Indonesia dan peluang investasi di sektor UMKM digital.",
    author: "Prof. Maya Indira",
    publishDate: "5 Mar 2024",
    category: "Berita",
    imageUrl: "https://placehold.co/1200x600/EC4899/FFFFFF?text=Ekonomi+Digital",
    readTime: "8 min baca",
    content: "<p>Konten lengkap tentang pertumbuhan ekonomi digital akan ditambahkan di sini.</p>"
  },
];
