import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Calendar as CalendarIcon, UploadCloud, Trash2, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { projectsData } from '@/data/projects'; // Untuk simulasi mode edit

const TambahEditProyekPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(projectId);

  // Di aplikasi nyata, Anda akan fetch data jika dalam mode edit
  const projectData = isEditMode ? projectsData.find(p => p.id === projectId) : null;

  const [deadline, setDeadline] = useState<Date | undefined>(
    isEditMode ? new Date() : undefined // Simulasi tanggal
  );

  const handleSubmit = (action: 'publish' | 'draft') => {
    const actionText = action === 'publish' ? 'mempublikasikan' : 'menyimpan draft';
    const title = isEditMode ? `Proyek "${projectData?.title}"` : "Proyek baru";
    
    toast.success(`${title} berhasil di${action === 'publish' ? 'publikasi' : 'simpan sebagai draft'}.`);
    navigate('/admin/projects');
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/projects">Manajemen Proyek</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{isEditMode ? 'Edit Proyek' : 'Tambah Proyek Baru'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('/admin/projects')}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
        </Button>
        <h1 className="text-3xl font-bold text-foreground flex-1">
          {isEditMode ? `Edit "${projectData?.title}"` : 'Tambah Proyek Baru'}
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Kolom Kiri - Form Utama */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>Detail utama yang akan dilihat oleh calon investor.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Nama Proyek</Label>
                <Input id="projectName" defaultValue={projectData?.title} placeholder="Contoh: Kopi Tani Sejahtera" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select defaultValue={projectData?.category}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kuliner">Kuliner</SelectItem>
                        <SelectItem value="Pertanian">Pertanian</SelectItem>
                        <SelectItem value="Kerajinan">Kerajinan</SelectItem>
                        <SelectItem value="Teknologi">Teknologi</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input id="location" defaultValue={projectData?.location} placeholder="Contoh: Malang, Jawa Timur" />
                 </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="shortDescription">Deskripsi Singkat (maks. 150 karakter)</Label>
                <Textarea id="shortDescription" defaultValue={projectData?.description} placeholder="Jelaskan proyek Anda secara singkat dan menarik." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overview">Ringkasan Lengkap (Overview)</Label>
                <Textarea id="overview" rows={6} defaultValue={projectData?.overview} placeholder="Jelaskan secara detail tentang latar belakang, tujuan, dan dampak dari proyek ini." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gambar & Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Gambar Utama Proyek</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk unggah</span></p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div> 
              </div>
              <div className="space-y-2">
                <Label>Dokumen Pendukung (Proposal, dll)</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-docs" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk unggah</span></p>
                    </div>
                    <Input id="dropzone-docs" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan - Aksi */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Pendanaan & Publikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetDana">Target Dana (Rp)</Label>
                <Input id="targetDana" type="number" defaultValue={projectData?.targetAmount} placeholder="50000000" />
              </div>
              <div className="space-y-2">
                <Label>Deadline Penggalangan Dana</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? deadline.toLocaleDateString('id-ID') : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={deadline} onSelect={setDeadline} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status Proyek</Label>
                 <Select defaultValue="Draft">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Dipublikasikan">Dipublikasikan</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={() => handleSubmit('publish')}>
                 {isEditMode ? 'Simpan & Publikasikan' : 'Publikasikan Proyek'}
              </Button>
               <Button variant="outline" className="w-full" onClick={() => handleSubmit('draft')}>
                <Save className="mr-2 h-4 w-4" />
                Simpan sebagai Draft
              </Button>
              {isEditMode && (
                <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Proyek
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TambahEditProyekPage;
