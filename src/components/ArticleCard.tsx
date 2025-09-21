import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  id: string; // Tambahkan id untuk link
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  author,
  publishDate,
  category,
  imageUrl,
  readTime,
}: ArticleCardProps) => {
  return (
    <Link to={`/berita/${id}`}>
      <motion.article
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-card border border-border rounded-xl overflow-hidden glass-card group cursor-pointer h-full flex flex-col"
      >
        {/* Article Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-accent-purple text-accent-purple-foreground">
              {category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-card/80 backdrop-blur-sm">
              {readTime}
            </Badge>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {excerpt}
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <User size={14} className="mr-2" />
              <span className="line-clamp-1">{author}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-2" />
              <span>{publishDate}</span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default ArticleCard;