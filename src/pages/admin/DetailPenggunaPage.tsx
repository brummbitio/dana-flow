import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, Check, X, User, Mail, Phone, Calendar, Landmark } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UserDetail {
    id: number;
    fullName: string;
    email: string;
    phone: string | null;
    createdAt: string;
    status: 'unverified' | 'pending' | 'verified' | 'rejected';
}

const getStatusBadgeVariant = (status: UserDetail['status']) => {
  switch (status) {
    case 'verified': return 'bg-green-100 text-green-800 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};


const DetailPenggunaPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Gagal mengambil detail pengguna.');
        const data = await response.json();
        setUser(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (token && userId) fetchUser();
  }, [userId, token]);

  const handleVerification = async (newStatus: 'verified' | 'rejected') => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Gagal memperbarui status.');
      
      const data = await response.json();
      toast.success(data.message);
      // Refresh data pengguna setelah update
      if(user) setUser({ ...user, status: newStatus });

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <div>Memuat data pengguna...</div>;
  if (!user) return <div>Pengguna tidak ditemukan.</div>;

  return (
    <div className="flex flex-col gap-6">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/admin">Dashboard</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
           <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/admin/users">Manajemen Pengguna</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.fullName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('/admin/users')}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
        </Button>
        <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">{user.fullName}</h1>
            <Badge variant="outline" className={getStatusBadgeVariant(user.status)}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader><CardTitle>Informasi Personal</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3"><User className="w-4 h-4 text-muted-foreground" /><span>{user.fullName}</span></div>
                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted-foreground" /><span>{user.email}</span></div>
                    <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-muted-foreground" /><span>{user.phone || '-'}</span></div>
                    <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-muted-foreground" /><span>Bergabung: {new Date(user.createdAt).toLocaleDateString('id-ID')}</span></div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Dokumen Verifikasi</CardTitle></CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <Landmark className="h-4 w-4" />
                        <AlertTitle>Fitur Belum Tersedia</AlertTitle>
                        <AlertDescription>
                            Sistem unggah dan penyimpanan dokumen (seperti foto KTP) akan diimplementasikan pada tahap pengembangan backend selanjutnya.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Aksi Verifikasi</CardTitle>
                    <CardDescription>Setujui atau tolak pengajuan verifikasi pengguna ini.</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleVerification('verified')}>
                        <Check className="mr-2 h-4 w-4" />
                        Setujui Verifikasi
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={() => handleVerification('rejected')}>
                        <X className="mr-2 h-4 w-4" />
                        Tolak Verifikasi
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPenggunaPage;

