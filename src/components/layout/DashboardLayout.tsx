import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { SidebarMain } from '@/components/ui/sidebar-new';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import SidebarContent from './SidebarContent';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Statis untuk Desktop */}
      <aside className="fixed left-0 top-0 z-20 h-screen w-72 flex-col border-r bg-background hidden sm:flex">
        <SidebarContent />
      </aside>

      <SidebarMain>
        {/* Header untuk Mobile dengan Tombol Burger */}
        <header className="sm:hidden flex items-center justify-between h-16 px-4 border-b bg-background sticky top-0 z-10">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
               {/* Menggunakan SidebarContent di dalam Sheet untuk mobile */}
              <div className="flex h-full flex-col">
                <SidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
           {/* Anda bisa menambahkan logo atau nama perusahaan di sini jika perlu untuk mobile header */}
        </header>

        {/* Konten Utama Halaman */}
        <div className="flex-1 p-6 lg:p-10">
          <Outlet />
        </div>
      </SidebarMain>
    </div>
  );
};

export default DashboardLayout;

