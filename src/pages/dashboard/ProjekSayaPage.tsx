import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ArrowRight, TrendingUp, Briefcase, Percent } from "lucide-react";

// --- Data Tiruan untuk Contoh ---
const portfolioSummary = {
  totalInvestment: 25000000,
  activeProjects: 3,
  potentialReturn: 3750000, // Misal 15% dari total investasi
};

const investedProjects = [
  { 
    id: "warung-makan-bu-sari", 
    name: "Warung Makan Bu Sari", 
    userInvestment: 10000000, 
    totalFunding: 50000000,
    currentFunding: 35000000,
    status: "Aktif" 
  },
  { 
    id: "koperasi-tani-organik", 
    name: "Koperasi Tani Organik", 
    userInvestment: 10000000, 
    totalFunding: 75000000,
    currentFunding: 45000000,
    status: "Aktif" 
  },
  { 
    id: "rajutan-ibu-desa-cirebon", 
    name: "Rajutan Ibu-Ibu Desa", 
    userInvestment: 5000000, 
    totalFunding: 25000000,
    currentFunding: 25000000,
    status: "Selesai" 
  },
];

const allocationData = [
  { name: 'Kuliner', value: 10000000, color: 'hsl(var(--primary))' },
  { name: 'Pertanian', value: 10000000, color: 'hsl(var(--primary) / 0.8)' },
  { name: 'Kerajinan', value: 5000000, color: 'hsl(var(--primary) / 0.6)' },
];

const returnsHistory = [
    { projectName: "Rajutan Ibu-Ibu Desa", amount: 750000, date: "10 Agustus 2025" }
];


const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
// --- Akhir Data Tiruan ---


const ProjekSayaPage = () => {
  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portofolio Projek Saya</h1>
          <p className="mt-2 text-muted-foreground">
            Pantau semua investasi crowdfunding Anda di satu tempat.
          </p>
        </div>
        <Button asChild>
          <Link to="/projek">
            Cari Projek Baru <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Kartu Ringkasan */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investasi</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolioSummary.totalInvestment)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projek Aktif</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioSummary.activeProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potensi Imbal Hasil</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolioSummary.potentialReturn)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Daftar Proyek yang Diinvestasikan */}
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Daftar Investasi Anda</h2>
            {investedProjects.map(project => {
                const progress = (project.currentFunding / project.totalFunding) * 100;
                return (
                    <Card key={project.id} className="hover:bg-muted/50 transition-colors">
                        <Link to={`/projek/${project.id}`} className="block">
                            <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start">
                                <img src="/api/placeholder/400/300" alt={project.name} className="w-full sm:w-32 h-24 object-cover rounded-md" />
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold">{project.name}</h3>
                                        <Badge variant={project.status === 'Aktif' ? 'secondary' : 'default'} className={project.status === 'Selesai' ? 'bg-green-100 text-green-800' : ''}>{project.status}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Anda berinvestasi: <span className="font-bold text-foreground">{formatCurrency(project.userInvestment)}</span></p>
                                    <div>
                                        <Progress value={progress} className="h-2" />
                                        <p className="text-xs text-muted-foreground mt-1">{formatCurrency(project.currentFunding)} terkumpul dari {formatCurrency(project.totalFunding)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                )
            })}
        </div>

        {/* Visualisasi Portofolio */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Alokasi Dana</CardTitle>
                    <CardDescription>Distribusi investasi Anda per kategori.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[200px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={allocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {allocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Legend iconSize={10} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Imbal Hasil Diterima</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Projek</TableHead>
                                <TableHead className="text-right">Jumlah</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {returnsHistory.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-sm">{item.projectName}</TableCell>
                                    <TableCell className="text-right font-semibold text-green-600">{formatCurrency(item.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjekSayaPage;

