import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { AddProjectButton } from '@/components/projects/AddProjectButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllProjects } from '@/lib/projects';

const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState(getAllProjects());

  // Listen to storage events to update when projects change
  useEffect(() => {
    const handleStorageChange = () => {
      setProjects(getAllProjects());
    };

    // Custom event for same-window updates
    window.addEventListener('projectsUpdated', handleStorageChange);
    // Storage event for cross-window updates
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('projectsUpdated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-4 opacity-0-start animate-fade-up">
                {t('projects.all')}
              </h1>
              <p className="text-muted-foreground text-lg opacity-0-start animate-fade-up delay-100">
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div className="opacity-0-start animate-fade-up delay-200">
              <AddProjectButton />
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className={`opacity-0-start animate-fade-up delay-${(idx + 2) * 100}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">{t('projects.empty')}</p>
              <AddProjectButton />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;