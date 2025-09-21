import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import StaggerContainer, { StaggerChild } from '@/components/animations/StaggerContainer';
import ProjectCard from '@/components/ProjectCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'semua', label: 'Semua Projek' },
    { id: 'kuliner', label: 'Kuliner' },
    { id: 'pertanian', label: 'Pertanian' },
    { id: 'kerajinan', label: 'Kerajinan' },
    { id: 'teknologi', label: 'Teknologi' },
    { id: 'pendidikan', label: 'Pendidikan' },
    { id: 'kesehatan', label: 'Kesehatan' }
  ];

  // Extended mock data for projects
  const allProjects = [
    {
      title: "Warung Makan Bu Sari - Ekspansi Kuliner Tradisional",
      description: "Membantu Bu Sari mengembangkan warung makan tradisional dengan peralatan modern dan tempat yang lebih luas untuk melayani lebih banyak pelanggan.",
      targetAmount: 50000000,
      currentAmount: 35000000,
      backers: 128,
      deadline: "30 hari lagi",
      location: "Yogyakarta",
      category: "Kuliner",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "Koperasi Tani Organik Nusantara",
      description: "Mengembangkan sistem distribusi hasil panen organik langsung dari petani ke konsumen dengan teknologi modern dan packaging ramah lingkungan.",
      targetAmount: 75000000,
      currentAmount: 45000000,
      backers: 89,
      deadline: "45 hari lagi",
      location: "Malang, Jawa Timur",
      category: "Pertanian",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "Rajutan Ibu-Ibu Desa Cirebon",
      description: "Memberdayakan ibu-ibu desa untuk mengembangkan usaha rajutan dengan pemasaran online dan pelatihan desain produk modern.",
      targetAmount: 25000000,
      currentAmount: 18000000,
      backers: 156,
      deadline: "20 hari lagi",
      location: "Cirebon, Jawa Barat",
      category: "Kerajinan",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "Startup EdTech untuk Anak Desa",
      description: "Platform pembelajaran digital khusus untuk anak-anak di daerah pedesaan dengan konten yang disesuaikan dengan kebutuhan lokal.",
      targetAmount: 100000000,
      currentAmount: 65000000,
      backers: 234,
      deadline: "60 hari lagi",
      location: "Bandung, Jawa Barat",
      category: "Teknologi",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "Sekolah Gratis untuk Anak Kurang Mampu",
      description: "Mendirikan sekolah gratis dengan fasilitas lengkap untuk anak-anak dari keluarga kurang mampu di daerah terpencil.",
      targetAmount: 200000000,
      currentAmount: 120000000,
      backers: 445,
      deadline: "90 hari lagi",
      location: "Lombok, NTB",
      category: "Pendidikan",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "Klinik Kesehatan Desa Terpadu",
      description: "Membangun klinik kesehatan dengan fasilitas modern untuk melayani masyarakat desa yang selama ini sulit mengakses layanan kesehatan.",
      targetAmount: 150000000,
      currentAmount: 85000000,
      backers: 312,
      deadline: "75 hari lagi",
      location: "Sumba, NTT",
      category: "Kesehatan",
      imageUrl: "/api/placeholder/400/300"
    }
  ];

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = selectedCategory === 'semua' || 
      project.category.toLowerCase() === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-4 bg-accent-green text-accent-green-foreground">
                  🚀 Projek Pilihan Komunitas
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Temukan Projek
                  <span className="text-primary block">Impian Anda</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Jelajahi berbagai projek UMKM dan inisiatif komunitas yang telah diverifikasi. 
                  Mulai berinvestasi dan jadilah bagian dari perubahan positif.
                </p>
              </motion.div>
            </div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card p-6 rounded-xl">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input
                      placeholder="Cari projek berdasarkan nama atau deskripsi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="lg:w-auto">
                    <SlidersHorizontal className="mr-2" size={20} />
                    Filter Lanjutan
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Categories */}
      <AnimateOnScroll>
        <section className="py-8">
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

      {/* Projects Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProjects.length} Projek Ditemukan
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Urutkan: Terpopuler</span>
            </div>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <StaggerChild key={index}>
                <ProjectCard {...project} />
              </StaggerChild>
            ))}
          </StaggerContainer>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="glass-card p-12 rounded-xl max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">Projek Tidak Ditemukan</h3>
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

          {/* Load More Button */}
          {filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Muat Lebih Banyak Projek
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;