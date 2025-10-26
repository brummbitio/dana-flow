import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectDetailApiResponse } from '@/types/project';
import { useToast } from '@/hooks/use-toast';
import { Clock, MapPin, Users, Target, CheckCircle, AlertCircle, Info } from 'lucide-react';

const formatCurrency = (amount: string | number | undefined) => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (numericAmount === undefined || isNaN(numericAmount)) {
        return 'Rp -';
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(numericAmount);
}

const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return '-'; }
};

const calculateDaysLeft = (deadline: string | null): string => {
    if (!deadline) return '- hari';
    try {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        deadlineDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (isNaN(deadlineDate.getTime())) return '- hari';

        const diffTime = deadlineDate.getTime() - today.getTime();
        if (diffTime < 0) return 'Berakhir';

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} hari lagi`;
    } catch (e) {
        return '- hari';
    }
};

const getStatusBadgeVariant = (status: string | undefined) => {
  switch (status) {
    case 'Selesai': return 'bg-green-100 text-green-800 border-green-200';
    case 'Pendanaan': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Aktif': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
    case 'Draft':
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ProjectDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [projectData, setProjectData] = useState<ProjectDetailApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { toast } = useToast();

    useEffect(() => {
        const fetchProjectDetail = async () => {
            if (!slug) {
                console.error("Slug is missing from URL parameters.");
                setError("Slug proyek tidak valid atau hilang dari URL.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                console.log(`Fetching project detail for slug: ${slug}`);
                const response = await fetch(`${API_BASE_URL}/api/projects/public/${slug}`);
                console.log(`Fetch response status: ${response.status}`);

                 if (response.status === 404) {
                    throw new Error('Proyek tidak ditemukan atau belum dipublikasikan.');
                }

                 if (!response.ok) {
                    let errorMsg = `Gagal mengambil detail proyek (${response.status})`;
                    try {
                        const errData = await response.json();
                        errorMsg = errData.message || errorMsg;
                    } catch (e) { }
                    throw new Error(errorMsg);
                }

                const data: ProjectDetailApiResponse = await response.json();
                 if (!data || !data.project) {
                    console.error("Invalid data format received:", data);
                    throw new Error("Format data proyek tidak sesuai dari server.");
                 }
                console.log("Project data received:", data);
                setProjectData(data);
            } catch (err: any) {
                console.error("Error fetching project detail:", err);
                setError(err.message);
                toast({
                    title: 'Error',
                    description: err.message,
                    variant: 'destructive'
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectDetail();
    }, [slug, API_BASE_URL, toast]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12 animate-pulse">
                <Skeleton className="h-4 w-1/3 mb-8" />
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                         <Skeleton className="w-full aspect-video rounded-lg mb-4" />
                         <div className="flex gap-2 mb-6">
                            <Skeleton className="w-16 h-16 rounded"/>
                            <Skeleton className="w-16 h-16 rounded"/>
                            <Skeleton className="w-16 h-16 rounded"/>
                         </div>
                         <Skeleton className="h-6 w-3/4 mb-2" />
                         <Skeleton className="h-4 w-1/2 mb-4" />
                         <Skeleton className="h-4 w-full mb-2" />
                         <Skeleton className="h-4 w-full mb-2" />
                         <Skeleton className="h-4 w-5/6 mb-6" />
                         <Skeleton className="h-10 w-full rounded" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-1/4 mb-4"/>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-3/4 mb-4"/>
                        <Skeleton className="h-2 w-full mb-2"/>
                        <Skeleton className="h-4 w-1/2 mb-4"/>
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-16 w-full"/>
                            <Skeleton className="h-16 w-full"/>
                            <Skeleton className="h-16 w-full"/>
                        </div>
                         <Skeleton className="h-10 w-full rounded" />
                    </div>
                </div>
                 <div className="mt-12 space-y-8">
                     <Skeleton className="h-8 w-1/3 mb-4"/>
                     <Skeleton className="h-4 w-full mb-2"/>
                     <Skeleton className="h-4 w-full mb-6"/>
                     <Skeleton className="h-8 w-1/3 mb-4"/>
                     <Skeleton className="h-4 w-full mb-2"/>
                     <Skeleton className="h-4 w-full mb-6"/>
                </div>
            </div>
        );
    }

     if (error) {
        return (
            <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12 text-center">
                 <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
                <h1 className="text-2xl font-semibold text-destructive mb-2">Oops! Terjadi Kesalahan</h1>
                <p className="text-muted-foreground mb-6">{error}</p>
                 <Button asChild>
                    <Link to="/proyek">Kembali ke Daftar Proyek</Link>
                </Button>
            </div>
        );
     }

    if (!projectData) {
        return (
             <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12 text-center">
                 <Info className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                 <h1 className="text-2xl font-semibold mb-2">Proyek Tidak Ditemukan</h1>
                 <p className="text-muted-foreground mb-6">Proyek yang Anda cari mungkin tidak ada atau belum dipublikasikan.</p>
                 <Button asChild>
                    <Link to="/proyek">Kembali ke Daftar Proyek</Link>
                </Button>
             </div>
        );
    }

    const { project, galleries, highlights, returns } = projectData;
    const targetAmountNum = parseFloat(project.target_amount.toString());
    const currentAmountNum = parseFloat(project.current_amount.toString());
    const progress = targetAmountNum > 0 ? (currentAmountNum / targetAmountNum) * 100 : 0;
    
    const getImageUrl = (imageUrl: string | null) => {
        if (!imageUrl) return 'https://placehold.co/600x400/e2e8f0/adb5bd?text=No+Image';
        return imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}/${imageUrl}`;
    };
    
    const mainImageUrl = getImageUrl(project.image_url);
    const daysLeft = calculateDaysLeft(project.deadline);

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem> <BreadcrumbLink asChild> <Link to="/">Beranda</Link> </BreadcrumbLink> </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem> <BreadcrumbLink asChild> <Link to="/proyek">Proyek</Link> </BreadcrumbLink> </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem> <BreadcrumbPage>{project.title}</BreadcrumbPage> </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden mb-4">
                        <img
                             src={mainImageUrl}
                             alt={project.title}
                             className="object-cover w-full h-full"
                             onError={(e) => { 
                                e.currentTarget.onerror = null; 
                                e.currentTarget.src = 'https://placehold.co/600x400/f87171/ffffff?text=Error'; 
                             }}
                         />
                    </AspectRatio>

                    {galleries && galleries.length > 0 && (
                        <Carousel className="w-full max-w-full mb-6" opts={{ loop: galleries.length > 1 }}>
                             <CarouselContent className="-ml-2">
                                {galleries.map((item, index) => (
                                <CarouselItem key={item.id || index} className="pl-2 basis-1/3 md:basis-1/4">
                                     <AspectRatio ratio={1 / 1} className="bg-muted rounded overflow-hidden">
                                        <img
                                             src={getImageUrl(item.image_url)}
                                             alt={item.caption || `Galeri ${index + 1}`}
                                             className="object-cover w-full h-full"
                                             onError={(e) => { 
                                                e.currentTarget.onerror = null; 
                                                e.currentTarget.src = 'https://placehold.co/100x100/f87171/ffffff?text=Err'; 
                                             }}
                                        />
                                     </AspectRatio>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            {galleries.length > 4 && (
                                <>
                                    <CarouselPrevious className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10"/>
                                    <CarouselNext className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10"/>
                                </>
                            )}
                        </Carousel>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">{project.title}</h1>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <Badge variant="outline">{project.category || 'Lainnya'}</Badge>
                        {project.location && (
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {project.location}</span>
                        )}
                    </div>
                     <p className="text-muted-foreground mb-6">{project.description || 'Tidak ada deskripsi singkat.'}</p>
                      {project.status === 'Pendanaan' && (
                        <Button size="lg" className="w-full">
                            Investasi Sekarang
                        </Button>
                      )}
                       {project.status !== 'Pendanaan' && (
                         <div className={`flex items-center justify-center gap-2 p-3 rounded-md text-sm font-medium ${getStatusBadgeVariant(project.status)}`}>
                             {project.status === 'Aktif' && <Info className="w-4 h-4"/>}
                             {project.status === 'Selesai' && <CheckCircle className="w-4 h-4"/>}
                             {project.status === 'Dibatalkan' && <AlertCircle className="w-4 h-4"/>}
                             Status: {project.status}
                         </div>
                      )}
                </div>

                <div className="space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan Pendanaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Progress value={Math.min(progress, 100)} className="h-3" aria-label={`${Math.round(progress)}% terkumpul`}/>
                            <div className="flex justify-between items-baseline">
                                <span className="text-2xl font-bold text-primary">{formatCurrency(project.current_amount)}</span>
                                <span className="text-sm text-muted-foreground">Terkumpul dari {formatCurrency(project.target_amount)}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="font-semibold text-lg">{project.backers}</div>
                                    <div className="text-xs text-muted-foreground">Pendukung</div>
                                </div>
                                 <div>
                                    <div className="font-semibold text-lg">{Math.min(Math.round(progress), 100)}%</div>
                                    <div className="text-xs text-muted-foreground">Tercapai</div>
                                </div>
                                <div>
                                     <div className="font-semibold text-lg flex items-center justify-center gap-1">
                                         <Clock className="w-4 h-4"/> {daysLeft}
                                     </div>
                                    <div className="text-xs text-muted-foreground">Sisa Waktu</div>
                                </div>
                            </div>
                        </CardContent>
                     </Card>

                    {highlights && highlights.length > 0 && (
                        <Card>
                            <CardHeader> <CardTitle>Poin Unggulan</CardTitle> </CardHeader>
                            <CardContent className="space-y-3">
                                {highlights.map((item) => (
                                    <div key={item.id}>
                                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {returns && returns.length > 0 && (
                        <Card>
                            <CardHeader> <CardTitle>Proyeksi Imbal Hasil</CardTitle> </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Periode</TableHead>
                                            <TableHead>Proyeksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {returns.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.period}</TableCell>
                                                <TableCell>{item.projection}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                     )}
                </div>
            </div>

            <div className="mt-12 lg:mt-16 space-y-8">
                 <Card>
                    <CardHeader> <CardTitle>Tentang Proyek</CardTitle> </CardHeader>
                     <CardContent className="prose prose-sm sm:prose-base max-w-none text-muted-foreground dark:prose-invert">
                         <div className="whitespace-pre-wrap">{project.overview || 'Tidak ada ringkasan detail.'}</div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
};

export default ProjectDetailPage;

