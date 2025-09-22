import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
} from '@/components/ui/sidebar-new';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LayoutDashboard, Wallet, HandCoins, Briefcase, Settings, LogOut } from 'lucide-react';

interface SidebarContentProps {
  onLinkClick?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ onLinkClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isVerified = user?.status === 'verified';

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname.startsWith('/dashboard/'));
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
            <SidebarNavLink to="/dashboard" active={isActive('/dashboard')} onClick={onLinkClick} disabled={!isVerified}>
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </SidebarNavLink>
            <SidebarNavLink to="/dashboard/simpanan" active={isActive('/dashboard/simpanan')} onClick={onLinkClick} disabled={!isVerified}>
              <Wallet className="w-4 h-4" />
              Simpanan
            </SidebarNavLink>
            <SidebarNavLink to="/dashboard/pinjaman" active={isActive('/dashboard/pinjaman')} onClick={onLinkClick} disabled={!isVerified}>
              <HandCoins className="w-4 h-4" />
              Pinjaman
            </SidebarNavLink>
            <SidebarNavLink to="/dashboard/projek" active={isActive('/dashboard/projek')} onClick={onLinkClick} disabled={!isVerified}>
              <Briefcase className="w-4 h-4" />
              Projek Saya
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarBody>

      <SidebarFooter>
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink to="/dashboard/pengaturan" active={isActive('/dashboard/pengaturan')} onClick={onLinkClick}>
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

export default SidebarContent;

