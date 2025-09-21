import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import NewsPage from "@/pages/NewsPage";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ArticleDetailPage from "@/pages/ArticleDetailPage";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverviewPage from "./pages/dashboard/DashboardOverviewPage";
import SimpananPage from "./pages/dashboard/SimpananPage";
import PinjamanPage from "./pages/dashboard/PinjamanPage";
import ProjekSayaPage from "./pages/dashboard/ProjekSayaPage";
import PengaturanPage from "./pages/dashboard/PengaturanPage";


const queryClient = new QueryClient();

const MainLayout = () => {
  const location = useLocation();
  const hideNavFooter = ['/masuk', '/daftar'].some(path => location.pathname.startsWith(path));

  // Jangan tampilkan Navbar dan Footer jika path dimulai dengan /dashboard
  if (location.pathname.startsWith('/dashboard')) {
    return <Outlet />;
  }

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Outlet />
      {!hideNavFooter && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              {/* Rute dengan layout utama (Navbar & Footer) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/projek" element={<ProjectsPage />} />
              <Route path="/projek/:projectId" element={<ProjectDetailPage />} />
              <Route path="/berita" element={<NewsPage />} />
              <Route path="/berita/:articleId" element={<ArticleDetailPage />} />
              <Route path="/tentang-kami" element={<AboutPage />} />
              
              {/* Rute tanpa layout utama */}
              <Route path="/masuk" element={<LoginPage />} />
              <Route path="/daftar" element={<RegisterPage />} />
            </Route>
            
            {/* Rute khusus untuk Dashboard */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverviewPage />} />
              <Route path="simpanan" element={<SimpananPage />} />
              <Route path="pinjaman" element={<PinjamanPage />} />
              <Route path="projek" element={<ProjekSayaPage />} />
              <Route path="pengaturan" element={<PengaturanPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

