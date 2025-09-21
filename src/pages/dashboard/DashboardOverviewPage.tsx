import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

// --- Data Tiruan untuk Contoh ---
const savingsData = {
  total: 15250000,
  wajib: 500000,
  pokok: 1000000,
  sukarela: 13750000,
};

const loanData = {
  active: true,
  remaining: 3500000,
  total: 10000000,
};

const projectData = {
  count: 3,
  totalInvestment: 25000000,
  projects: [
    { name: "Warung Makan Bu Sari" },
    { name: "Koperasi Tani Organik" },
    { name: "Rajutan Ibu Desa" },
  ],
};

const chartData = [
  { month: "Apr", total: Math.floor(Math.random() * 2000) + 1000 },
  { month: "Mei", total: Math.floor(Math.random() * 2000) + 2000 },
  { month: "Jun", total: Math.floor(Math.random() * 2000) + 3000 },
  { month: "Jul", total: Math.floor(Math.random() * 2000) + 4000 },
  { month: "Agu", total: Math.floor(Math.random() * 2000) + 5000 },
  { month: "Sep", total: Math.floor(Math.random() * 2000) + 6000 },
]

const recentActivities = [
    { type: "Setoran Sukarela", date: "20 Sep 2025", amount: 500000, status: "Berhasil" },
    { type: "Angsuran Pinjaman", date: "15 Sep 2025", amount: -750000, status: "Berhasil" },
    { type: "Investasi Projek", date: "10 Sep 2025", amount: -2500000, status: "Berhasil" },
    { type: "Penarikan Sukarela", date: "01 Sep 2025", amount: -1000000, status: "Tertunda" },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
// --- Akhir Data Tiruan ---


const DashboardOverviewPage = () => {
  const { user } = useAuth();
  const loanProgress = loanData.active ? ((loanData.total - loanData.remaining) / loanData.total) * 100 : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Selamat Datang, {user?.fullName}!</h1>
        <p className="mt-2 text-muted-foreground">
          Berikut adalah ringkasan aktivitas finansial Anda di KoperasiKu.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Kartu Simpanan (Ukuran Besar) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Total Simpanan Anda</CardTitle>
            <CardDescription>Pertumbuhan total simpanan Anda selama 6 bulan terakhir.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end mb-6">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Total Saldo</p>
                    <p className="text-4xl font-bold">{formatCurrency(savingsData.total)}</p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Wajib</p>
                        <p className="font-semibold">{formatCurrency(savingsData.wajib)}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Pokok</p>
                        <p className="font-semibold">{formatCurrency(savingsData.pokok)}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Sukarela</p>
                        <p className="font-semibold">{formatCurrency(savingsData.sukarela)}</p>
                    </div>
                </div>
            </div>
            <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${Number(value) / 1000}k`} />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
           <CardFooter>
            <Button asChild>
                <Link to="/dashboard/simpanan">Lihat Detail Simpanan <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          {/* Kartu Pinjaman Aktif */}
          <Card>
            <CardHeader>
              <CardTitle>Pinjaman Aktif</CardTitle>
              <CardDescription>Sisa pinjaman yang perlu Anda selesaikan.</CardDescription>
            </CardHeader>
            <CardContent>
                {loanData.active ? (
                    <div className="space-y-2">
                        <p className="text-2xl font-bold">{formatCurrency(loanData.remaining)}</p>
                        <Progress value={loanProgress} aria-label={`${loanProgress}% lunas`} />
                        <p className="text-xs text-muted-foreground">{formatCurrency(loanData.total - loanData.remaining)} dari {formatCurrency(loanData.total)} telah lunas.</p>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Anda tidak memiliki pinjaman aktif saat ini.</p>
                )}
            </CardContent>
            <CardFooter>
                <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard/pinjaman">{loanData.active ? 'Lihat Angsuran' : 'Ajukan Pinjaman'}</Link>
                </Button>
            </CardFooter>
          </Card>

          {/* Kartu Portofolio Projek */}
          <Card>
            <CardHeader>
              <CardTitle>Portofolio Projek</CardTitle>
              <CardDescription>Investasi Anda pada proyek crowdfunding.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(projectData.totalInvestment)}</p>
              <p className="text-sm text-muted-foreground">{projectData.count} projek sedang didanai.</p>
            </CardContent>
             <CardFooter>
                <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard/projek">Lihat Portofolio</Link>
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Aktivitas Terbaru */}
      <Card>
        <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Daftar transaksi terakhir yang Anda lakukan.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Jenis Transaksi</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                        <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentActivities.map((activity, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{activity.type}</TableCell>
                            <TableCell className={`text-right font-semibold ${activity.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(activity.amount)}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground">{activity.date}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant={activity.status === 'Berhasil' ? 'default' : 'secondary'} className={activity.status === 'Berhasil' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>{activity.status}</Badge>
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

export default DashboardOverviewPage;

