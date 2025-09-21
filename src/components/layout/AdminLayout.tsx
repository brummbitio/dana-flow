import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarMain } from '@/components/ui/sidebar-new';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminSidebarContent from './AdminSidebarContent';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar Statis untuk Desktop */}
            <aside className="hidden sm:flex w-72 flex-col fixed inset-y-0 z-20">
                <AdminSidebarContent />
            </aside>
            
            <div className="flex flex-1 flex-col sm:pl-72">
                {/* Header untuk Mobile */}
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:hidden">
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-0">
                             <AdminSidebarContent />
                        </SheetContent>
                    </Sheet>
                </header>

                <main className="flex-1 p-6 lg:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

