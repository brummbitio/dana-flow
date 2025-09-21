import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
  ArrowUpRight,
  Activity,
  UserPlus,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

// Data tiruan untuk statistik dan grafik
const statsCards = [
  {
    title: 'Total Pengguna',
    value: '15,231',
    change: '+20.1% dari bulan lalu',
    icon: Users,
  },
  {
    title: 'Menunggu Verifikasi',
    value: '12',
    description: 'Pengguna butuh persetujuan',
    icon: UserCheck,
    link: '/admin/users',
  },
  {
    title: 'Proyek Aktif',
    value: '45',
    change: '+10 dari bulan lalu',
    icon: Briefcase,
  },
  {
    title: 'Total Dana Terkumpul',
    value: 'Rp 2.58 M',
    change: '+15.2% dari bulan lalu',
    icon: DollarSign,
  },
];

const userGrowthData = [
  { date: 'Sen', users: 20 },
  { date: 'Sel', users: 35 },
  { date: 'Rab', users: 28 },
  { date: 'Kam', users: 45 },
  { date: 'Jum', users: 50 },
  { date: 'Sab', users: 62 },
  { date: 'Min', users: 70 },
];

const recentActivities = [
    { type: 'Pengguna Baru', description: 'Siti Nurhaliza telah mendaftar.', icon: UserPlus, time: '10 menit lalu' },
    { type: 'Proyek Baru', description: '"Kopi Tani Sejahtera" telah ditambahkan.', icon: Briefcase, time: '1 jam lalu' },
    { type: 'Verifikasi', description: 'Budi Santoso mengajukan verifikasi.', icon: UserCheck, time: '3 jam lalu' },
    { type: 'Investasi', description: 'Investasi Rp 1.000.000 pada "Kopi Tani Sejahtera".', icon: DollarSign, time: '5 jam lalu' },
];

const AdminDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Selamat Datang, {user?.fullName.split(' ')[0]}!</h1>
        <p className="mt-2 text-muted-foreground">
          Berikut adalah ringkasan aktivitas platform KoperasiKu hari ini.
        </p>
      </div>

      {/* Kartu Statistik Utama */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description || card.change}</p>
              {card.link && (
                 <Button asChild size="sm" className="mt-2">
                    <Link to={card.link}>Kelola</Link>
                 </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Konten Dua Kolom */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="bg-muted p-2 rounded-full">
                           <activity.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{activity.type}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</p>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pertumbuhan Pengguna (7 Hari Terakhir)</CardTitle>
            <CardDescription>Jumlah pendaftaran pengguna baru.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

