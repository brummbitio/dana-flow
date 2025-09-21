import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Clock, AlertCircle, UploadCloud, FileText } from "lucide-react";
import React, { useState } from "react";

// Komponen untuk mengunggah file (simulasi)
const FileUpload = ({ label, onFileSelect }: { label: string, onFileSelect: (file: File | null) => void }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    onFileSelect(file);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div 
        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />
        {fileName ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <FileText className="w-5 h-5" />
            <span className="font-medium">{fileName}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <UploadCloud className="w-8 h-8" />
            <span>Klik untuk memilih file</span>
          </div>
        )}
      </div>
    </div>
  );
};


const PengaturanPage = () => {
  const { user } = useAuth();
  
  // State untuk menyimpan file yang diunggah
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini logika untuk mengirim data form dan file ke backend
    // Untuk saat ini, kita hanya akan log ke console
    console.log("Data dikirim:", {
      ktpFile: ktpFile?.name,
      selfieFile: selfieFile?.name,
    });
    alert("Data verifikasi (simulasi) telah dikirim!");
  };
  
  // Tampilan berdasarkan status verifikasi pengguna
  const renderContent = () => {
    switch (user?.status) {
      case 'verified':
        return (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Akun Terverifikasi</AlertTitle>
            <AlertDescription className="text-green-700">
              Selamat! Akun Anda telah berhasil diverifikasi. Anda sekarang dapat mengakses semua fitur.
            </AlertDescription>
          </Alert>
        );
      case 'pending':
        return (
          <Alert variant="default" className="bg-yellow-50 border-yellow-200">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Verifikasi Sedang Diproses</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Terima kasih telah mengirimkan data Anda. Tim kami akan meninjau data Anda dalam 1-2 hari kerja.
            </AlertDescription>
          </Alert>
        );
      default: // 'unverified' atau 'rejected'
        return (
           <form onSubmit={handleSubmit}>
            <Card>
            <CardHeader>
              <CardTitle>Profil Pengguna</CardTitle>
              <CardDescription>Lengkapi data diri Anda sesuai dengan KTP untuk melanjutkan proses verifikasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap (sesuai KTP)</Label>
                  <Input id="fullName" defaultValue={user?.fullName} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Label>
                  <Input id="nik" placeholder="Masukkan 16 digit NIK Anda" required />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="address">Alamat (sesuai KTP)</Label>
                <Input id="address" placeholder="Contoh: Jl. Jenderal Sudirman No. 123" required />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Verifikasi Dokumen</CardTitle>
              <CardDescription>Unggah foto KTP dan swafoto Anda untuk menyelesaikan proses verifikasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload label="Foto KTP" onFileSelect={setKtpFile} />
              <FileUpload label="Swafoto dengan KTP" onFileSelect={setSelfieFile} />
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button type="submit">Kirim Data Verifikasi</Button>
          </div>
           </form>
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

