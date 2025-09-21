// Data tiruan yang lebih detail untuk setiap proyek
// Ini akan menjadi sumber data untuk halaman detail

export interface Project {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  backers: number;
  deadline: string;
  location: string;
  category: string;
  imageUrl: string;
  gallery: string[];
  overview: string;
  highlights: { title: string; description: string }[];
  documents: { name: string; url: string }[];
  returns: { period: string; projection: string }[];
}

export const projectsData: Project[] = [
  {
    id: "warung-makan-bu-sari",
    title: "Warung Makan Bu Sari - Ekspansi Kuliner Tradisional",
    description: "Membantu Bu Sari mengembangkan warung makan tradisional dengan peralatan modern dan tempat yang lebih luas untuk melayani lebih banyak pelanggan.",
    targetAmount: 50000000,
    currentAmount: 35000000,
    backers: 128,
    deadline: "30 hari lagi",
    location: "Yogyakarta",
    category: "Kuliner",
    imageUrl: "/api/placeholder/400/300",
    gallery: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    overview: "Warung Makan Bu Sari telah menjadi ikon kuliner lokal selama lebih dari 20 tahun, menyajikan masakan Jawa otentik yang digemari masyarakat. Dengan meningkatnya permintaan, kapasitas warung saat ini tidak lagi memadai. Proyek ini bertujuan untuk melakukan renovasi dan perluasan tempat usaha, serta modernisasi peralatan dapur untuk meningkatkan efisiensi dan kapasitas produksi. Dana yang terkumpul akan digunakan untuk membangun area makan baru, membeli peralatan dapur modern, dan memperkuat strategi pemasaran digital.",
    highlights: [
      { title: "Berdiri Sejak 2002", description: "Memiliki basis pelanggan setia yang kuat dan reputasi yang baik di komunitas lokal." },
      { title: "Potensi Pertumbuhan", description: "Lokasi strategis dekat dengan area perkantoran dan kampus dengan potensi peningkatan omzet hingga 200%." },
      { title: "Pemberdayaan Lokal", description: "Menciptakan lapangan kerja baru untuk 5 orang dari masyarakat sekitar." },
    ],
    documents: [
      { name: "Proposal Bisnis Lengkap.pdf", url: "#" },
      { name: "Laporan Keuangan 2 Tahun Terakhir.xlsx", url: "#" },
      { name: "Surat Izin Usaha Perdagangan (SIUP).pdf", url: "#" },
    ],
    returns: [
        { period: "Tahun 1", projection: "Estimasi ROI 8% - 12%" },
        { period: "Tahun 2", projection: "Estimasi ROI 12% - 15%" },
        { period: "Dividen", projection: "Pembagian setiap 6 bulan" },
    ]
  },
  {
    id: "koperasi-tani-organik",
    title: "Koperasi Tani Organik Nusantara",
    description: "Mengembangkan sistem distribusi hasil panen organik langsung dari petani ke konsumen dengan teknologi modern dan packaging ramah lingkungan.",
    targetAmount: 75000000,
    currentAmount: 45000000,
    backers: 89,
    deadline: "45 hari lagi",
    location: "Malang, Jawa Timur",
    category: "Pertanian",
    imageUrl: "/api/placeholder/400/300",
    gallery: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    overview: "Proyek ini bertujuan untuk memotong rantai pasok yang panjang dan tidak efisien bagi petani organik. Dengan membangun platform digital dan pusat distribusi, kami akan menghubungkan petani langsung dengan konsumen urban, memastikan harga yang adil bagi petani dan produk segar berkualitas bagi konsumen. Dana akan digunakan untuk pengembangan aplikasi, pembangunan gudang pendingin kecil, dan armada pengiriman.",
    highlights: [
        { title: "Rantai Pasok Efisien", description: "Meningkatkan pendapatan petani hingga 30% dengan memotong tengkulak." },
        { title: "Produk Sehat & Terlacak", description: "Konsumen mendapatkan produk organik segar yang dapat dilacak asal-usulnya." },
        { title: "Pasar yang Berkembang", description: "Permintaan produk organik terus meningkat seiring kesadaran gaya hidup sehat." },
    ],
    documents: [
        { name: "Rencana Anggaran Biaya.pdf", url: "#" },
        { name: "Struktur Organisasi Koperasi.pdf", url: "#" },
    ],
    returns: [
        { period: "Skema", projection: "Bagi hasil 60% untuk petani, 20% untuk investor, 20% untuk operasional." },
        { period: "Proyeksi", projection: "Potensi imbal hasil tahunan hingga 15%." },
    ]
  },
  {
    id: "rajutan-ibu-desa-cirebon",
    title: "Rajutan Ibu-Ibu Desa Cirebon",
    description: "Memberdayakan ibu-ibu desa untuk mengembangkan usaha rajutan dengan pemasaran online dan pelatihan desain produk modern.",
    targetAmount: 25000000,
    currentAmount: 18000000,
    backers: 156,
    deadline: "20 hari lagi",
    location: "Cirebon, Jawa Barat",
    category: "Kerajinan",
    imageUrl: "/api/placeholder/400/300",
    gallery: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    overview: "Inisiatif sosial ini bertujuan untuk memberikan sumber penghasilan tambahan bagi ibu-ibu rumah tangga di Desa Cirebon melalui keahlian merajut. Dana yang terkumpul akan dialokasikan untuk pembelian bahan baku berkualitas, pelatihan desain produk dari desainer profesional, serta pembuatan toko online dan kampanye pemasaran digital untuk menjangkau pasar yang lebih luas, baik domestik maupun internasional.",
    highlights: [
        { title: "Pemberdayaan Perempuan", description: "Memberikan kemandirian finansial bagi lebih dari 50 ibu rumah tangga." },
        { title: "Kualitas Ekspor", description: "Produk rajutan tangan dengan kualitas tinggi yang siap bersaing di pasar global." },
        { title: "Dampak Sosial", description: "Setiap pembelian produk secara langsung mendukung ekonomi keluarga di pedesaan." },
    ],
    documents: [
        { name: "Katalog Produk.pdf", url: "#" },
        { name: "Studi Kelayakan Usaha.pdf", url: "#" },
    ],
    returns: [
        { period: "Sistem", projection: "Bagi hasil berdasarkan penjualan produk." },
        { period: "Proyeksi Keuntungan", projection: "Estimasi keuntungan 25% dari setiap produk terjual." },
    ]
  },
];
