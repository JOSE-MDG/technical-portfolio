import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Project, deleteProject } from '@/lib/projects';
import { StatusBadge } from './StatusBadge';
import { ArrowRight, Github, ExternalLink, FileText, Package, Pencil, Trash2 } from 'lucide-react';

interface FeaturedProjectProps {
  project: Project;
}

const linkIcons = {
  github: Github,
  demo: ExternalLink,
  docs: FileText,
  pypi: Package,
  other: ExternalLink,
};

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const { language, t } = useLanguage();
  const { isAdmin } = useAuth();
  const content = project.content[language];

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar "${content.title}"?`)) {
      deleteProject(project.id);
      window.location.reload();
    }
  };

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-mono text-accent uppercase tracking-wider">
            {t('projects.featured')}
          </span>
          <div className="h-px flex-1 bg-border" />
          
          {/* Admin buttons */}
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => alert('Edit functionality coming soon')}
                className="p-2 rounded-md border border-border hover:bg-secondary hover:border-accent transition-colors"
                title="Edit project"
              >
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-md border border-border hover:bg-destructive hover:border-destructive transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive-foreground" />
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Main content */}
          <div className="opacity-0-start animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={project.status} />
              <time className="text-xs font-mono text-muted-foreground">
                {project.createdAt}
              </time>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
              {content.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {content.summary}
            </p>

            {/* Tech stack */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                {t('projects.techStack')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {content.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-mono bg-secondary rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mb-8">
              {content.links.map((link) => {
                const Icon = linkIcons[link.type];
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-md hover:border-accent hover:text-accent transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </a>
                );
              })}
            </div>

            <Link
              to={`/project/${project.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              {t('projects.viewProject')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Decisions & Learnings */}
          <div className="space-y-8 opacity-0-start animate-fade-up delay-200">
            {/* Technical Decisions */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                {t('projects.decisions')}
              </h4>
              <div className="space-y-4">
                {content.decisions.slice(0, 3).map((decision, idx) => (
                  <div key={idx}>
                    <h5 className="font-medium mb-1">{decision.title}</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {decision.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learnings */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                {t('projects.learnings')}
              </h4>
              <ul className="space-y-3">
                {content.learnings.slice(0, 3).map((learning, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-accent/30">
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}