import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockUsers } from './ManajemenPenggunaPage'; // Kita gunakan mock data yang sama
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Check, X, Info, FileText, Image as ImageIcon } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Tipe data untuk status badge, agar bisa digunakan di komponen Badge
type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | null | undefined;

const getStatusBadgeVariant = (status: string): { variant: BadgeVariant; className: string } => {
  switch (status) {
    case 'Terverifikasi':
      return { variant: 'outline', className: 'bg-green-100 text-green-800 border-green-200' };
    case 'Menunggu Verifikasi':
      return { variant: 'outline', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    case 'Ditolak':
      return { variant: 'outline', className: 'bg-red-100 text-red-800 border-red-200' };
    default:
      return { variant: 'secondary', className: '' };
  }
};


const DetailPenggunaPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  
  // Di aplikasi nyata, Anda akan fetch data berdasarkan userId
  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Pengguna tidak ditemukan</h2>
        <Button onClick={() => navigate('/admin/users')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Daftar Pengguna
        </Button>
      </div>
    );
  }
  
  const statusBadge = getStatusBadgeVariant(user.status);
  
  const handleVerificationAction = (action: 'approve' | 'reject') => {
      const actionText = action === 'approve' ? 'menyetujui' : 'menolak';
      toast.success(`Anda berhasil ${actionText} verifikasi untuk ${user.name}.`);
      navigate('/admin/users');
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
              <Link to="/admin/users">Manajemen Pengguna</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground flex-1">{user.name}</h1>
        <Badge variant={statusBadge.variant} className={statusBadge.className}>
          {user.status}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Kolom Kiri - Data Pengguna & Dokumen */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Info size={20} /> Informasi Personal</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-muted-foreground">NIK</Label>
                <p className="font-medium">3579012345678001</p>
              </div>
               <div className="space-y-1">
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{user.email}</p>
              </div>
               <div className="space-y-1">
                <Label className="text-muted-foreground">No. Telepon</Label>
                <p className="font-medium">+62 812 3456 7890</p>
              </div>
               <div className="space-y-1">
                <Label className="text-muted-foreground">Tanggal Bergabung</Label>
                <p className="font-medium">{user.joinDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText size={20} /> Dokumen Verifikasi</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Foto KTP</Label>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                   <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Swafoto dengan KTP</Label>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                   <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan - Aksi */}
        <div className="lg:col-span-1">
           <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Aksi Verifikasi</CardTitle>
              <CardDescription>Tinjau data dan ambil keputusan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {user.status === "Menunggu Verifikasi" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rejectionReason">Alasan Penolakan (Opsional)</Label>
                    <Textarea id="rejectionReason" placeholder="Jelaskan alasan jika verifikasi ditolak..." />
                  </div>
                   <div className="flex flex-col gap-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleVerificationAction('approve')}>
                      <Check className="mr-2 h-4 w-4"/> Setujui Verifikasi
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={() => handleVerificationAction('reject')}>
                       <X className="mr-2 h-4 w-4"/> Tolak Verifikasi
                    </Button>
                  </div>
                </>
              )}
              {user.status === "Terverifikasi" && <p className="text-sm text-green-600">Pengguna ini sudah terverifikasi.</p>}
              {user.status === "Ditolak" && <p className="text-sm text-destructive">Verifikasi pengguna ini telah ditolak.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPenggunaPage;
