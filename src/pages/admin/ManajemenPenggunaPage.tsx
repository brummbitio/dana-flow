import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Tipe data untuk pengguna
// (Anda bisa memindahkan ini ke file types.ts terpisah nantinya)
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  status: "Terverifikasi" | "Menunggu Verifikasi" | "Ditolak";
};

// Data tiruan
export const mockUsers: User[] = [
  { id: 'usr_001', name: 'Budi Santoso', email: 'budi.santoso@example.com', avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=Budi', joinDate: '15 Sep 2025', status: 'Terverifikasi' },
  { id: 'usr_002', name: 'Siti Aminah', email: 'siti.aminah@example.com', avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=Siti', joinDate: '12 Sep 2025', status: 'Menunggu Verifikasi' },
  { id: 'usr_003', name: 'Ahmad Hidayat', email: 'ahmad.hidayat@example.com', avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=Ahmad', joinDate: '10 Sep 2025', status: 'Ditolak' },
  { id: 'usr_004', name: 'Dewi Lestari', email: 'dewi.lestari@example.com', avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=Dewi', joinDate: '08 Sep 2025', status: 'Terverifikasi' },
  { id: 'usr_005', name: 'Rizky Pratama', email: 'rizky.pratama@example.com', avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=Rizky', joinDate: '05 Sep 2025', status: 'Menunggu Verifikasi' },
];

const getStatusBadgeVariant = (status: User['status']) => {
  switch (status) {
    case 'Terverifikasi':
      return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
    case 'Menunggu Verifikasi':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
    case 'Ditolak':
      return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  }
};

const ManajemenPenggunaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const filteredUsers = mockUsers
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => 
      statusFilter === 'Semua' || user.status === statusFilter
    );
    
  const handleAction = (action: string, userName: string) => {
    toast.info(`Aksi "${action}" untuk pengguna ${userName} disimulasikan.`);
  };
  
  // Fungsi baru untuk navigasi ke halaman detail
  const handleViewDetails = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Pengguna</h1>
        <p className="mt-2 text-muted-foreground">
          Lihat, kelola, dan verifikasi pengguna yang terdaftar di platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>
            Total {filteredUsers.length} pengguna ditemukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <div className="relative w-full sm:w-auto sm:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari berdasarkan nama atau email..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <span>Filter: {statusFilter}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter berdasarkan status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['Semua', 'Terverifikasi', 'Menunggu Verifikasi', 'Ditolak'].map(status => (
                  <DropdownMenuItem key={status} onSelect={() => setStatusFilter(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead className="hidden md:table-cell">Tanggal Bergabung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground hidden md:block">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={getStatusBadgeVariant(user.status)}
                        >
                          {user.status}
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
                            {/* Menggunakan fungsi navigasi baru */}
                            <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>Lihat Detail & Verifikasi</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => handleAction('Nonaktifkan', user.name)}>Nonaktifkan Pengguna</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Tidak ada pengguna yang cocok dengan kriteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManajemenPenggunaPage;

