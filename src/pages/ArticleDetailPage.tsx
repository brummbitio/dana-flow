import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articlesData } from '../data/articles';
import { Badge } from '../components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import AnimateOnScroll from '../components/animations/AnimateOnScroll';
import { Button } from '@/components/ui/button';

const ArticleDetailPage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const article = articlesData.find((a) => a.id === articleId);
  const otherArticles = articlesData.filter((a) => a.id !== articleId).slice(0, 5);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-4 text-xl text-muted-foreground">Artikel tidak ditemukan.</p>
          <Button onClick={() => navigate('/berita')} className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Halaman Berita
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <AnimateOnScroll>
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-8">
            <Link
              to="/berita"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke semua berita
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Main Content */}
            <main className="lg:col-span-8">
              <article>
                <header className="mb-8">
                  <Badge className="mb-4 bg-accent-purple text-accent-purple-foreground">{article.category}</Badge>
                  <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">{article.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{article.publishDate}</span>
                    </div>
                  </div>
                </header>

                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8"
                />

                <div
                  className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:text-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </article>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-6">Berita Lainnya</h3>
                  <div className="space-y-6">
                    {otherArticles.map((other) => (
                      <Link to={`/berita/${other.id}`} key={other.id} className="group block">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={other.imageUrl} 
                            alt={other.title} 
                            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                          />
                          <div>
                            <Badge variant="secondary" className="mb-2">{other.category}</Badge>
                            <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                              {other.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
};

export default ArticleDetailPage;