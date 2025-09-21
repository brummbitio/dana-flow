import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import AnimateOnScroll from '../components/animations/AnimateOnScroll';
import StaggerContainer, { StaggerChild } from '../components/animations/StaggerContainer';
import ArticleCard from '../components/ArticleCard';
import { articlesData } from '../data/articles'; // Import data terpusat
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

  // Gunakan data dari articles.ts
  const allArticles = articlesData;

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
            {filteredArticles.map((article) => (
              <StaggerChild key={article.id}>
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