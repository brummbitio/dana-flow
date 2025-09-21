import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Tipe data untuk pengguna
interface User {
  id: number;
  fullName: string;
  email: string;
  // --- PERUBAHAN DIMULAI DI SINI ---
  status: 'unverified' | 'pending' | 'verified' | 'rejected';
  role: 'user' | 'admin';
  // --- PERUBAHAN SELESAI DI SINI ---
}

// Tipe data untuk konteks
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

// Membuat konteks
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props untuk provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      // Menambahkan nilai default jika status/role tidak ada di localStorage
      setUser({
        ...parsedUser,
        status: parsedUser.status || 'unverified',
        role: parsedUser.role || 'user',
      });
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    // Memastikan data pengguna baru memiliki status dan peran
    const userToStore = {
      ...userData,
      status: userData.status || 'unverified',
      role: userData.role || 'user',
    };
    localStorage.setItem('user', JSON.stringify(userToStore));
    setToken(newToken);
    setUser(userToStore);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
