import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { FileDown, Search } from 'lucide-react';

type TransactionStatus = 'Berhasil' | 'Tertunda' | 'Gagal';
type TransactionType = 'Setoran' | 'Penarikan' | 'Investasi' | 'Imbal Hasil' | 'Pembayaran Pinjaman';

interface Transaction {
  id: string;
  user: {
    name: string;
    email: string;
  };
  type: TransactionType;
  amount: number;
  date: string;
  status: TransactionStatus;
}

// Data tiruan yang komprehensif
const mockTransactions: Transaction[] = [
  { id: 'TRX789012', user: { name: 'Budi Santoso', email: 'budi.s@email.com' }, type: 'Investasi', amount: 5000000, date: '2024-03-15 10:30', status: 'Berhasil' },
  { id: 'TRX789013', user: { name: 'Sari Wulandari', email: 'sari.w@email.com' }, type: 'Setoran', amount: 1000000, date: '2024-03-15 09:45', status: 'Berhasil' },
  { id: 'TRX789014', user: { name: 'Ahmad Hidayat', email: 'ahmad.h@email.com' }, type: 'Pembayaran Pinjaman', amount: 750000, date: '2024-03-14 18:00', status: 'Berhasil' },
  { id: 'TRX789015', user: { name: 'Maya Indira', email: 'maya.i@email.com' }, type: 'Penarikan', amount: 250000, date: '2024-03-14 15:20', status: 'Tertunda' },
  { id: 'TRX789016', user: { name: 'Rizki Pratama', email: 'rizki.p@email.com' }, type: 'Investasi', amount: 2000000, date: '2024-03-13 11:05', status: 'Berhasil' },
  { id: 'TRX789017', user: { name: 'Budi Santoso', email: 'budi.s@email.com' }, type: 'Imbal Hasil', amount: 150000, date: '2024-03-12 14:00', status: 'Berhasil' },
  { id: 'TRX789018', user: { name: 'Sari Wulandari', email: 'sari.w@email.com' }, type: 'Setoran', amount: 500000, date: '2024-03-11 08:55', status: 'Gagal' },
];

const getStatusBadgeVariant = (status: TransactionStatus) => {
  switch (status) {
    case 'Berhasil':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Tertunda':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Gagal':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const ManajemenTransaksiPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Transaksi</h1>
          <p className="mt-2 text-muted-foreground">
            Lacak dan kelola semua aktivitas finansial di platform.
          </p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Ekspor Data (CSV)
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Filter Transaksi</CardTitle>
            <CardDescription>Gunakan filter untuk mencari transaksi spesifik.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari berdasarkan nama/email/ID..." className="pl-8" />
                </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Semua Tipe Transaksi" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="semua">Semua Tipe</SelectItem>
                        <SelectItem value="setoran">Setoran</SelectItem>
                        <SelectItem value="penarikan">Penarikan</SelectItem>
                        <SelectItem value="investasi">Investasi</SelectItem>
                        <SelectItem value="imbal hasil">Imbal Hasil</SelectItem>
                        <SelectItem value="pembayaran pinjaman">Pembayaran Pinjaman</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="semua">Semua Status</SelectItem>
                        <SelectItem value="berhasil">Berhasil</SelectItem>
                        <SelectItem value="tertunda">Tertunda</SelectItem>
                        <SelectItem value="gagal">Gagal</SelectItem>
                    </SelectContent>
                </Select>
                <Button>Terapkan Filter</Button>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Pengguna</TableHead>
                  <TableHead className="hidden md:table-cell">Tipe</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{transaction.user.name}</div>
                      <div className="text-sm text-muted-foreground">{transaction.user.email}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.type}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeVariant(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
            </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ManajemenTransaksiPage;

