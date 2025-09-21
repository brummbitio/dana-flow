import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Landmark } from "lucide-react";
import { toast } from "sonner";

// --- Data Tiruan untuk Contoh ---
const activeLoan = {
  hasLoan: true,
  totalLoan: 10000000,
  paidAmount: 6500000,
  nextDueDate: "15 Oktober 2025",
  installmentAmount: 750000,
};

// Pengguna tanpa pinjaman aktif
// const activeLoan = {
//   hasLoan: false,
// };

const loanHistory = [
  { id: "PINJ-001", date: "15 Jan 2025", amount: 10000000, tenure: "12 Bulan", status: "Aktif" },
  { id: "PINJ-000", date: "05 Des 2024", amount: 5000000, tenure: "6 Bulan", status: "Lunas" },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
// --- Akhir Data Tiruan ---

const PinjamanPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const remainingLoan = activeLoan.hasLoan ? activeLoan.totalLoan - activeLoan.paidAmount : 0;
  const loanProgress = activeLoan.hasLoan ? (activeLoan.paidAmount / activeLoan.totalLoan) * 100 : 0;

  const handleNewLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = (e.target as HTMLFormElement).amount.value;
    toast.success(`Pengajuan pinjaman sebesar ${formatCurrency(Number(amount))} berhasil dikirim.`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Pinjaman</h1>
          <p className="mt-2 text-muted-foreground">
            Lihat pinjaman aktif, riwayat, dan ajukan pinjaman baru di sini.
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Ajukan Pinjaman Baru
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleNewLoanSubmit}>
                    <DialogHeader>
                        <DialogTitle>Form Pengajuan Pinjaman</DialogTitle>
                        <DialogDescription>
                            Isi formulir di bawah ini untuk mengajukan pinjaman baru. Tim kami akan segera meninjaunya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Jumlah Pinjaman</Label>
                            <Input id="amount" name="amount" type="number" placeholder="Contoh: 5000000" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tenure">Tenor (Bulan)</Label>
                            <Input id="tenure" name="tenure" type="number" placeholder="Contoh: 12" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Batal</Button>
                        </DialogClose>
                        <Button type="submit">Ajukan Sekarang</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      {/* Kartu Pinjaman Aktif */}
      <Card>
        <CardHeader>
          <CardTitle>{activeLoan.hasLoan ? "Rincian Pinjaman Aktif" : "Belum Ada Pinjaman"}</CardTitle>
          <CardDescription>{activeLoan.hasLoan ? "Informasi terkini mengenai pinjaman Anda yang sedang berjalan." : "Anda saat ini tidak memiliki pinjaman aktif. Ajukan sekarang untuk kebutuhan Anda."}</CardDescription>
        </CardHeader>
        <CardContent>
          {activeLoan.hasLoan ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sisa Tagihan</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(remainingLoan)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jatuh Tempo Berikutnya</p>
                  <p className="font-semibold">{activeLoan.nextDueDate}</p>
                </div>
                <Button>
                    <Landmark className="mr-2 h-4 w-4" /> Bayar Angsuran
                </Button>
              </div>
              <div className="space-y-2 flex flex-col justify-center">
                 <p className="text-sm font-medium">Progress Pelunasan</p>
                 <Progress value={loanProgress} aria-label={`${loanProgress}% lunas`} />
                 <p className="text-xs text-muted-foreground">{formatCurrency(activeLoan.paidAmount)} dari {formatCurrency(activeLoan.totalLoan)} telah lunas ({loanProgress.toFixed(0)}%).</p>
              </div>
            </div>
          ) : (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Mulai wujudkan kebutuhan finansial Anda bersama kami.</p>
                <Button onClick={() => setIsModalOpen(true)}>Ajukan Pinjaman Pertama Anda</Button>
             </div>
          )}
        </CardContent>
      </Card>
      
      {/* Tabel Riwayat Pinjaman */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pinjaman</CardTitle>
          <CardDescription>Daftar semua pinjaman yang pernah Anda ajukan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pinjaman</TableHead>
                <TableHead>Tanggal Pengajuan</TableHead>
                <TableHead>Jumlah Pokok</TableHead>
                <TableHead>Tenor</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanHistory.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.id}</TableCell>
                  <TableCell>{loan.date}</TableCell>
                  <TableCell>{formatCurrency(loan.amount)}</TableCell>
                  <TableCell>{loan.tenure}</TableCell>
                   <TableCell className="text-right">
                    <Badge variant={loan.status === 'Lunas' ? 'default' : 'secondary'} className={loan.status === 'Lunas' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>{loan.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PinjamanPage;

