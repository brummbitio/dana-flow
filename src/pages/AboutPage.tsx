import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import StaggerContainer, { StaggerChild } from '@/components/animations/StaggerContainer';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Shield,
  TrendingUp,
  Globe,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Twitter
} from 'lucide-react';

const AboutPage = () => {
  const visionMission = [
    {
      icon: Eye,
      title: "Visi Kami",
      content: "Menjadi platform koperasi digital terdepan di Indonesia yang memberdayakan UMKM dan menciptakan ekosistem investasi komunitas yang berkelanjutan."
    },
    {
      icon: Target,
      title: "Misi Kami",
      content: "Menghubungkan investor dengan projek-projek UMKM berkualitas melalui teknologi inovatif, transparansi penuh, dan dukungan komunitas yang solid."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Kepercayaan",
      description: "Membangun platform yang aman dan transparan dengan verifikasi ketat untuk setiap projek"
    },
    {
      icon: Heart,
      title: "Empati",
      description: "Memahami kebutuhan UMKM dan investor untuk menciptakan solusi yang saling menguntungkan"
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Memfasilitasi kerjasama yang kuat antara komunitas investor dan pelaku UMKM"
    },
    {
      icon: TrendingUp,
      title: "Inovasi",
      description: "Terus mengembangkan teknologi dan layanan untuk memberikan pengalaman terbaik"
    }
  ];

  const team = [
    {
      name: "Dr. Ahmad Hidayat",
      role: "Chief Executive Officer",
      description: "Pengalaman 15+ tahun di sektor keuangan dan teknologi fintech",
      image: "/api/placeholder/200/200",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Siti Nurhaliza, CFA",
      role: "Chief Investment Officer",
      description: "Ahli dalam manajemen portfolio dan analisis risiko investasi",
      image: "/api/placeholder/200/200",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Budi Santoso",
      role: "Chief Technology Officer",
      description: "Pemimpin teknologi dengan keahlian dalam blockchain dan AI",
      image: "/api/placeholder/200/200",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Maya Wulandari",
      role: "Chief Marketing Officer",
      description: "Spesialis digital marketing dan community building",
      image: "/api/placeholder/200/200",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Rizki Pratama",
      role: "Head of Operations",
      description: "Expertise dalam operasional koperasi dan manajemen projek",
      image: "/api/placeholder/200/200",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Lisa Anggraini, S.H.",
      role: "Head of Legal & Compliance",
      description: "Ahli hukum korporasi dan compliance regulasi OJK",
      image: "/api/placeholder/200/200",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Penghargaan Fintech Terbaik 2023",
      description: "Diakui sebagai platform fintech terinovatif oleh Indonesia Fintech Awards"
    },
    {
      icon: Shield,
      title: "Sertifikasi ISO 27001",
      description: "Standar keamanan informasi internasional untuk melindungi data pengguna"
    },
    {
      icon: CheckCircle,
      title: "Lisensi OJK",
      description: "Terdaftar dan diawasi oleh Otoritas Jasa Keuangan Indonesia"
    },
    {
      icon: Globe,
      title: "Member AFPI",
      description: "Anggota resmi Asosiasi Fintech Pendanaan Bersama Indonesia"
    }
  ];

  const stats = [
    { label: "Tahun Beroperasi", value: "5+" },
    { label: "Total Anggota", value: "15K+" },
    { label: "Projek Didanai", value: "1.2K+" },
    { label: "Dana Tersalurkan", value: "Rp 2.5B" }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge variant="secondary" className="mb-6 bg-accent-green text-accent-green-foreground">
                  🏢 Tentang KoperasiKu
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Membangun Masa Depan
                  <span className="text-primary block">Ekonomi Indonesia</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Kami percaya bahwa kekuatan kolektif komunitas dapat mengubah 
                  landscape ekonomi Indonesia melalui pemberdayaan UMKM dan 
                  investasi yang berkelanjutan.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="glass-card p-4 rounded-xl text-center"
                    >
                      <div className="font-bold text-2xl text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Vision & Mission */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Visi & Misi</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Komitmen kami untuk menciptakan dampak positif bagi perekonomian Indonesia
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {visionMission.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-xl"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Values */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nilai-Nilai Kami</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Prinsip fundamental yang memandu setiap keputusan dan tindakan kami
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <StaggerChild key={index}>
                  <div className="glass-card p-6 rounded-xl text-center h-full">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Team */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tim Kami</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Dipimpin oleh para ahli berpengalaman dari berbagai bidang untuk 
                memberikan layanan terbaik
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <StaggerChild key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-6 rounded-xl text-center"
                  >
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                    <div className="flex justify-center space-x-3">
                      <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin size={18} />
                      </a>
                      <a href={member.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter size={18} />
                      </a>
                    </div>
                  </motion.div>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Achievements */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Pencapaian & Sertifikasi</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Pengakuan dan sertifikasi yang membuktikan komitmen kami terhadap 
                kualitas dan keamanan
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <StaggerChild key={index}>
                  <div className="glass-card p-6 rounded-xl text-center">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                      <achievement.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm">{achievement.description}</p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </AnimateOnScroll>

      {/* CTA Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="glass-card p-12 rounded-2xl text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Bergabunglah dengan Misi Kami
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Mari bersama-sama membangun ekosistem ekonomi yang lebih kuat 
                dan berkelanjutan untuk Indonesia
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="font-semibold">
                  Mulai Berinvestasi
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button variant="outline" size="lg" className="font-semibold">
                  Hubungi Tim Kami
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
};

export default AboutPage;