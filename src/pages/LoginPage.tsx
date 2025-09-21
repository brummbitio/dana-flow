import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

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
                Selamat Datang
                <span className="text-primary block">Kembali!</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Lanjutkan perjalanan investasi Anda bersama komunitas 
                koperasi digital terpercaya di Indonesia.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4">
              {[
                "🔒 Keamanan berlapis dengan enkripsi end-to-end",
                "📊 Dashboard investasi real-time",
                "🚀 Akses ke 1000+ projek UMKM terverifikasi"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="flex items-center space-x-3 text-muted-foreground"
                >
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
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
              <h2 className="text-2xl font-bold">Masuk ke Akun Anda</h2>
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
              <h2 className="text-3xl font-bold mb-2">Masuk ke Akun Anda</h2>
              <p className="text-muted-foreground">
                Belum punya akun? 
                <Link to="/daftar" className="text-primary hover:underline ml-1">
                  Daftar sekarang
                </Link>
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Masukkan password Anda"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Ingat saya
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Lupa password?
                </Link>
              </div>

              <Button type="submit" className="w-full h-12 font-semibold">
                Masuk
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-muted-foreground">atau masuk dengan</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Social Login */}
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
                Belum punya akun? 
                <Link to="/daftar" className="text-primary hover:underline ml-1">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;