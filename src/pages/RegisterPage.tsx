import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';

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
    agreeNewsletter: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
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
        {/* Left Side - Branding */}
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

            {/* Benefits List */}
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

            {/* Trust Indicators */}
            <div className="glass-card p-6 rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold text-2xl text-primary">15K+</div>
                  <div className="text-xs text-muted-foreground">Anggota Aktif</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-primary">Rp 2.5B</div>
                  <div className="text-xs text-muted-foreground">Dana Tersalurkan</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">Tingkat Sukses</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="glass-card p-8 lg:p-12 rounded-2xl max-w-md mx-auto lg:max-w-none">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">K</span>
                </div>
                <span className="font-bold text-xl">KoperasiKu</span>
              </div>
              <h2 className="text-2xl font-bold">Buat Akun Baru</h2>
            </div>

            {/* Back Button for Desktop */}
            <div className="hidden lg:block mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Kembali ke Beranda
              </Link>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl font-bold mb-2">Buat Akun Baru</h2>
              <p className="text-muted-foreground">
                Sudah punya akun? 
                <Link to="/masuk" className="text-primary hover:underline ml-1">
                  Masuk di sini
                </Link>
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    placeholder="Masukkan nama lengkap"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                    }
                    required
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    Saya menyetujui{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Syarat & Ketentuan
                    </Link>
                    {' '}dan{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Kebijakan Privasi
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.agreeNewsletter}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeNewsletter: checked as boolean }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="newsletter" className="text-sm leading-relaxed">
                    Saya ingin menerima newsletter dan update terbaru dari KoperasiKu
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 font-semibold">
                Daftar Sekarang
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-muted-foreground">atau daftar dengan</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Social Register */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 font-semibold">
                <img src="/api/placeholder/20/20" alt="Google" className="mr-2" />
                Lanjutkan dengan Google
              </Button>
              <Button variant="outline" className="w-full h-12 font-semibold">
                <img src="/api/placeholder/20/20" alt="Facebook" className="mr-2" />
                Lanjutkan dengan Facebook
              </Button>
            </div>

            {/* Mobile Footer */}
            <div className="lg:hidden mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                Sudah punya akun? 
                <Link to="/masuk" className="text-primary hover:underline ml-1">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;