import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Users,
  Calendar,
  MapPin,
  FileText,
  Download,
  BarChart,
  Briefcase,
  Award,
  Share2,
  CheckCircle
} from 'lucide-react';
import AnimateOnScroll from '../components/animations/AnimateOnScroll';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground">Proyek tidak ditemukan.</p>
          <Button asChild className="mt-4">
            <Link to="/projek">Kembali ke Daftar Proyek</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = (project.currentAmount / project.targetAmount) * 100;
  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb and Title */}
        <AnimateOnScroll>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Beranda</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/projek">Projek</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl lg:text-5xl font-bold mb-2">{project.title}</h1>
          <div className="flex items-center space-x-4 text-muted-foreground mb-8">
            <Badge variant="secondary" className="bg-accent-green text-accent-green-foreground">{project.category}</Badge>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{project.location}</span>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <AnimateOnScroll>
              <Card className="mb-8 overflow-hidden">
                <Carousel>
                  <CarouselContent>
                    {project.gallery.map((img, index) => (
                       <CarouselItem key={index}>
                         <img src={img} alt={`Galeri Proyek ${index + 1}`} className="w-full h-96 object-cover" />
                       </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-primary">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="font-bold text-2xl">{formatCurrency(project.currentAmount)}</div>
                      <div className="text-sm text-muted-foreground">Terkumpul</div>
                    </div>
                    <div>
                      <div className="font-bold text-2xl">{project.backers}</div>
                      <div className="text-sm text-muted-foreground">Pendukung</div>
                    </div>
                    <div>
                      <div className="font-bold text-2xl">{project.deadline}</div>
                      <div className="text-sm text-muted-foreground">Sisa Waktu</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={0.2}>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                  <TabsTrigger value="documents">Dokumen</TabsTrigger>
                  <TabsTrigger value="returns">Imbal Hasil</TabsTrigger>
                </TabsList>
                <Card className="mt-4">
                  <CardContent className="p-6">
                    <TabsContent value="overview">
                      <h3 className="text-xl font-semibold mb-4 flex items-center"><Briefcase size={20} className="mr-2 text-primary"/> Business Overview</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{project.overview}</p>
                      <h3 className="text-xl font-semibold mb-4 flex items-center"><Award size={20} className="mr-2 text-primary"/> Company Highlight</h3>
                      <ul className="space-y-3">
                        {project.highlights.map((item, index) => (
                           <li key={index} className="flex items-start">
                             <CheckCircle size={16} className="mr-3 mt-1 text-green-500 flex-shrink-0" />
                             <span className="text-muted-foreground"><strong>{item.title}:</strong> {item.description}</span>
                           </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="documents">
                      <h3 className="text-xl font-semibold mb-4 flex items-center"><FileText size={20} className="mr-2 text-primary"/> Dokumen Proyek</h3>
                       <ul className="space-y-3">
                        {project.documents.map((doc, index) => (
                           <li key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                             <span className="font-medium">{doc.name}</span>
                             <Button variant="outline" size="sm" asChild>
                                <a href={doc.url} download><Download size={16} className="mr-2"/> Unduh</a>
                             </Button>
                           </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="returns">
                       <h3 className="text-xl font-semibold mb-4 flex items-center"><BarChart size={20} className="mr-2 text-primary"/> Rincian Imbal Hasil</h3>
                       <ul className="space-y-3">
                        {project.returns.map((item, index) => (
                           <li key={index} className="flex justify-between p-3 bg-muted/50 rounded-lg">
                             <span className="font-medium text-muted-foreground">{item.period}</span>
                             <span className="font-semibold text-primary">{item.projection}</span>
                           </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </AnimateOnScroll>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <AnimateOnScroll delay={0.3}>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Dukung Proyek Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup defaultValue="paket-2">
                    <div className="flex items-center space-x-2 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                      <RadioGroupItem value="paket-1" id="paket-1" />
                      <Label htmlFor="paket-1" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Paket Bronze</div>
                        <div className="text-primary font-bold">{formatCurrency(100000)}</div>
                      </Label>
                    </div>
                     <div className="flex items-center space-x-2 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                      <RadioGroupItem value="paket-2" id="paket-2" />
                      <Label htmlFor="paket-2" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Paket Silver</div>
                        <div className="text-primary font-bold">{formatCurrency(500000)}</div>
                      </Label>
                    </div>
                     <div className="flex items-center space-x-2 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                      <RadioGroupItem value="paket-3" id="paket-3" />
                      <Label htmlFor="paket-3" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Paket Gold</div>
                        <div className="text-primary font-bold">{formatCurrency(1000000)}</div>
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="space-y-2">
                     <Label htmlFor="custom-amount">Atau masukkan jumlah lain</Label>
                     <Input id="custom-amount" type="number" placeholder="Contoh: 250000"/>
                  </div>
                  <Button size="lg" className="w-full font-semibold">Dukung Sekarang</Button>
                  <Button variant="outline" className="w-full">
                     <Share2 size={16} className="mr-2"/> Bagikan Proyek
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;