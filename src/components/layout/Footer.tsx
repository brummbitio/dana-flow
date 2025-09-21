import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-card pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="font-bold text-xl text-card">KoperasiKu</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Platform koperasi digital terpercaya untuk urunan dana, investasi komunitas, 
              dan pengembangan UMKM bersama.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-card">Layanan</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/projek" className="hover:text-primary transition-colors">Urunan Dana</Link></li>
              <li><Link to="/projek" className="hover:text-primary transition-colors">Investasi UMKM</Link></li>
              <li><Link to="/projek" className="hover:text-primary transition-colors">Koperasi Digital</Link></li>
              <li><Link to="/projek" className="hover:text-primary transition-colors">Manajemen Komunitas</Link></li>
              <li><Link to="/projek" className="hover:text-primary transition-colors">Konsultasi Bisnis</Link></li>
            </ul>
          </div>

          {/* Legal & Documents Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-card">Legalitas & Dokumen</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Panduan Pengguna</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sertifikat OJK</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-card">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail size={18} />
                <span>info@koperasiku.id</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone size={18} />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 KoperasiKu. Semua hak cipta dilindungi undang-undang.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Bantuan</a>
              <a href="#" className="hover:text-primary transition-colors">Karir</a>
              <a href="#" className="hover:text-primary transition-colors">Press Kit</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;