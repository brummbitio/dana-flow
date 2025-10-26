import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, UploadCloud, Trash2, Save, FileText, PlusCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext'; // <-- *** PERBAIKAN: Gunakan path alias ***
import { cn } from '@/lib/utils';

// Tipe data proyek sesuai API
type ProjectStatus = "Draft" | "Pendanaan" | "Aktif" | "Selesai" | "Dibatalkan";
interface ApiProjectData {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    overview: string | null;
    target_amount: string; // Backend DECIMAL might return string
    current_amount: string;
    backers: number;
    deadline: string | null; // Format YYYY-MM-DDTHH:mm:ss.sssZ
    location: string | null;
    category: string | null;
    image_url: string | null;
    status: ProjectStatus;
    created_by: number | null;
    created_at: string;
    updated_at: string;
}
interface ApiHighlight {
    id: number;
    title: string;
    description: string;
}
interface ApiReturnDetail {
    id: number;
    period: string;
    projection: string;
}
interface ApiGalleryItem {
    id: number;
    image_url: string;
    caption: string | null;
}
interface ApiDocumentItem {
    id: number;
    name: string;
    file_url: string;
}
interface ApiResponseData {
    project: ApiProjectData;
    galleries: ApiGalleryItem[];
    highlights: ApiHighlight[];
    documents: ApiDocumentItem[];
    returns: ApiReturnDetail[];
}

// Interface untuk state file
interface FilePreview {
    file: File | null; // Allow null for existing files in edit mode
    previewUrl: string; // Can be object URL or backend URL
    id?: number; // ID for existing files in edit mode
    path?: string; // Path for existing files in edit mode
    name?: string; // Existing document name
}

// Interface untuk highlight & return
interface Highlight {
    id: number; // Unique ID (timestamp or from DB)
    title: string;
    description: string;
    dbId?: number; // Original DB ID for updates/deletes
}
interface ReturnDetail {
    id: number; // Unique ID (timestamp or from DB)
    period: string;
    projection: string;
    dbId?: number; // Original DB ID for updates/deletes
}

const TambahEditProyekPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { token, isLoading: isAuthLoading } = useAuth();
  const isEditMode = Boolean(projectId);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // == STATE FORM ==
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [targetAmount, setTargetAmount] = useState<number | ''>('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<string>('Draft');

  // == STATE FILE ==
  const [mainImage, setMainImage] = useState<FilePreview | null>(null);
  const [galleryImages, setGalleryImages] = useState<FilePreview[]>([]);
  const [projectDocuments, setProjectDocuments] = useState<FilePreview[]>([]);
  // State untuk melacak file yang dihapus saat edit
  const [deletedFiles, setDeletedFiles] = useState<{ galleries: number[], documents: number[] }>({ galleries: [], documents: [] });

  // Refs untuk file input
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const documentsRef = useRef<HTMLInputElement>(null);

  // == STATE HIGHLIGHTS & RETURNS ==
  const [highlights, setHighlights] = useState<Highlight[]>([{ id: Date.now(), title: '', description: '' }]);
  const [returns, setReturns] = useState<ReturnDetail[]>([{ id: Date.now(), period: '', projection: '' }]);

  // == STATE LOADING & SUBMIT ==
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(isEditMode);

  // Fungsi format tanggal untuk tampilan (misal: 17 Okt 2025)
  const formatDisplayDate = (date: Date | undefined): string => {
      if (!date) return '';
      try {
           if (isNaN(date.getTime())) return '';
           return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric'});
      } catch (e) {
          console.error("Error formatting display date:", date, e);
          return '';
      }
  }


  // == FETCH DATA (untuk Edit Mode) ==
  const fetchProjectData = useCallback(async () => {
    if (!isEditMode || !projectId || !token) return;

    console.log("Fetching data for edit mode...");
    setIsFetchingData(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 404) throw new Error('Proyek tidak ditemukan.');
      if (response.status === 401 || response.status === 403) throw new Error('Akses ditolak.');
      if (!response.ok) throw new Error('Gagal mengambil data proyek.');

      const data: ApiResponseData = await response.json();

      if (!data || !data.project) {
        throw new Error("Format data tidak sesuai dari server.");
      }

      setTitle(data.project.title || '');
      setCategory(data.project.category || '');
      setLocation(data.project.location || '');
      setShortDescription(data.project.description || '');
      setOverview(data.project.overview || '');
      setTargetAmount(data.project.target_amount ? Number(data.project.target_amount) : '');
      const deadlineDate = data.project.deadline ? new Date(data.project.deadline) : undefined;
      setDeadline(deadlineDate && !isNaN(deadlineDate.getTime()) ? deadlineDate : undefined);
      setStatus(data.project.status || 'Draft');

      setHighlights(data.highlights?.length > 0 ? data.highlights.map((h) => ({ id: h.id, title: h.title, description: h.description, dbId: h.id })) : [{ id: Date.now(), title: '', description: '' }]);
      setReturns(data.returns?.length > 0 ? data.returns.map((r) => ({ id: r.id, period: r.period, projection: r.projection, dbId: r.id })) : [{ id: Date.now(), period: '', projection: '' }]);

       if (data.project.image_url) {
           setMainImage({ file: null, previewUrl: `${API_BASE_URL}/${data.project.image_url}`, id: data.project.id, path: data.project.image_url });
       }
       setGalleryImages(data.galleries?.map(g => ({ file: null, previewUrl: `${API_BASE_URL}/${g.image_url}`, id: g.id, path: g.image_url })) || []);
       setProjectDocuments(data.documents?.map(d => ({ file: null, previewUrl: '', id: d.id, path: d.file_url, name: d.name })) || []);

      console.log("Data Proyek (Edit) loaded:", data);

    } catch (error: any) {
      toast.error(`Gagal memuat data edit: ${error.message}`);
      if (error.message === 'Akses ditolak.') {
          navigate('/masuk');
      } else {
          navigate('/admin/projects');
      }
    } finally {
      setIsFetchingData(false);
    }
  }, [projectId, isEditMode, token, API_BASE_URL, navigate]);

  // useEffect untuk trigger fetch data saat edit mode dan token siap
  useEffect(() => {
    if (isEditMode && !isAuthLoading && token) {
      fetchProjectData();
    } else if (isEditMode && !isAuthLoading && !token) {
      toast.error("Token tidak ditemukan. Silakan login ulang.");
      navigate('/masuk');
      setIsFetchingData(false);
    } else if (!isEditMode) {
      setIsFetchingData(false);
    }
  }, [isEditMode, isAuthLoading, token, fetchProjectData, navigate]);


  // == HANDLER FILE ==
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<FilePreview | null>> | React.Dispatch<React.SetStateAction<FilePreview[]>>,
    isMultiple: boolean = false
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const maxSizeMB = isMultiple ? (event.target.accept === '.pdf' ? 10 : 5) : 5;
    const maxSize = maxSizeMB * 1024 * 1024;

    const validFiles = Array.from(files).filter(file => {
        if (file.size > maxSize) {
            toast.error(`File "${file.name}" terlalu besar (maks ${maxSizeMB}MB).`);
            return false;
        }
        return true;
    });

    if (validFiles.length === 0) {
        event.target.value = '';
        return;
    }


    if (isMultiple) {
      const newFiles = validFiles.map(file => ({
        file: file,
        previewUrl: ["application/pdf"].includes(file.type) ? '' : URL.createObjectURL(file)
      }));
      (setState as React.Dispatch<React.SetStateAction<FilePreview[]>>)(prev => [...prev, ...newFiles]);
    } else {
      if (mainImage && mainImage.previewUrl && mainImage.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(mainImage.previewUrl);
      }
      const file = validFiles[0];
      const newFile = {
        file: file,
        previewUrl: ["application/pdf"].includes(file.type) ? '' : URL.createObjectURL(file)
      };
      (setState as React.Dispatch<React.SetStateAction<FilePreview | null>>)(newFile);
    }
     event.target.value = '';
  };

  const removeFile = (
    item: FilePreview,
    setState: React.Dispatch<React.SetStateAction<FilePreview | null>> | React.Dispatch<React.SetStateAction<FilePreview[]>>,
    isMultiple: boolean = false
  ) => {
      if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.previewUrl);
      }

      if (isMultiple) {
          (setState as React.Dispatch<React.SetStateAction<FilePreview[]>>)(prev => prev.filter(f => f !== item));
          if (item.id && item.path) {
              const fileType = item.path.includes('documents') ? 'documents' : 'galleries';
              setDeletedFiles(prev => ({
                   ...prev,
                   [fileType]: [...prev[fileType], item.id!]
              }));
              console.log("Marked for deletion:", fileType, item.id);
          }
      } else {
          (setState as React.Dispatch<React.SetStateAction<FilePreview | null>>)(null);
           if (item.id && item.path) {
                console.warn("Main image deletion on edit not fully implemented in backend PUT request yet.");
           }
      }
  };


  // == HANDLER HIGHLIGHTS & RETURNS ==
  const handleDynamicChange = <T extends Highlight | ReturnDetail>(
    index: number,
    field: keyof T,
    value: string,
    state: T[],
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    const newState = [...state];
    newState[index] = { ...newState[index], [field]: value };
    setState(newState);
  };

  const addDynamicItem = <T extends Highlight | ReturnDetail>(
      setState: React.Dispatch<React.SetStateAction<T[]>>,
      newItem: Omit<T, 'id' | 'dbId'>
  ) => {
      setState(prev => [...prev, { id: Date.now(), ...newItem } as T]);
  };

  const removeDynamicItem = <T extends Highlight | ReturnDetail>(
      index: number,
      state: T[],
      setState: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
      if (state.length > 1) {
          setState(prev => prev.filter((_, i) => i !== index));
      } else {
          toast.error("Minimal harus ada satu item.");
      }
  };

  // == HANDLER SUBMIT ==
  const handleSubmit = async (submitStatus: ProjectStatus) => {
    setIsSubmitting(true);
    if (!token || isAuthLoading) {
      toast.error("Sesi belum siap atau token tidak ditemukan.");
      setIsSubmitting(false);
      return;
    }
     // Validasi Frontend
     if (!title || !category || !overview || targetAmount === '') {
        toast.error("Harap isi semua field yang wajib diisi (*).");
        setIsSubmitting(false);
        return;
    }
    if (!mainImage && !isEditMode) {
        toast.error("Gambar utama proyek wajib diunggah.");
        setIsSubmitting(false);
        return;
    }
    // Validasi minimal satu highlight dan return yang valid
    const validHighlights = highlights.filter(h => h.title.trim() !== '' && h.description.trim() !== '');
    const validReturns = returns.filter(r => r.period.trim() !== '' && r.projection.trim() !== '');
    if (validHighlights.length === 0 || validReturns.length === 0) {
        toast.error("Harap isi minimal satu Poin Unggulan dan satu Detail Imbal Hasil yang valid.");
        setIsSubmitting(false);
        return;
    }


    const formData = new FormData();

    // Append data teks
    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('description', shortDescription);
    formData.append('overview', overview);
    formData.append('target_amount', String(targetAmount));
    if (deadline) {
        // Format YYYY-MM-DD
        try {
            const year = deadline.getFullYear();
            const month = String(deadline.getMonth() + 1).padStart(2, '0');
            const day = String(deadline.getDate()).padStart(2, '0');
            formData.append('deadline', `${year}-${month}-${day}`);
        } catch (e) { console.error("Error formatting deadline:", e); formData.append('deadline', ''); }
    } else { formData.append('deadline', ''); }
    formData.append('status', submitStatus);

    // Append Files (HANYA file baru yang di-append)
    if (mainImage && mainImage.file) formData.append('imageUrl', mainImage.file);
    galleryImages.filter(item => item.file).forEach(item => formData.append('galleryImages', item.file!));
    projectDocuments.filter(item => item.file).forEach(item => formData.append('projectDocuments', item.file!, item.file!.name));

    // Append Highlights & Returns (JSON string)
    formData.append('highlights', JSON.stringify(validHighlights));
    formData.append('returns', JSON.stringify(validReturns));

     // Append deleted file IDs (jika edit mode)
     if (isEditMode) {
        formData.append('deletedGalleryIds', JSON.stringify(deletedFiles.galleries));
        formData.append('deletedDocumentIds', JSON.stringify(deletedFiles.documents));
     }

    try {
      const url = isEditMode ? `${API_BASE_URL}/api/projects/${projectId}` : `${API_BASE_URL}/api/projects`;
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.status === 204) {
          toast.success(`Proyek berhasil ${isEditMode ? 'diperbarui' : 'dibuat'}.`);
          navigate('/admin/projects');
          return;
      }

      let responseData = { message: `Gagal ${isEditMode ? 'memperbarui' : 'membuat'} proyek (${response.status})`};
      try { responseData = await response.json(); } catch(e) { /* ignore */ }

      if (!response.ok) { throw new Error(responseData.message || `Error ${response.status}`); }

      toast.success(responseData.message || `Proyek berhasil ${isEditMode ? 'diperbarui' : 'dibuat'}.`);
      navigate('/admin/projects');

    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

   // Cleanup URL Object saat unmount
   useEffect(() => {
    return () => {
        if (mainImage && mainImage.previewUrl && mainImage.previewUrl.startsWith('blob:')) URL.revokeObjectURL(mainImage.previewUrl);
        galleryImages.forEach(img => { if (img.previewUrl && img.previewUrl.startsWith('blob:')) URL.revokeObjectURL(img.previewUrl); });
        projectDocuments.forEach(doc => { if (doc.previewUrl && doc.previewUrl.startsWith('blob:')) URL.revokeObjectURL(doc.previewUrl); });
    };
  }, [mainImage, galleryImages, projectDocuments]);


  if (isFetchingData || isAuthLoading) {
     return <div className="flex items-center justify-center min-h-[50vh]">Memuat data formulir... <Loader2 className="ml-2 h-5 w-5 animate-spin" /></div>
  }


  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/projects">Manajemen Proyek</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{isEditMode ? 'Edit Proyek' : 'Tambah Proyek Baru'}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('/admin/projects')}>
            <ArrowLeft className="h-4 w-4" /><span className="sr-only">Kembali</span>
        </Button>
        <h1 className="text-3xl font-bold text-foreground flex-1">
           {isEditMode ? `Edit Proyek: ${title || '...'}` : 'Tambah Proyek Baru'}
        </h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="grid lg:grid-cols-3 gap-8">
        {/* Kolom Kiri - Form Utama */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>Detail utama yang akan dilihat oleh calon investor.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Nama Proyek, Kategori, Lokasi, Deskripsi, Overview */}
              <div className="space-y-2">
                <Label htmlFor="projectName">Nama Proyek *</Label>
                <Input id="projectName" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Kopi Tani Sejahtera" required disabled={isSubmitting}/>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <Select value={category} onValueChange={setCategory} required disabled={isSubmitting}>
                      <SelectTrigger id="category"><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kuliner">Kuliner</SelectItem>
                        <SelectItem value="Pertanian">Pertanian</SelectItem>
                        <SelectItem value="Kerajinan">Kerajinan</SelectItem>
                        <SelectItem value="Teknologi">Teknologi</SelectItem>
                        <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                        <SelectItem value="Sosial">Sosial</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Contoh: Malang, Jawa Timur" disabled={isSubmitting}/>
                 </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="shortDescription">Deskripsi Singkat (maks. 150 karakter)</Label>
                <Textarea id="shortDescription" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Jelaskan proyek Anda secara singkat dan menarik." maxLength={150} disabled={isSubmitting}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="overview">Ringkasan Lengkap (Overview) *</Label>
                <Textarea id="overview" rows={6} value={overview} onChange={(e) => setOverview(e.target.value)} placeholder="Jelaskan secara detail..." required disabled={isSubmitting}/>
              </div>
            </CardContent>
          </Card>

          {/* HIGHLIGHTS */}
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Poin Unggulan (Highlights)</CardTitle>
                    <CardDescription>Tonjolkan kelebihan utama proyek Anda (minimal 1).</CardDescription>
                </div>
                <Button type="button" size="sm" variant="outline" onClick={() => addDynamicItem(setHighlights, { title: '', description: '' })} disabled={isSubmitting}>
                    <PlusCircle className="h-4 w-4 mr-2"/> Tambah
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                 {/* Tambahkan variabel validHighlights untuk validasi required */}
                {(() => {
                    const validHighlights = highlights.filter(h => h.title.trim() !== '' || h.description.trim() !== '');
                    return highlights.map((item, index) => (
                        <div key={item.id} className="flex gap-4 items-start border p-4 rounded-md relative group">
                            <div className="flex-1 grid sm:grid-cols-2 gap-4">
                                <Input
                                    placeholder={`Judul Highlight ${index + 1}`}
                                    value={item.title}
                                    onChange={(e) => handleDynamicChange(index, 'title', e.target.value, highlights, setHighlights)}
                                    required={validHighlights.length === 0} // Wajib jika belum ada yg valid
                                    disabled={isSubmitting}
                                />
                                <Textarea
                                    placeholder={`Deskripsi Highlight ${index + 1}`}
                                    value={item.description}
                                    onChange={(e) => handleDynamicChange(index, 'description', e.target.value, highlights, setHighlights)}
                                    required={validHighlights.length === 0} // Wajib jika belum ada yg valid
                                    rows={1} className="min-h-[40px]" disabled={isSubmitting}
                                />
                            </div>
                            <Button
                                type="button" variant="ghost" size="icon"
                                className="text-destructive hover:bg-destructive/10 h-8 w-8 absolute -top-3 -right-3 sm:relative sm:top-0 sm:right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeDynamicItem(index, highlights, setHighlights)}
                                disabled={isSubmitting || highlights.length <= 1} aria-label="Hapus Highlight"
                            > <XCircle className="h-4 w-4" /> </Button>
                        </div>
                    ));
                })()}
            </CardContent>
          </Card>


          {/* RETURNS */}
            <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div><CardTitle>Detail Imbal Hasil (Returns)</CardTitle><CardDescription>Jelaskan proyeksi/skema imbal hasil (minimal 1).</CardDescription></div>
                 <Button type="button" size="sm" variant="outline" onClick={() => addDynamicItem(setReturns, { period: '', projection: '' })} disabled={isSubmitting}>
                    <PlusCircle className="h-4 w-4 mr-2"/> Tambah
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                 {/* Tambahkan variabel validReturns */}
                {(() => {
                    const validReturns = returns.filter(r => r.period.trim() !== '' || r.projection.trim() !== '');
                    return returns.map((item, index) => (
                        <div key={item.id} className="flex gap-4 items-start border p-4 rounded-md relative group">
                            <div className="flex-1 grid sm:grid-cols-2 gap-4">
                                <Input placeholder={`Periode/Label ${index + 1} (Contoh: Tahun 1)`} value={item.period} onChange={(e) => handleDynamicChange(index, 'period', e.target.value, returns, setReturns)} required={validReturns.length === 0} disabled={isSubmitting} />
                                <Input placeholder={`Proyeksi/Keterangan ${index + 1} (Contoh: ROI 8-12%)`} value={item.projection} onChange={(e) => handleDynamicChange(index, 'projection', e.target.value, returns, setReturns)} required={validReturns.length === 0} disabled={isSubmitting} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8 absolute -top-3 -right-3 sm:relative sm:top-0 sm:right-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeDynamicItem(index, returns, setReturns)} disabled={isSubmitting || returns.length <= 1} aria-label="Hapus Detail Return" > <XCircle className="h-4 w-4" /> </Button>
                        </div>
                    ));
                })()}
            </CardContent>
          </Card>


          {/* GAMBAR & DOKUMEN */}
          <Card>
            <CardHeader>
              <CardTitle>Gambar & Dokumen</CardTitle>
               <CardDescription>{isEditMode ? 'Unggah file baru hanya jika Anda ingin mengganti file yang sudah ada.' : 'Unggah gambar utama, galeri (opsional), dan dokumen (opsional).'}</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              {/* Gambar Utama */}
              <div className="space-y-2">
                <Label htmlFor="main-image-input">Gambar Utama Proyek {isEditMode ? '(Ganti jika perlu)' : '*'}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center min-h-[150px] relative bg-muted/30" onClick={() => !isSubmitting && mainImageRef.current?.click()}>
                  <input ref={mainImageRef} id="main-image-input" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e, setMainImage)} disabled={isSubmitting}/>
                  {mainImage ? (
                    <>
                      <img src={mainImage.previewUrl} alt="Preview Gambar Utama" className="max-h-32 rounded-md object-contain mb-2" />
                      <p className="text-xs text-muted-foreground truncate max-w-[80%]">{mainImage.file ? mainImage.file.name : mainImage.path?.split('/').pop()}</p>
                       <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); removeFile(mainImage, setMainImage); }} disabled={isSubmitting}>
                           <XCircle className="h-4 w-4" />
                       </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <UploadCloud className="w-8 h-8" />
                      <span className="text-sm font-semibold">Klik untuk unggah</span>
                      <span className="text-xs">PNG, JPG, WEBP (maks. 5MB)</span>
                    </div>
                  )}
                </div>
              </div>

               {/* Galeri */}
              <div className="space-y-2">
                <Label htmlFor="gallery-input">Galeri Gambar (Opsional)</Label>
                 <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center min-h-[150px] bg-muted/30" onClick={() => !isSubmitting && galleryRef.current?.click()}>
                     <input ref={galleryRef} id="gallery-input" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" multiple onChange={(e) => handleFileChange(e, setGalleryImages, true)} disabled={isSubmitting}/>
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <UploadCloud className="w-8 h-8" />
                        <span className="text-sm font-semibold">Klik untuk tambah gambar</span>
                         <span className="text-xs">Bisa pilih beberapa file (maks 5MB/file)</span>
                    </div>
                </div>
                {galleryImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {galleryImages.map((img, index) => (
                            <div key={img.id || index} className="relative aspect-square group">
                                <img src={img.previewUrl} alt={`Galeri ${index+1}`} className="w-full h-full object-cover rounded-md"/>
                                <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeFile(img, setGalleryImages, true)} disabled={isSubmitting}>
                                     <XCircle className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
              </div>

               {/* Dokumen */}
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="docs-input">Dokumen Pendukung (Opsional, PDF maks. 10MB)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center min-h-[100px] bg-muted/30" onClick={() => !isSubmitting && documentsRef.current?.click()}>
                        <input ref={documentsRef} id="docs-input" type="file" className="hidden" accept=".pdf" multiple onChange={(e) => handleFileChange(e, setProjectDocuments, true)} disabled={isSubmitting}/>
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <FileText className="w-8 h-8" />
                            <span className="text-sm font-semibold">Klik untuk tambah dokumen</span>
                            <span className="text-xs">Bisa pilih beberapa file PDF (maks 10MB/file)</span>
                        </div>
                    </div>
                    {projectDocuments.length > 0 && (
                        <ul className="mt-2 space-y-1">
                            {projectDocuments.map((doc, index) => (
                                <li key={doc.id || index} className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded group">
                                     {/* Tampilkan nama file atau path */}
                                    <span className="truncate flex items-center gap-1">
                                        <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground"/> {doc.file ? doc.file.name : doc.name} {/* Gunakan doc.name jika file null */}
                                    </span>
                                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeFile(doc, setProjectDocuments, true)} disabled={isSubmitting}>
                                        <XCircle className="h-4 w-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan - Aksi */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader><CardTitle>Pendanaan & Publikasi</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetDana">Target Dana (Rp) *</Label>
                <Input id="targetDana" type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  placeholder="50000000" required disabled={isSubmitting}/>
              </div>
              <div className="space-y-2">
                <Label>Deadline Penggalangan Dana</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !deadline && "text-muted-foreground")} disabled={isSubmitting}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? formatDisplayDate(deadline) : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={deadline} onSelect={setDeadline} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status Proyek</Label>
                 <Select value={status} onValueChange={setStatus} disabled={isSubmitting || (isEditMode && status !== 'Draft')}> {/* Disable jika edit & bukan draft */}
                    <SelectTrigger id="status"><SelectValue placeholder="Pilih status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                       {(status === 'Draft' || !isEditMode) && <SelectItem value="Pendanaan">Publikasikan (Pendanaan)</SelectItem>}
                       {isEditMode && status !== 'Draft' && <SelectItem value={status} disabled>{status}</SelectItem>}
                    </SelectContent>
                  </Select>
                   {isEditMode && status !== 'Draft' && <p className="text-xs text-muted-foreground mt-1">Status aktif/selesai/dibatalkan diubah melalui aksi lain.</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={() => handleSubmit(status as ProjectStatus)} disabled={isSubmitting || isAuthLoading}>
                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 {isEditMode ? 'Simpan Perubahan' : (status === 'Draft' ? 'Simpan Draft' : 'Publikasikan Proyek')}
              </Button>
               {!isEditMode && status === 'Pendanaan' && (
                 <Button variant="outline" className="w-full" onClick={() => handleSubmit('Draft')} disabled={isSubmitting || isAuthLoading}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   Simpan sebagai Draft
                 </Button>
               )}
              {isEditMode && (
                 // TODO: Implement delete functionality
                 <Button type="button" variant="ghost" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive" disabled={isSubmitting}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Proyek (Belum aktif)
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default TambahEditProyekPage;

