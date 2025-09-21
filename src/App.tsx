import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavFooter = ['/masuk', '/daftar'].includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      {children}
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
        <AuthProvider> {/* Bungkus aplikasi dengan AuthProvider */}
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projek" element={<ProjectsPage />} />
              <Route path="/projek/:projectId" element={<ProjectDetailPage />} />
              <Route path="/berita" element={<NewsPage />} />
              <Route path="/berita/:articleId" element={<ArticleDetailPage />} />
              <Route path="/tentang-kami" element={<AboutPage />} />
              <Route path="/masuk" element={<LoginPage />} />
              <Route path="/daftar" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

