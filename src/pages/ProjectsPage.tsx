import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import StaggerContainer, { StaggerChild } from '@/components/animations/StaggerContainer';
import ProjectCard from '@/components/ProjectCard';
import { ProjectData } from '@/types/project';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const categories = [
    { id: 'semua', label: 'Semua Projek' },
    { id: 'kuliner', label: 'Kuliner' },
    { id: 'pertanian', label: 'Pertanian' },
    { id: 'kerajinan', label: 'Kerajinan' },
    { id: 'teknologi', label: 'Teknologi' },
    { id: 'pendidikan', label: 'Pendidikan' },
    { id: 'kesehatan', label: 'Kesehatan' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/public`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data proyek');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: 'Error',
          description: 'Gagal memuat data proyek. Silakan coba lagi.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [API_BASE_URL, toast]);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'semua' || 
      project.category.toLowerCase() === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderProjectGrid = () => {
    if (isLoading) {
      return (
        <>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          ))}
        </>
      );
    }

    return filteredProjects.map((project) => (
      <StaggerChild key={project.id}>
        <ProjectCard project={project} />
      </StaggerChild>
    ));
  };

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
              {isLoading ? 'Memuat...' : `${filteredProjects.length} Projek Ditemukan`}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Urutkan: Terpopuler</span>
            </div>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderProjectGrid()}
          </StaggerContainer>

          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="glass-card p-12 rounded-xl max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">
                  {projects.length === 0 ? 'Belum Ada Projek' : 'Projek Tidak Ditemukan'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {projects.length === 0 
                    ? 'Belum ada proyek yang tersedia saat ini. Silakan kembali lagi nanti.'
                    : 'Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.'
                  }
                </p>
                {projects.length > 0 && (
                  <Button onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('semua');
                  }}>
                    Reset Filter
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {!isLoading && filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" disabled>
                Semua Projek Ditampilkan
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;