import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Menu, Terminal, UserCheck } from 'lucide-react';
import SidebarContent from './SidebarContent';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  const isVerified = user?.status === 'verified';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar untuk Desktop */}
      <aside className="fixed left-0 top-0 z-20 h-screen w-72 border-r bg-background hidden sm:flex flex-col">
        <SidebarContent />
      </aside>

      <main className="flex-1 sm:pl-72">
        {/* Header untuk Mobile */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 sm:hidden">
          <Link to="/" className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="font-bold text-xl text-foreground">KoperasiKu</span>
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
               <div className="flex h-full flex-col">
                 <SidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
               </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Konten Utama */}
        <div className="flex-1 p-6 lg:p-10">
          {!isVerified && (
            <Alert className="mb-6 border-yellow-500 text-yellow-800 [&>svg]:text-yellow-600">
                <UserCheck className="h-4 w-4" />
                <AlertTitle className="font-bold">Akun Anda Belum Terverifikasi</AlertTitle>
                <AlertDescription>
                    Untuk mengakses semua fitur dashboard seperti simpanan, pinjaman, dan proyek, Anda perlu melengkapi data diri terlebih dahulu.
                    <Button asChild variant="link" className="p-0 h-auto ml-1 text-yellow-800 font-bold">
                        <Link to="/dashboard/pengaturan">Lengkapi Profil Sekarang</Link>
                    </Button>
                </AlertDescription>
            </Alert>
          )}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

