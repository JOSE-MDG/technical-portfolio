import { useLanguage } from '@/contexts/LanguageContext';
import { profile, socialLinks } from '@/lib/profile';
import { Github, Linkedin, Mail } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Branding */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-1">
              {profile.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {profile.role[language]}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('footer.built')}
            </p>
          </div>

          {/* Right: Social links */}
          <div className="flex flex-wrap gap-3 md:justify-end">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md hover:border-accent hover:text-accent transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
