import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import StaggerContainer, { StaggerChild } from '@/components/animations/StaggerContainer';
import ArticleCard from '@/components/ArticleCard';
import { Search, TrendingUp, Clock, BookOpen } from 'lucide-react';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'semua', label: 'Semua Artikel' },
    { id: 'edukasi', label: 'Edukasi' },
    { id: 'cerita-sukses', label: 'Cerita Sukses' },
    { id: 'regulasi', label: 'Regulasi' },
    { id: 'tips', label: 'Tips & Strategi' },
    { id: 'berita', label: 'Berita Terkini' }
  ];

  // Extended mock data for articles
  const allArticles = [
    {
      title: "Tips Memulai Investasi di Koperasi Digital untuk Pemula",
      excerpt: "Panduan lengkap untuk memahami investasi koperasi digital, mulai dari dasar-dasar hingga strategi yang tepat untuk pemula yang ingin memulai journey investasi.",
      author: "Dr. Siti Nurhaliza",
      publishDate: "15 Mar 2024",
      category: "Edukasi",
      imageUrl: "/api/placeholder/400/300",
      readTime: "5 min baca"
    },
    {
      title: "Kisah Sukses UMKM yang Berkembang Berkat Urunan Dana",
      excerpt: "Mengenal lebih dekat perjalanan UMKM lokal yang berhasil berkembang pesat melalui platform urunan dana komunitas dan mencapai omzet jutaan rupiah.",
      author: "Ahmad Rizki",
      publishDate: "12 Mar 2024",
      category: "Cerita Sukses",
      imageUrl: "/api/placeholder/400/300",
      readTime: "7 min baca"
    },
    {
      title: "Regulasi Terbaru OJK untuk Platform Koperasi Digital",
      excerpt: "Update terkini mengenai regulasi dan kebijakan OJK yang perlu diketahui oleh pengguna platform koperasi digital untuk memastikan keamanan investasi.",
      author: "Lisa Wulandari, S.H.",
      publishDate: "10 Mar 2024",
      category: "Regulasi",
      imageUrl: "/api/placeholder/400/300",
      readTime: "4 min baca"
    },
    {
      title: "Strategi Diversifikasi Portfolio dalam Investasi Koperasi",
      excerpt: "Pelajari cara mendiversifikasi portfolio investasi Anda di platform koperasi untuk memaksimalkan return sambil meminimalkan risiko.",
      author: "Budi Hartono, CFA",
      publishDate: "8 Mar 2024",
      category: "Tips",
      imageUrl: "/api/placeholder/400/300",
      readTime: "6 min baca"
    },
    {
      title: "Pertumbuhan Ekonomi Digital di Indonesia 2024",
      excerpt: "Analisis mendalam tentang pertumbuhan sektor ekonomi digital Indonesia dan peluang investasi di sektor UMKM digital.",
      author: "Prof. Maya Indira",
      publishDate: "5 Mar 2024",
      category: "Berita",
      imageUrl: "/api/placeholder/400/300",
      readTime: "8 min baca"
    },
    {
      title: "Cara Memilih Projek Investasi yang Tepat",
      excerpt: "Panduan praktis untuk mengevaluasi dan memilih projek investasi yang sesuai dengan profil risiko dan tujuan keuangan Anda.",
      author: "Andi Setiawan",
      publishDate: "3 Mar 2024",
      category: "Tips",
      imageUrl: "/api/placeholder/400/300",
      readTime: "5 min baca"
    },
    {
      title: "Transformasi Digital UMKM: Dari Offline ke Online",
      excerpt: "Studi kasus transformasi digital berbagai UMKM yang berhasil meningkatkan penjualan hingga 300% melalui digitalisasi proses bisnis.",
      author: "Rina Sari",
      publishDate: "1 Mar 2024",
      category: "Cerita Sukses",
      imageUrl: "/api/placeholder/400/300",
      readTime: "9 min baca"
    },
    {
      title: "Memahami Risiko dan Mitigasi dalam Investasi Koperasi",
      excerpt: "Pelajari berbagai jenis risiko dalam investasi koperasi dan strategi mitigasi yang dapat Anda terapkan untuk melindungi investasi.",
      author: "Dr. Bambang Sutrisno",
      publishDate: "28 Feb 2024",
      category: "Edukasi",
      imageUrl: "/api/placeholder/400/300",
      readTime: "7 min baca"
    },
    {
      title: "Dampak Positif Koperasi Digital terhadap Ekonomi Lokal",
      excerpt: "Penelitian terbaru menunjukkan bagaimana platform koperasi digital berkontribusi terhadap pertumbuhan ekonomi lokal dan pemberdayaan masyarakat.",
      author: "Tim Riset KoperasiKu",
      publishDate: "25 Feb 2024",
      category: "Berita",
      imageUrl: "/api/placeholder/400/300",
      readTime: "6 min baca"
    }
  ];

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === 'semua' || 
      article.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = allArticles[0];
  const stats = [
    { label: "Total Artikel", value: "150+", icon: BookOpen },
    { label: "Pembaca Bulanan", value: "25K+", icon: TrendingUp },
    { label: "Artikel Terbaru", value: "10", icon: Clock }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge variant="secondary" className="mb-4 bg-accent-purple text-accent-purple-foreground">
                  📰 Knowledge Hub
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Insight & Berita
                  <span className="text-primary block">Terkini</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Dapatkan pengetahuan mendalam tentang investasi koperasi, 
                  cerita sukses UMKM, dan update terbaru dari dunia ekonomi digital.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-center"
                    >
                      <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="font-bold text-2xl text-card-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Featured Article */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="glass-card p-6 rounded-xl">
                  <Badge className="mb-4 bg-primary text-primary-foreground">Artikel Unggulan</Badge>
                  <ArticleCard {...featuredArticle} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Search Section */}
      <AnimateOnScroll>
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Cari artikel berdasarkan judul atau konten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Categories */}
      <AnimateOnScroll>
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="font-medium"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredArticles.length} Artikel Ditemukan
            </h2>
            <div className="text-sm text-muted-foreground">
              Urutkan: Terbaru
            </div>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <StaggerChild key={index}>
                <ArticleCard {...article} />
              </StaggerChild>
            ))}
          </StaggerContainer>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="glass-card p-12 rounded-xl max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">Artikel Tidak Ditemukan</h3>
                <p className="text-muted-foreground mb-6">
                  Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('semua');
                }}>
                  Reset Filter
                </Button>
              </div>
            </div>
          )}

          {/* Newsletter Subscription */}
          <AnimateOnScroll>
            <div className="glass-card p-8 rounded-xl mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">Jangan Lewatkan Update Terbaru</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Berlangganan newsletter kami untuk mendapatkan artikel terbaru, 
                tips investasi, dan insight eksklusif langsung di inbox Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Masukkan email Anda" className="flex-1" />
                <Button>Berlangganan</Button>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Muat Lebih Banyak Artikel
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;