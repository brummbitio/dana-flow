import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Clock, UploadCloud, FileText, Loader2, Info } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface VerificationData {
    notes?: string;
}

const FileUpload = ({ label, onFileSelect, acceptedFormat }: { label: string, onFileSelect: (file: File | null) => void, acceptedFormat: string }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
        setFileName(file.name);
        onFileSelect(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div 
        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center h-48"
        onClick={() => inputRef.current?.click()}
      >
        <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" accept={acceptedFormat} />
        {preview ? (
            <img src={preview} alt="Preview" className="max-h-32 rounded-md object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <UploadCloud className="w-8 h-8" />
            <span>Klik untuk memilih file</span>
          </div>
        )}
      </div>
       {fileName && (
          <div className="flex items-center justify-center gap-2 text-green-600 text-sm mt-2">
            <FileText className="w-4 h-4" />
            <span className="font-medium">{fileName}</span>
          </div>
        )}
    </div>
  );
};


const PengaturanPage = () => {
  const { user, token, updateUserStatus } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionNotes, setRejectionNotes] = useState<string | null>(null);
  const [ktpImage, setKtpImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
        if (user?.status === 'rejected') {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verification/status`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data: VerificationData = await response.json();
                    if (data.notes) {
                        setRejectionNotes(data.notes);
                    }
                }
            } catch (error) {
                console.error("Gagal mengambil catatan penolakan:", error);
            }
        }
    };
    fetchVerificationStatus();
  }, [user?.status, token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!ktpImage || !selfieImage) {
        toast.error("Harap unggah foto KTP dan foto selfie.");
        setIsLoading(false);
        return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append('ktpImage', ktpImage);
    formData.append('selfieImage', selfieImage);
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verification/submit`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Gagal mengirim data verifikasi.');

        toast.success(data.message);
        updateUserStatus('pending');

    } catch (error: any) {
        toast.error(error.message);
    } finally {
        setIsLoading(false);
    }
  };
  
  const renderContent = () => {
    switch (user?.status) {
      case 'verified':
        return (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Akun Terverifikasi</AlertTitle>
            <AlertDescription className="text-green-700">
              Selamat! Akun Anda telah berhasil diverifikasi.
            </AlertDescription>
          </Alert>
        );
      case 'pending':
        return (
          <Alert variant="default" className="bg-yellow-50 border-yellow-200">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Verifikasi Sedang Diproses</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Terima kasih, data Anda sedang ditinjau oleh tim kami.
            </AlertDescription>
          </Alert>
        );
      default: // 'unverified' atau 'rejected'
        return (
           <>
            {user?.status === 'rejected' && rejectionNotes && (
                <Alert variant="destructive" className="mb-6">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Verifikasi Ditolak</AlertTitle>
                    <AlertDescription>
                        <p className="font-semibold">Alasan:</p>
                        <p>{rejectionNotes}</p>
                        <p className="mt-2">Silakan perbaiki dan ajukan ulang data Anda.</p>
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Formulir Verifikasi Identitas</CardTitle>
                  <CardDescription>Lengkapi data diri Anda sesuai KTP untuk verifikasi.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullNameKtp">Nama Lengkap (sesuai KTP)</Label>
                      <Input name="fullNameKtp" id="fullNameKtp" defaultValue={user?.fullName} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Label>
                      <Input name="nik" id="nik" placeholder="16 digit NIK" required minLength={16} maxLength={16} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressKtp">Alamat (sesuai KTP)</Label>
                    <Textarea name="addressKtp" id="addressKtp" placeholder="Contoh: Jl. Jenderal Sudirman No. 123, RT 01/RW 02..." required />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Unggah Dokumen</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-6">
                  <FileUpload label="Foto KTP" onFileSelect={setKtpImage} acceptedFormat="image/png, image/jpeg" />
                  <FileUpload label="Selfie dengan KTP" onFileSelect={setSelfieImage} acceptedFormat="image/png, image/jpeg" />
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {user?.status === 'rejected' ? 'Ajukan Ulang Verifikasi' : 'Kirim Data Verifikasi'}
                </Button>
              </div>
            </form>
           </>
        );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">Pengaturan Akun</h1>
      <p className="mt-2 text-muted-foreground mb-6">
        Kelola informasi profil dan verifikasi akun Anda di sini.
      </p>
      {renderContent()}
    </div>
  );
};

export default PengaturanPage;

