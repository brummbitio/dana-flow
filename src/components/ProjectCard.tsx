import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectData } from '@/types/project';

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const progressPercentage = (project.current_amount / project.target_amount) * 100;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return 'Tidak ada batas waktu';
    
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Berakhir';
    if (diffDays === 0) return 'Berakhir hari ini';
    return `${diffDays} hari lagi`;
  };

  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return '/api/placeholder/400/300';
    return imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}/${imageUrl}`;
  };

  return (
    <Link to={`/projek/${project.slug}`} className="block">
      <motion.div
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-card border border-border rounded-xl overflow-hidden glass-card group h-full flex flex-col"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={getImageUrl(project.image_url)} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/api/placeholder/400/300';
            }}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-accent-green text-accent-green-foreground">
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {project.description || 'Tidak ada deskripsi'}
            </p>
          </div>

          {/* Project Stats */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-card-foreground">
                  {formatCurrency(project.current_amount)}
                </div>
                <div className="text-xs text-muted-foreground">
                  dari {formatCurrency(project.target_amount)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-card-foreground flex items-center">
                  <Users size={14} className="mr-1" />
                  {project.backers}
                </div>
                <div className="text-xs text-muted-foreground">pendukung</div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="flex flex-col space-y-2 pt-2 border-t border-border">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-2" />
              <span>{formatDeadline(project.deadline)}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-2" />
              <span>{project.location || 'Lokasi tidak diketahui'}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full font-medium mt-auto">
            Dukung Projek
          </Button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;