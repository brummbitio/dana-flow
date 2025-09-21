import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarMain, SidebarNav, SidebarNavLink, SidebarNavMain } from '@/components/ui/sidebar-new';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LayoutDashboard, Wallet, HandCoins, Briefcase, Settings, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isActive = (path: string) => {
    // Make overview active for the base dashboard path as well
    if (path === '/dashboard') {
        return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <SidebarHeader>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="font-bold text-xl text-foreground">KoperasiKu</span>
          </Link>
        </SidebarHeader>

        <SidebarBody>
          <SidebarNav>
            <SidebarNavMain>
              <Link to="/dashboard" className="w-full">
                <SidebarNavLink active={isActive('/dashboard')}>
                  <LayoutDashboard className="w-4 h-4" />
                  Overview
                </SidebarNavLink>
              </Link>
              <Link to="/dashboard/simpanan" className="w-full">
                <SidebarNavLink active={isActive('/dashboard/simpanan')}>
                  <Wallet className="w-4 h-4" />
                  Simpanan
                </SidebarNavLink>
              </Link>
              <Link to="/dashboard/pinjaman" className="w-full">
                <SidebarNavLink active={isActive('/dashboard/pinjaman')}>
                  <HandCoins className="w-4 h-4" />
                  Pinjaman
                </SidebarNavLink>
              </Link>
              <Link to="/dashboard/projek" className="w-full">
                <SidebarNavLink active={isActive('/dashboard/projek')}>
                  <Briefcase className="w-4 h-4" />
                  Projek Saya
                </SidebarNavLink>
              </Link>
            </SidebarNavMain>
          </SidebarNav>
        </SidebarBody>

        <SidebarFooter>
          <SidebarNav>
            <SidebarNavMain>
              <Link to="/dashboard/pengaturan" className="w-full">
                <SidebarNavLink active={isActive('/dashboard/pengaturan')}>
                  <Settings className="w-4 h-4" />
                  Pengaturan
                </SidebarNavLink>
              </Link>
            </SidebarNavMain>
          </SidebarNav>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.fullName}`} alt={user?.fullName || ''} />
                <AvatarFallback>{getInitials(user?.fullName || '')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <button onClick={logout} className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarMain>
        <div className="flex-1 p-6 lg:p-10">
          <Outlet />
        </div>
      </SidebarMain>
    </div>
  );
};

export default DashboardLayout;
