import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Project, deleteProject } from '@/lib/projects';
import { StatusBadge } from './StatusBadge';
import { ArrowRight, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { language, t } = useLanguage();
  const { isAdmin } = useAuth();
  const content = project.content[language];

  const handleDelete = () => {
    if (window.confirm(`¿Are you sure you want to delete "${content.title}"?`)) {
      deleteProject(project.id);
    }
  };

  return (
    <article 
      className={cn(
        "group relative p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all duration-300",
        className
      )}
    >
      {/* Admin buttons */}
      {isAdmin && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              alert('Edit functionality coming soon');
            }}
            className="p-2 rounded-md bg-card border border-border hover:bg-secondary hover:border-accent transition-colors"
            title="Edit project"
          >
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="p-2 rounded-md bg-card border border-border hover:bg-destructive hover:border-destructive transition-colors"
            title="Delete project"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive-foreground" />
          </button>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {project.featured && (
            <span className="text-xs font-mono text-accent">
              {t('projects.featured')}
            </span>
          )}
          <StatusBadge status={project.status} />
        </div>
        <time className="text-xs font-mono text-muted-foreground">
          {project.createdAt}
        </time>
      </div>

      <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
        {content.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {content.summary}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {content.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-mono bg-secondary rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        to={`/project/${project.slug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
      >
        {t('projects.viewProject')}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
}