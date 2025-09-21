import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok.');
      return;
    }
    if (!formData.agreeTerms) {
      toast.error('Anda harus menyetujui Syarat & Ketentuan.');
      return;
    }
    
    setIsLoading(true);
    try {
      // Menggunakan environment variable untuk base URL API
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal untuk mendaftar.');
      }
      
      toast.success('Registrasi berhasil! Silakan masuk.');
      navigate('/masuk');

    } catch (error: any) {
      toast.error(error.message || 'Terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const benefits = [
    "Akses ke 1000+ projek UMKM terverifikasi",
    "Dashboard investasi real-time",
    "Komunitas investor aktif",
    "Edukasi dan konsultasi gratis",
    "Return investasi hingga 12% per tahun"
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
           <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">K</span>
              </div>
              <span className="font-bold text-3xl text-foreground">KoperasiKu</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Mulai Investasi
                <span className="text-primary block">Bersama Kami</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Bergabunglah dengan ribuan investor lainnya dan dukung 
                pertumbuhan UMKM Indonesia melalui platform koperasi digital terpercaya.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Keuntungan Bergabung:</h3>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="glass-card p-8 lg:p-12 rounded-2xl max-w-md mx-auto lg:max-w-none">
            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl font-bold mb-2">Buat Akun Baru</h2>
              <p className="text-muted-foreground">
                Sudah punya akun? 
                <Link to="/masuk" className="text-primary hover:underline ml-1">
                  Masuk di sini
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input id="fullName" placeholder="Masukkan nama lengkap" value={formData.fullName} onChange={handleChange} required disabled={isLoading} className="h-12"/>
                </div>
               <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange} required disabled={isLoading} className="h-12"/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Minimal 8 karakter" value={formData.password} onChange={handleChange} required disabled={isLoading} className="h-12 pr-10"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                  <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Ulangi password" value={formData.confirmPassword} onChange={handleChange} required disabled={isLoading} className="h-12 pr-10"/>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="agreeTerms" checked={formData.agreeTerms} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))} required disabled={isLoading} className="mt-1"/>
                  <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                    Saya menyetujui{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Syarat & Ketentuan
                    </Link>
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 font-semibold" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Daftar Sekarang
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;

