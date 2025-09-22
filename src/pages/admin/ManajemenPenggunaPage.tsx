import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Tipe data pengguna sesuai dengan data dari backend
interface User {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  status: 'unverified' | 'pending' | 'verified' | 'rejected';
}

const getStatusBadgeVariant = (status: User['status']) => {
  switch (status) {
    case 'verified':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ManajemenPenggunaPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil data pengguna.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        toast.error(error.message || 'Terjadi kesalahan pada server.');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);
  
  const handleAction = (action: 'view' | 'disable' | 'delete', userId: number) => {
    if (action === 'view') {
      navigate(`/admin/users/${userId}`);
    } else {
      toast.info(`Aksi "${action}" untuk pengguna ID ${userId} belum diimplementasikan.`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Ganti dengan skeleton loader jika diinginkan
  }

  return (
     <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Pengguna</h1>
          <p className="mt-2 text-muted-foreground">
            Lihat, kelola, dan verifikasi pengguna yang terdaftar di platform.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Tambah Pengguna
        </Button>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Daftar Pengguna</CardTitle>
           <CardDescription>Total {users.length} pengguna terdaftar.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead className="hidden sm:table-cell">Tanggal Bergabung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.fullName}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {new Date(user.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                       <Badge variant="outline" className={getStatusBadgeVariant(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleAction('view', user.id)}>
                            Lihat Detail & Verifikasi
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('disable', user.id)}>
                            Nonaktifkan
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleAction('delete', user.id)}>
                            Hapus Pengguna
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManajemenPenggunaPage;

