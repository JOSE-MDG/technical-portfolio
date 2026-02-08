import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/lib/profile';
import { MapPin } from 'lucide-react';

export function About() {
  const { language, t } = useLanguage();
  const bio = profile.bio[language];

  return (
    <section id="about" className="py-16 md:py-24 border-t border-border">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-mono text-accent uppercase tracking-wider">
            {t('about.title')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Quick info */}
          <div className="opacity-0-start animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
              {profile.name}
            </h2>
            <p className="text-lg text-accent mb-4">
              {profile.role[language]}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{profile.location}</span>
            </div>
            <p className="text-sm font-mono text-muted-foreground italic border-l-2 border-accent/30 pl-4">
              "{profile.tagline[language]}"
            </p>
          </div>

          {/* Right: Bio */}
          <div className="lg:col-span-2 opacity-0-start animate-fade-up delay-200">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {bio.split('\n\n').map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="text-muted-foreground leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
