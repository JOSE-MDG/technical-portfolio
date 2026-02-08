import { useLanguage } from '@/contexts/LanguageContext';
import { socialLinks, profile } from '@/lib/profile';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Links() {
  const { t } = useLanguage();

  return (
    <section id="links" className="py-16 md:py-24 border-t border-border">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-mono text-accent uppercase tracking-wider">
            {t('links.title')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 opacity-0-start animate-fade-up">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] || ExternalLink;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors shrink-0">
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium group-hover:text-accent transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.url.replace('https://', '').replace('mailto:', '')}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}