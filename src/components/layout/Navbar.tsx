import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'; // Import LayoutDashboard
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Projek', path: '/projek' },
    { name: 'Berita', path: '/berita' },
    { name: 'Tentang Kami', path: '/tentang-kami' },
  ];

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isLoading) {
    return null; // Atau tampilkan skeleton loader
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/95 backdrop-blur-md shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg lg:text-xl">K</span>
            </div>
            <span className="font-bold text-xl lg:text-2xl text-foreground">KoperasiKu</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover:text-primary relative ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.fullName}`} alt={user.fullName} />
                      <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.fullName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* === PERUBAHAN DIMULAI DI SINI === */}
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard Saya</span>
                    </Link>
                  </DropdownMenuItem>
                  {/* === PERUBAHAN SELESAI DI SINI === */}
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild className="font-medium">
                  <Link to="/masuk">Masuk</Link>
                </Button>
                <Button asChild className="font-medium">
                  <Link to="/daftar">Daftar</Link>
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-medium transition-colors duration-200 hover:text-primary ${
                    location.pathname === link.path 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t mt-4">
                 {isAuthenticated && user ? (
                   <>
                    <div className="flex items-center space-x-3 mb-4">
                       <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.fullName}`} alt={user.fullName} />
                        <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{user.fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    {/* === PERUBAHAN DIMULAI DI SINI (MOBILE) === */}
                    <Button variant="outline" asChild className="w-full font-medium justify-start">
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard Saya
                      </Link>
                    </Button>
                    {/* === PERUBAHAN SELESAI DI SINI (MOBILE) === */}
                    <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full font-medium">
                      <LogOut className="mr-2 h-4 w-4" />
                      Keluar
                    </Button>
                   </>
                 ) : (
                  <>
                    <Button variant="ghost" asChild className="w-full font-medium">
                      <Link to="/masuk" onClick={() => setIsMobileMenuOpen(false)}>Masuk</Link>
                    </Button>
                    <Button asChild className="w-full font-medium">
                      <Link to="/daftar" onClick={() => setIsMobileMenuOpen(false)}>Daftar</Link>
                    </Button>
                  </>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
