import { useLanguage } from '@/contexts/LanguageContext';
import { skillCategories } from '@/lib/profile';
import { Brain, Code, Server, Wrench, Cpu } from 'lucide-react';

const categoryIcons = {
  ml: Brain,
  programming: Code,
  systems: Server,
  tools: Wrench,
  engineering: Cpu,
};

export function Skills() {
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-border">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-mono text-accent uppercase tracking-wider">
            {t('skills.title')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = categoryIcons[category.id];
            return (
              <div
                key={category.id}
                className={`p-6 rounded-lg border border-border bg-card opacity-0-start animate-fade-up delay-${idx * 100}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-accent/10">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading font-medium">
                    {category.label[language]}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-mono bg-secondary text-secondary-foreground rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
