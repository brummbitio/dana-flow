import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { toast } from "sonner";

// --- Data Tiruan untuk Contoh ---
const savingsSummary = {
  wajib: 500000,
  pokok: 1000000,
  sukarela: 13750000,
};

const transactionHistory = [
  { id: 1, date: "20 Sep 2025", description: "Setoran rutin bulanan", type: "Wajib", amount: 100000, status: "Berhasil" },
  { id: 2, date: "20 Sep 2025", description: "Setoran via transfer bank", type: "Sukarela", amount: 500000, status: "Berhasil" },
  { id: 3, date: "15 Sep 2025", description: "Pembayaran angsuran pinjaman", type: "Sukarela", amount: 750000, status: "Berhasil" },
  { id: 4, date: "01 Sep 2025", description: "Penarikan dana darurat", type: "Sukarela", amount: -1000000, status: "Berhasil" },
  { id: 5, date: "20 Agu 2025", description: "Setoran rutin bulanan", type: "Wajib", amount: 100000, status: "Berhasil" },
  { id: 6, date: "10 Agu 2025", description: "Investasi ke Projek Bu Sari", type: "Sukarela", amount: -2500000, status: "Berhasil" },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
// --- Akhir Data Tiruan ---

const SimpananPage = () => {
    const [dialogType, setDialogType] = useState<'setor' | 'tarik' | null>(null);

    const handleTransactionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = (e.target as HTMLFormElement).amount.value;
        if (!amount || amount <= 0) {
            toast.error("Jumlah harus diisi dan lebih dari nol.");
            return;
        }
        
        toast.success(`Permintaan ${dialogType === 'setor' ? 'setoran' : 'penarikan'} sebesar ${formatCurrency(Number(amount))} telah berhasil diajukan.`);
        setDialogType(null); // Menutup dialog setelah submit
    };

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rincian Simpanan</h1>
          <p className="mt-2 text-muted-foreground">
            Kelola dan pantau semua aktivitas simpanan Anda di sini.
          </p>
        </div>
        <Dialog open={!!dialogType} onOpenChange={(isOpen) => !isOpen && setDialogType(null)}>
            <DialogTrigger asChild>
                <div className="flex gap-2">
                    <Button onClick={() => setDialogType('setor')}>
                        <ArrowUpCircle className="mr-2 h-4 w-4" /> Setor Simpanan
                    </Button>
                    <Button variant="outline" onClick={() => setDialogType('tarik')}>
                        <ArrowDownCircle className="mr-2 h-4 w-4" /> Tarik Simpanan
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleTransactionSubmit}>
                    <DialogHeader>
                        <DialogTitle>{dialogType === 'setor' ? 'Form Setor Simpanan' : 'Form Penarikan Simpanan'}</DialogTitle>
                        <DialogDescription>
                            Masukkan jumlah yang ingin Anda {dialogType === 'setor' ? 'setorkan' : 'tarik'}. Proses akan diverifikasi oleh tim kami.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Jumlah</Label>
                            <Input id="amount" name="amount" type="number" placeholder="Contoh: 500000" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="type">Jenis Simpanan</Label>
                            <Select defaultValue="sukarela" required>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Pilih jenis simpanan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sukarela">Simpanan Sukarela</SelectItem>
                                    <SelectItem value="wajib" disabled>Simpanan Wajib (Otomatis)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Batal</Button>
                        </DialogClose>
                        <Button type="submit">{dialogType === 'setor' ? 'Setor Sekarang' : 'Ajukan Penarikan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      {/* Kartu Rincian Saldo */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Simpanan Wajib</CardTitle>
            <CardDescription>Simpanan rutin setiap bulan.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(savingsSummary.wajib)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Simpanan Pokok</CardTitle>
            <CardDescription>Simpanan awal saat menjadi anggota.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(savingsSummary.pokok)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Simpanan Sukarela</CardTitle>
            <CardDescription>Simpanan fleksibel yang bisa ditarik.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(savingsSummary.sukarela)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Riwayat Transaksi */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi Simpanan</CardTitle>
          <CardDescription>Daftar semua transaksi setoran dan penarikan yang tercatat.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell className="font-medium">{trx.date}</TableCell>
                  <TableCell>{trx.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{trx.type}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${trx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(trx.amount)}
                  </TableCell>
                   <TableCell className="text-right">
                    <Badge variant={trx.status === 'Berhasil' ? 'default' : 'secondary'} className={trx.status === 'Berhasil' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>{trx.status}</Badge>
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

export default SimpananPage;

