import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string; // Tambahkan ID untuk link
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  backers: number;
  deadline: string;
  location: string;
  category: string;
  imageUrl: string;
}

const ProjectCard = ({
  id,
  title,
  description,
  targetAmount,
  currentAmount,
  backers,
  deadline,
  location,
  category,
  imageUrl,
}: ProjectCardProps) => {
  const progressPercentage = (currentAmount / targetAmount) * 100;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link to={`/projek/${id}`} className="block">
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
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-accent-green text-accent-green-foreground">
              {category}
            </Badge>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {description}
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
                  {formatCurrency(currentAmount)}
                </div>
                <div className="text-xs text-muted-foreground">
                  dari {formatCurrency(targetAmount)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-card-foreground flex items-center">
                  <Users size={14} className="mr-1" />
                  {backers}
                </div>
                <div className="text-xs text-muted-foreground">pendukung</div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="flex flex-col space-y-2 pt-2 border-t border-border">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-2" />
              <span>{deadline}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-2" />
              <span>{location}</span>
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