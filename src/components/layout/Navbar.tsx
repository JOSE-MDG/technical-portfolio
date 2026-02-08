import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    // If we're not on home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/#about', label: t('nav.about'), sectionId: 'about' },
    { path: '/#skills', label: t('nav.skills'), sectionId: 'skills' },
    { path: '/projects', label: t('nav.projects') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="section-container flex items-center justify-between h-16">
        <Link 
          to="/" 
          className="font-heading text-xl font-semibold tracking-tight hover:text-accent transition-colors"
        >
          Portfolio
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.path}>
                {item.sectionId ? (
                  <a
                    href={item.path}
                    onClick={(e) => handleSectionClick(e, item.sectionId)}
                    className={cn(
                      "text-sm font-medium transition-colors link-underline cursor-pointer",
                      location.pathname === '/' && location.hash === `#${item.sectionId}`
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors link-underline",
                      location.pathname === item.path
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
}