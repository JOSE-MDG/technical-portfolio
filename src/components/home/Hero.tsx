import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/lib/profile';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

export function Hero() {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="section-container">
        <div className="max-w-3xl">
          {/* Name and role */}
          <div className="mb-6 opacity-0-start animate-fade-up">
            <p className="text-sm font-mono text-accent mb-2 tracking-wider">
              {t('hero.greeting')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold tracking-tight mb-4">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-accent font-medium">
              {profile.role[language]}
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 opacity-0-start animate-fade-up delay-100">
            {profile.tagline[language]}
          </p>

          {/* Subtitle */}
          <p className="text-muted-foreground leading-relaxed mb-8 opacity-0-start animate-fade-up delay-200">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 opacity-0-start animate-fade-up delay-300">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md border border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md border border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
