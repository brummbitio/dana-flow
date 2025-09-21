import { Link, useLocation } from 'react-router-dom';
import { SidebarBody, SidebarFooter, SidebarHeader, SidebarNav, SidebarNavLink, SidebarNavMain } from '@/components/ui/sidebar-new';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LayoutDashboard, Users, Briefcase, Banknote, Settings, LogOut } from 'lucide-react';

const AdminSidebarContent = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isActive = (path: string) => {
    // Make overview active only on the exact path
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
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
            <SidebarNavLink to="/admin" active={isActive('/admin')}>
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </SidebarNavLink>
            <SidebarNavLink to="/admin/users" active={isActive('/admin/users')}>
              <Users className="w-4 h-4" />
              Manajemen Pengguna
            </SidebarNavLink>
            <SidebarNavLink to="/admin/projects" active={isActive('/admin/projects')}>
              <Briefcase className="w-4 h-4" />
              Manajemen Proyek
            </SidebarNavLink>
            <SidebarNavLink to="/admin/transactions" active={isActive('/admin/transactions')}>
              <Banknote className="w-4 h-4" />
              Manajemen Transaksi
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarBody>

      <SidebarFooter>
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink to="/admin/settings" active={isActive('/admin/settings')}>
              <Settings className="w-4 h-4" />
              Pengaturan
            </SidebarNavLink>
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
    </>
  );
};

export default AdminSidebarContent;

