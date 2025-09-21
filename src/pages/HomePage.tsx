import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import StaggerContainer, { StaggerChild } from '@/components/animations/StaggerContainer';
import ProjectCard from '@/components/ProjectCard';
import ArticleCard from '@/components/ArticleCard';
import { projectsData } from '@/data/projects'; // Import data baru
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  ArrowRight,
  Play,
  CheckCircle,
  Quote
} from 'lucide-react';

const HomePage = () => {
  // Gunakan 3 proyek pertama dari data baru
  const featuredProjects = projectsData.slice(0, 3);

  // Mock data for articles
  const latestArticles = [
    {
      title: "Tips Memulai Investasi di Koperasi Digital untuk Pemula",
      excerpt: "Panduan lengkap untuk memahami investasi koperasi digital, mulai dari dasar-dasar hingga strategi yang tepat untuk pemula.",
      author: "Dr. Siti Nurhaliza",
      publishDate: "15 Mar 2024",
      category: "Edukasi",
      imageUrl: "/api/placeholder/400/300",
      readTime: "5 min baca"
    },
    {
      title: "Kisah Sukses UMKM yang Berkembang Berkat Urunan Dana",
      excerpt: "Mengenal lebih dekat perjalanan UMKM lokal yang berhasil berkembang pesat melalui platform urunan dana komunitas.",
      author: "Ahmad Rizki",
      publishDate: "12 Mar 2024",
      category: "Cerita Sukses",
      imageUrl: "/api/placeholder/400/300",
      readTime: "7 min baca"
    },
    {
      title: "Regulasi Terbaru OJK untuk Platform Koperasi Digital",
      excerpt: "Update terkini mengenai regulasi dan kebijakan OJK yang perlu diketahui oleh pengguna platform koperasi digital.",
      author: "Lisa Wulandari, S.H.",
      publishDate: "10 Mar 2024",
      category: "Regulasi",
      imageUrl: "/api/placeholder/400/300",
      readTime: "4 min baca"
    }
  ];

  const stats = [
    { label: "Total Pendanaan", value: "Rp 2.5B", icon: TrendingUp },
    { label: "Anggota Aktif", value: "15,000+", icon: Users },
    { label: "Projek Sukses", value: "1,200+", icon: CheckCircle },
    { label: "Tingkat Sukses", value: "95%", icon: Shield }
  ];

  const features = [
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      description: "Platform resmi yang diawasi OJK dengan sistem keamanan berlapis"
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      description: "Pencairan dana dan verifikasi projek dalam waktu 24 jam"
    },
    {
      icon: Users,
      title: "Komunitas Solid",
      description: "Bergabung dengan ribuan anggota koperasi dari seluruh Indonesia"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-accent-green text-accent-green-foreground">
                  🚀 Platform Koperasi Digital Terpercaya
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Wujudkan Impian
                  <span className="text-primary block">Bersama Komunitas</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Bergabunglah dengan ribuan anggota koperasi untuk mendukung UMKM, 
                  berinvestasi bersama, dan membangun ekonomi yang lebih kuat.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-semibold">
                  Mulai Investasi
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button variant="outline" size="lg" className="font-semibold">
                  <Play className="mr-2" size={20} />
                  Tonton Demo
                </Button>
              </div>

              {/* Stats */}
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <StaggerChild key={index}>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-bold text-lg text-card-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerContainer>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Projek Terpopuler</h3>
                    <Badge className="bg-accent-green text-accent-green-foreground">Live</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium text-primary">73%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <div className="font-semibold">Rp 36.5M</div>
                        <div className="text-xs text-muted-foreground">dari Rp 50M</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">128</div>
                        <div className="text-xs text-muted-foreground">pendukung</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Projek Unggulan Kami</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Dukung UMKM dan projek komunitas pilihan yang telah diverifikasi 
                dan memiliki dampak positif bagi masyarakat
              </p>
            </div>
            
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <StaggerChild key={index}>
                  <ProjectCard {...project} />
                </StaggerChild>
              ))}
            </StaggerContainer>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Lihat Semua Projek
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Features Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <Badge variant="secondary" className="mb-4">Mengapa KoperasiKu?</Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Platform Terpercaya untuk
                    <span className="text-primary block">Investasi Komunitas</span>
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Kami menghadirkan solusi inovatif untuk menghubungkan investor 
                    dengan projek-projek UMKM berkualitas melalui sistem koperasi digital 
                    yang aman dan transparan.
                  </p>
                </div>

                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Dashboard Investasi</h3>
                      <Badge className="bg-primary text-primary-foreground">Real-time</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-accent-green p-4 rounded-lg">
                        <div className="text-2xl font-bold text-accent-green-foreground">Rp 12.5M</div>
                        <div className="text-sm text-accent-green-foreground/70">Total Investasi</div>
                      </div>
                      <div className="bg-accent-purple p-4 rounded-lg">
                        <div className="text-2xl font-bold text-accent-purple-foreground">8.5%</div>
                        <div className="text-sm text-accent-purple-foreground/70">Return Rata-rata</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Latest News Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Kabar Terbaru dari Komunitas</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Dapatkan insight terbaru seputar investasi koperasi, tips sukses UMKM, 
                dan berita terkini dari ekosistem kami
              </p>
            </div>
            
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <StaggerChild key={index}>
                  <ArticleCard {...article} />
                </StaggerChild>
              ))}
            </StaggerContainer>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Baca Artikel Lainnya
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Testimonial Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Testimoni Anggota</h2>
              <p className="text-xl text-muted-foreground">
                Dengarkan cerita sukses dari anggota komunitas kami
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sari Wulandari",
                  role: "Pemilik Warung Makan",
                  content: "Berkat dukungan komunitas KoperasiKu, warung saya bisa berkembang pesat. Sekarang saya punya 3 cabang!",
                  avatar: "/api/placeholder/60/60"
                },
                {
                  name: "Budi Santoso",
                  role: "Investor",
                  content: "Platform yang sangat transparan dan menguntungkan. Return investasi saya konsisten di atas 8% per tahun.",
                  avatar: "/api/placeholder/60/60"
                },
                {
                  name: "Maya Indira",
                  role: "Pengrajin Batik",
                  content: "Melalui KoperasiKu, produk batik saya bisa dikenal hingga ke luar negeri. Terima kasih untuk dukungannya!",
                  avatar: "/api/placeholder/60/60"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl"
                >
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* CTA Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="glass-card p-12 rounded-2xl text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Siap Memulai Perjalanan Investasi Anda?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan anggota lainnya dan mulai berinvestasi 
                di projek-projek berdampak positif hari ini
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="font-semibold">
                  Daftar Sekarang
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button variant="outline" size="lg" className="font-semibold">
                  Konsultasi Gratis
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
};

export default HomePage;
