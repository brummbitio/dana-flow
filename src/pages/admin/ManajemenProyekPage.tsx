import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '../../contexts/AuthContext'; // Path relatif sudah benar
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";

// Tipe data proyek sesuai API
type ProjectStatus = "Draft" | "Pendanaan" | "Aktif" | "Selesai" | "Dibatalkan";
interface Project {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  target_amount: number;
  current_amount: number;
  backers: number;
  deadline: string | null;
  status: ProjectStatus;
  image_url: string | null;
}

const getStatusBadgeVariant = (status: ProjectStatus) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Pendanaan':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Aktif':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Dibatalkan':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Draft':
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatCurrency = (amount: number | string) => {
    // Pastikan amount adalah number sebelum format
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount)) {
        return 'Rp -'; // Handle jika konversi gagal
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(numericAmount);
}
const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error("Invalid date format received, cannot parse:", dateString);
            return '-';
        }
        // Format tanggal tanpa memperhatikan timezone secara eksplisit, biarkan JS handle lokal
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return '-';
    }
};


// --- Komponen Tabel Proyek ---
interface ProjectTableProps {
  projects: Project[];
  isLoading: boolean;
  onDelete: (projectId: number, projectTitle: string) => void;
  statusFilter: string; // Prop statusFilter
}

const ProjectTable = ({ projects, isLoading, onDelete, statusFilter }: ProjectTableProps) => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleAction = (action: 'view' | 'edit', project: Project) => { // Hapus 'delete' dari sini
    if (action === 'edit') {
      navigate(`/admin/projects/edit/${project.id}`);
    } else if (action === 'view') {
       navigate(`/projek/${project.slug}`);
    } else {
      toast.info(`Aksi "${action}" untuk proyek "${project.title}" belum diimplementasikan.`);
    }
  };

  // Render skeleton saat loading
  if (isLoading) {
    return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proyek</TableHead>
              <TableHead className="hidden md:table-cell">Dana Terkumpul</TableHead>
              <TableHead className="hidden md:table-cell">Deadline</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Pendukung</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-16 h-12 rounded-md hidden sm:block" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-2 w-full mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </TableCell>
                 <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-8" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
           <TableRow>
            <TableHead>Proyek</TableHead>
            <TableHead className="hidden md:table-cell">Dana Terkumpul</TableHead>
             <TableHead className="hidden md:table-cell">Deadline</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Pendukung</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* *** PERBAIKAN: Gunakan statusFilter DI SINI untuk pesan "tidak ada proyek" *** */}
          {projects.length > 0 ? (
            projects.map((project) => {
              const progress = project.target_amount > 0 ? (project.current_amount / project.target_amount) * 100 : 0;
              const imageUrl = project.image_url ? `${API_BASE_URL}/${project.image_url}` : `https://placehold.co/128x96/e2e8f0/adb5bd?text=No+Image`;
              return (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-16 h-12 object-cover rounded-md hidden sm:block bg-muted"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/128x96/f87171/ffffff?text=Error';
                        }}
                      />
                      <div>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-muted-foreground">{project.category || '-'}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{formatCurrency(project.current_amount)}</span>
                      <Progress value={progress} className="h-2" aria-label={`${Math.round(progress)}% terkumpul`}/>
                      <span className="text-xs text-muted-foreground">dari {formatCurrency(project.target_amount)}</span>
                    </div>
                  </TableCell>
                   <TableCell className="hidden md:table-cell">{formatDate(project.deadline)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className={`${getStatusBadgeVariant(project.status)} font-medium`}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{project.backers}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-label="Opsi lainnya" variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi Proyek</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleAction('edit', project)} className="cursor-pointer">
                            Edit Proyek
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('view', project)} className="cursor-pointer">
                            Lihat di Situs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <AlertDialogTrigger asChild>
                             <DropdownMenuItem
                                onSelect={(event) => event.preventDefault()}
                                className="text-destructive focus:text-destructive cursor-pointer">
                                Hapus Proyek
                             </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Anda yakin ingin menghapus proyek ini?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini tidak dapat diurungkan. Proyek <span className="font-semibold">"{project.title}"</span> akan dihapus secara permanen beserta semua data terkait (galeri, dokumen, dll). File yang terunggah juga akan dihapus.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                             className={buttonVariants({ variant: "destructive" })}
                             onClick={() => onDelete(project.id, project.title)}>
                            Ya, Hapus Proyek
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                 {/* Menggunakan prop statusFilter */}
                Tidak ada proyek yang sesuai dengan filter "{statusFilter}".
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
// --- Akhir Komponen Tabel Proyek ---


const ManajemenProyekPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Default true saat awal load
    const [statusFilter, setStatusFilter] = useState('Semua');
    const navigate = useNavigate();
    const { token, isLoading: isAuthLoading } = useAuth();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fungsi untuk fetch data proyek (async function)
    const fetchProjects = React.useCallback(async (currentStatusFilter: string) => { // useCallback
        // Jangan fetch jika token belum siap ATAU proses auth belum selesai
        if (!token || isAuthLoading) {
            console.log("Fetch skipped: Auth loading or token not available yet.");
            // Jika auth selesai tapi token tidak ada, set loading false
            if (!isAuthLoading && !token) {
                 setIsLoading(false);
                 setProjects([]);
                 // Jangan tampilkan toast error di sini, biarkan useEffect handle
            }
            return;
        }

        console.log(`Fetching projects with status: ${currentStatusFilter}, Token: ${token ? 'present' : 'absent'}`); // Log sebelum fetch
        setIsLoading(true); // Set loading true sebelum fetch

        let url = `${API_BASE_URL}/api/projects`;
        if (currentStatusFilter !== 'Semua') {
            url += `?status=${encodeURIComponent(currentStatusFilter)}`;
        }

        try {
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log(`Fetch response status: ${response.status} for URL: ${url}`);

            if (response.status === 401 || response.status === 403) {
                toast.error("Akses ditolak. Sesi Anda mungkin berakhir. Silakan login ulang.");
                navigate('/masuk');
                return;
            }
            if (response.status === 404) {
                 console.error(`Endpoint ${url} not found (404). Pastikan backend berjalan dan rute terdaftar.`);
                 toast.error("Gagal mengambil data proyek: Endpoint tidak ditemukan (404).");
                 setProjects([]);
                 return;
            }
            if (!response.ok) {
                let errorData = { message: `Gagal mengambil data proyek (${response.status})` };
                try { errorData = await response.json(); } catch (e) { /* ignore */ }
                throw new Error(errorData.message);
            }
            const data: Project[] = await response.json();
            console.log("Projects data received:", data);
            setProjects(data);
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            if (!error.message?.includes("404")) {
               toast.error(`Error: ${error.message}`);
            }
            setProjects([]);
        } finally {
            setIsLoading(false);
        }
    // *** PERBAIKAN: Masukkan semua dependency yang digunakan di dalam useCallback ***
    }, [token, isAuthLoading, API_BASE_URL, navigate]); // Tambahkan dependency

    // useEffect HANYA untuk memanggil fetchProjects saat dependency berubah
    useEffect(() => {
        fetchProjects(statusFilter);
    }, [statusFilter, fetchProjects]); // Panggil fetchProjects dari sini


    // Fungsi untuk menangani penghapusan proyek
    const handleDeleteProject = async (projectId: number, projectTitle: string) => {
      try {
         // Cek token sebelum delete
         if (!token || isAuthLoading) {
             toast.error("Sesi belum siap atau token tidak ditemukan. Silakan coba lagi.");
             if (!token && !isAuthLoading) navigate('/masuk'); // Arahkan ke login jika auth selesai tapi token tetap tidak ada
             return;
         }
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

         if (response.status === 401 || response.status === 403) {
            toast.error("Akses ditolak. Silakan login ulang.");
            navigate('/masuk');
            return;
         }
         if (response.status === 404) {
             throw new Error(`Proyek dengan ID ${projectId} tidak ditemukan untuk dihapus.`);
         }

        if (response.status === 204 || response.ok) {
             let message = `Proyek "${projectTitle}" berhasil dihapus.`;
             try {
                if(response.headers.get("content-length") !== "0" && response.headers.get("content-type")?.includes("application/json")) {
                    const data = await response.json();
                    message = data.message || message;
                }
             } catch(e) { /* Abaikan error parsing */ }

             toast.success(message);
             setProjects(prev => prev.filter(p => p.id !== projectId));
        } else {
             const data = await response.json();
             throw new Error(data.message || 'Gagal menghapus proyek.');
        }

      } catch (error: any) {
        toast.error(error.message);
      }
    };


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Manajemen Proyek</h1>
                    <p className="mt-2 text-muted-foreground">
                        Tambah, edit, dan kelola semua proyek crowdfunding di platform.
                    </p>
                </div>
                <Button onClick={() => navigate('/admin/projects/new')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Proyek Baru
                </Button>
            </div>

            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
                    <TabsTrigger value="Semua">Semua</TabsTrigger>
                    <TabsTrigger value="Draft">Draft</TabsTrigger>
                    <TabsTrigger value="Pendanaan">Pendanaan</TabsTrigger>
                    <TabsTrigger value="Aktif">Aktif</TabsTrigger>
                    <TabsTrigger value="Selesai">Selesai</TabsTrigger>
                    <TabsTrigger value="Dibatalkan">Dibatalkan</TabsTrigger>
                </TabsList>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Daftar Proyek</CardTitle>
                    <CardDescription>
                       {(isLoading || isAuthLoading) ? 'Memuat proyek...' : `Menampilkan ${projects.length} proyek dengan status "${statusFilter}".`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ProjectTable
                      projects={projects}
                      isLoading={(isLoading || isAuthLoading)} // Tampilkan skeleton jika salah satu loading
                      onDelete={handleDeleteProject}
                      statusFilter={statusFilter} // Kirim prop statusFilter
                    />
                  </CardContent>
                </Card>
            </Tabs>
        </div>
    );
};

export default ManajemenProyekPage;

