import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const AdminPengaturanPage = () => {
  const { user } = useAuth();

  const getInitials = (name: string | undefined) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Fungsi handler simulasi
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perubahan profil berhasil disimpan!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password berhasil diubah!");
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">Pengaturan Admin</h1>
      <p className="mt-2 text-muted-foreground">
        Kelola profil, keamanan, dan preferensi notifikasi Anda.
      </p>

      <Tabs defaultValue="profil" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
          <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
        </TabsList>

        {/* Tab Profil */}
        <TabsContent value="profil">
          <form onSubmit={handleSaveChanges}>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>Perbarui informasi personal dan foto profil Anda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.fullName}`} />
                    <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline">Ubah Foto</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input id="fullName" defaultValue={user?.fullName || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email || ''} readOnly disabled />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Simpan Perubahan</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Tab Keamanan */}
        <TabsContent value="keamanan">
          <form onSubmit={handleChangePassword}>
            <Card>
              <CardHeader>
                <CardTitle>Ubah Password</CardTitle>
                <CardDescription>Pastikan akun Anda menggunakan password yang kuat dan unik.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Ubah Password</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Tab Notifikasi */}
        <TabsContent value="notifikasi">
          <Card>
            <CardHeader>
              <CardTitle>Preferensi Notifikasi</CardTitle>
              <CardDescription>Pilih notifikasi email yang ingin Anda terima.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                <div className="flex flex-col">
                  <Label htmlFor="newUserNotif" className="cursor-pointer">Pengguna Baru</Label>
                  <span className="text-xs text-muted-foreground">
                    Saat ada pengguna baru yang mendaftar.
                  </span>
                </div>
                <Switch id="newUserNotif" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                <div className="flex flex-col">
                  <Label htmlFor="verificationNotif" className="cursor-pointer">Pengajuan Verifikasi</Label>
                  <span className="text-xs text-muted-foreground">
                    Saat ada pengguna yang mengajukan verifikasi data.
                  </span>
                </div>
                <Switch id="verificationNotif" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                <div className="flex flex-col">
                  <Label htmlFor="weeklySummary" className="cursor-pointer">Ringkasan Mingguan</Label>
                  <span className="text-xs text-muted-foreground">
                    Laporan aktivitas platform setiap minggu.
                  </span>
                </div>
                <Switch id="weeklySummary" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPengaturanPage;

