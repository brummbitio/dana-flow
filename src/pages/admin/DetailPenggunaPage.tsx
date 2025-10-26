import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ArrowLeft, Check, X, User, Mail, Phone, Calendar, Landmark, UserX } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface UserDetail {
    id: number;
    fullName: string;
    email: string;
    phone: string | null;
    createdAt: string;
    status: 'unverified' | 'pending' | 'verified' | 'rejected';
}

interface VerificationData {
    nik: string;
    full_name_ktp: string;
    address_ktp: string;
    ktp_image_path: string;
    selfie_image_path: string;
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
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionNotes, setRejectionNotes] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const userRes = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!userRes.ok) throw new Error('Gagal mengambil detail pengguna.');
        const userData = await userRes.json();
        setUser(userData);

        if (['pending', 'verified', 'rejected'].includes(userData.status)) {
            const verificationRes = await fetch(`${API_BASE_URL}/api/users/${userId}/verification`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (verificationRes.ok) {
                 const verificationData = await verificationRes.json();
                 setVerificationData(verificationData);
            }
        }
      } catch (error: any) {
        toast.error(error.message);
        navigate('/admin/users');
      } finally {
        setIsLoading(false);
      }
    };
    if (token && userId) fetchAllData();
  }, [userId, token, navigate, API_BASE_URL]);

  const handleStatusUpdate = async (newStatus: 'verified' | 'rejected' | 'unverified', notes?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, notes }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal memperbarui status.');
      
      toast.success(data.message);
      navigate('/admin/users', { replace: true });

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <div>Memuat data pengguna...</div>;
  if (!user) return <div>Pengguna tidak ditemukan.</div>;

  const renderActionCard = () => {
    switch (user.status) {
        case 'verified':
            return (
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Aksi Anggota</CardTitle>
                        <CardDescription>Nonaktifkan anggota untuk membatasi akses fitur.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="destructive" className="w-full" onClick={() => handleStatusUpdate('unverified')}>
                            <UserX className="mr-2 h-4 w-4" />
                            Nonaktifkan Anggota
                        </Button>
                    </CardFooter>
                </Card>
            );
        case 'pending':
        case 'rejected':
        case 'unverified':
        default:
            return (
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Aksi Verifikasi</CardTitle>
                        <CardDescription>Setujui atau tolak pengajuan verifikasi pengguna ini.</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-2">
                        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleStatusUpdate('verified')} disabled={user.status !== 'pending'}>
                            <Check className="mr-2 h-4 w-4" />
                            Setujui Verifikasi
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="w-full" disabled={user.status !== 'pending'}>
                                    <X className="mr-2 h-4 w-4" />
                                    Tolak Verifikasi
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Tolak Verifikasi Pengguna</DialogTitle>
                                    <DialogDescription>
                                        Berikan alasan penolakan. Catatan ini akan terlihat oleh pengguna.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                    <Label htmlFor="rejectionNotes">Alasan Penolakan</Label>
                                    <Textarea 
                                        id="rejectionNotes" 
                                        value={rejectionNotes}
                                        onChange={(e) => setRejectionNotes(e.target.value)}
                                        placeholder="Contoh: Foto KTP buram atau tidak terbaca."
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button variant="ghost">Batal</Button></DialogClose>
                                    <Button variant="destructive" onClick={() => handleStatusUpdate('rejected', rejectionNotes)}>
                                        Kirim Penolakan
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            );
    }
  }

  return (
    <div className="flex flex-col gap-6">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
           <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/users">Manajemen Pengguna</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{user.fullName}</BreadcrumbPage></BreadcrumbItem>
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

            {verificationData ? (
                 <Card>
                    <CardHeader><CardTitle>Dokumen Verifikasi</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Data Diri (sesuai KTP)</h3>
                            <div className="text-sm space-y-1">
                                <p><strong>NIK:</strong> {verificationData.nik}</p>
                                <p><strong>Nama:</strong> {verificationData.full_name_ktp}</p>
                                <p><strong>Alamat:</strong> {verificationData.address_ktp}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-2">Foto KTP</h3>
                                <a href={`${API_BASE_URL}/${verificationData.ktp_image_path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                                    <img src={`${API_BASE_URL}/${verificationData.ktp_image_path.replace(/\\/g, '/')}`} alt="Foto KTP" className="rounded-lg border w-full object-contain" />
                                </a>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Selfie dengan KTP</h3>
                                <a href={`${API_BASE_URL}/${verificationData.selfie_image_path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                                     <img src={`${API_BASE_URL}/${verificationData.selfie_image_path.replace(/\\/g, '/')}`} alt="Selfie KTP" className="rounded-lg border w-full object-contain" />
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                 <Card>
                    <CardHeader><CardTitle>Dokumen Verifikasi</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Pengguna ini belum mengirimkan data verifikasi.</p>
                    </CardContent>
                </Card>
            )}
        </div>
        <div className="lg:col-span-1">
             {renderActionCard()}
        </div>
      </div>
    </div>
  );
};

export default DetailPenggunaPage;

