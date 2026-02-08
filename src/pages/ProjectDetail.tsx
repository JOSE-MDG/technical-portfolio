import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectBySlug } from '@/lib/projects';
import { StatusBadge } from '@/components/projects/StatusBadge';
import { ArrowLeft, Github, ExternalLink, FileText, Package} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const linkIcons = {
  github: Github,
  demo: ExternalLink,
  docs: FileText,
  pypi: Package,
  other: ExternalLink,
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const project = getProjectBySlug(slug || '');

  if (!project) {
    return (
      <Layout>
        <div className="section-container py-24 text-center">
          <h1 className="text-2xl font-heading font-semibold mb-4">Project not found</h1>
          <Link to="/projects" className="text-accent hover:underline">
            ← Back to projects
          </Link>
        </div>
      </Layout>
    );
  }

  const content = project.content[language];

  return (
    <Layout>
      <article className="py-16 md:py-24">
        <div className="section-container">
          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('projects.all')}
          </Link>

          {/* Header */}
          <header className="mb-12 opacity-0-start animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={project.status} />
              <time className="text-sm font-mono text-muted-foreground">
                {project.createdAt}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
              {content.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {content.summary}
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 opacity-0-start animate-fade-up delay-100">
              <div className="prose prose-lg max-w-none dark:prose-invert
                prose-headings:font-heading prose-headings:font-semibold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-strong:text-foreground prose-strong:font-semibold
                prose-em:text-muted-foreground prose-em:italic
                prose-blockquote:border-l-4 prose-blockquote:border-accent/30 
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                prose-blockquote:not-italic prose-blockquote:font-normal
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-muted-foreground prose-li:marker:text-accent
                prose-code:text-accent prose-code:font-mono prose-code:text-sm">
                <ReactMarkdown>
                  {content.description}
                </ReactMarkdown>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 opacity-0-start animate-fade-up delay-200">
              {/* Tech Stack */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  {t('projects.techStack')}
                </h3>
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
              {content.links.length > 0 && (
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    {t('projects.links')}
                  </h3>
                  <div className="space-y-2">
                    {content.links.map((link) => {
                      const Icon = linkIcons[link.type];
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors"
                        >
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Technical Decisions */}
              {content.decisions.length > 0 && (
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    {t('projects.decisions')}
                  </h3>
                  <div className="space-y-4">
                    {content.decisions.map((decision, idx) => (
                      <div key={idx}>
                        <h4 className="font-medium text-sm mb-1">{decision.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {decision.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learnings */}
              {content.learnings.length > 0 && (
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    {t('projects.learnings')}
                  </h3>
                  <ul className="space-y-3">
                    {content.learnings.map((learning, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/30">
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetail;