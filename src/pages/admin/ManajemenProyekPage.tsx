import React, { useState } from 'react';
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
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { projectsData } from '@/data/projects';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProjectStatus = "Pendanaan" | "Aktif" | "Selesai" | "Dibatalkan";
type ProjectWithStatus = typeof projectsData[0] & { status: ProjectStatus };

const mockProjects: ProjectWithStatus[] = projectsData.map((p, i) => ({
  ...p,
  status: (['Pendanaan', 'Aktif', 'Selesai', 'Dibatalkan'] as ProjectStatus[])[i % 4],
}));

const getStatusBadgeVariant = (status: ProjectStatus) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Pendanaan':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Aktif':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Dibatalkan':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const ProjectTable = ({ projects }: { projects: ProjectWithStatus[] }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proyek</TableHead>
            <TableHead className="hidden md:table-cell">Dana Terkumpul</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Pendukung</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => {
              const progress = (project.currentAmount / project.targetAmount) * 100;
              return (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded-md hidden sm:block" />
                      <div>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-muted-foreground">{project.category}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{formatCurrency(project.currentAmount)}</span>
                      <Progress value={progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">dari {formatCurrency(project.targetAmount)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className={getStatusBadgeVariant(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{project.backers}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi Proyek</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(`/admin/projects/edit/${project.id}`)}>
                          Edit Proyek
                        </DropdownMenuItem>
                        <DropdownMenuItem>Lihat di Situs</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Hapus Proyek
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Tidak ada proyek.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const ManajemenProyekPage = () => {
    const [statusFilter, setStatusFilter] = useState('Semua');
    const navigate = useNavigate();
    
    const filteredProjects = mockProjects.filter(p => statusFilter === 'Semua' || p.status === statusFilter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Proyek</h1>
          <p className="mt-2 text-muted-foreground">
            Tambah, edit, dan kelola semua proyek crowdfunding di platform.
          </p>
        </div>
        <Button onClick={() => navigate('/admin/projects/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Proyek Baru
        </Button>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="Semua">Semua</TabsTrigger>
          <TabsTrigger value="Pendanaan">Pendanaan</TabsTrigger>
          <TabsTrigger value="Aktif">Aktif</TabsTrigger>
          <TabsTrigger value="Selesai">Selesai</TabsTrigger>
          <TabsTrigger value="Dibatalkan">Dibatalkan</TabsTrigger>
        </TabsList>
        <Card className="mt-4">
          <CardContent className="pt-6">
            <ProjectTable projects={filteredProjects} />
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ManajemenProyekPage;

