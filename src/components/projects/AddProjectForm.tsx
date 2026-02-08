import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Project, ProjectStatus, ProjectLink, TechnicalDecision, addProject } from '@/lib/projects';
import { Plus, Trash2 } from 'lucide-react';

interface AddProjectFormProps {
  onClose: () => void;
}

export function AddProjectForm({ onClose }: AddProjectFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    techStack: '',
    status: 'wip' as ProjectStatus,
    featured: false,
  });

  // Dynamic arrays for links, decisions, and learnings
  const [links, setLinks] = useState<ProjectLink[]>([]);
  const [decisions, setDecisions] = useState<TechnicalDecision[]>([]);
  const [learnings, setLearnings] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: Project = {
      id: Date.now().toString(),
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      featured: formData.featured,
      status: formData.status,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      content: {
        en: {
          title: formData.title,
          summary: formData.summary,
          description: formData.description,
          techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
          decisions: decisions,
          learnings: learnings,
          links: links,
        },
        es: {
          title: formData.title,
          summary: formData.summary,
          description: formData.description,
          techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
          decisions: decisions,
          learnings: learnings,
          links: links,
        },
      },
    };

    addProject(newProject);
    onClose();
  };

  // Add new link
  const addLink = () => {
    setLinks([...links, { label: '', url: '', type: 'other' }]);
  };

  // Update link
  const updateLink = (index: number, field: keyof ProjectLink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  // Remove link
  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  // Add new decision
  const addDecision = () => {
    setDecisions([...decisions, { title: '', rationale: '' }]);
  };

  // Update decision
  const updateDecision = (index: number, field: keyof TechnicalDecision, value: string) => {
    const newDecisions = [...decisions];
    newDecisions[index] = { ...newDecisions[index], [field]: value };
    setDecisions(newDecisions);
  };

  // Remove decision
  const removeDecision = (index: number) => {
    setDecisions(decisions.filter((_, i) => i !== index));
  };

  // Add new learning
  const addLearning = () => {
    setLearnings([...learnings, '']);
  };

  // Update learning
  const updateLearning = (index: number, value: string) => {
    const newLearnings = [...learnings];
    newLearnings[index] = value;
    setLearnings(newLearnings);
  };

  // Remove learning
  const removeLearning = (index: number) => {
    setLearnings(learnings.filter((_, i) => i !== index));
  };

  return (
    <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('form.title')} *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="My Awesome Project"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('form.slug')}
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-mono text-sm"
            placeholder="my-awesome-project"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Leave empty to auto-generate from title
          </p>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('form.summary')} *
          </label>
          <textarea
            required
            rows={3}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
            placeholder="A brief description of what this project does..."
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('form.description')}
          </label>
          <textarea
            rows={8}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-y font-mono text-sm"
            placeholder="Detailed description with **markdown** support..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supports Markdown formatting
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('form.techStack')}
          </label>
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="Python, NumPy, PyTest, Git"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Separate technologies with commas
          </p>
        </div>

        {/* Links Section */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium">
              Links (GitHub, Demo, etc.)
            </label>
            <button
              type="button"
              onClick={addLink}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-dashed border-border rounded-md hover:border-accent hover:text-accent transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Link
            </button>
          </div>
          
          {links.map((link, index) => (
            <div key={index} className="mb-3 p-3 border border-border rounded-md bg-secondary/20">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateLink(index, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:border-accent focus:outline-none"
                    placeholder="Label (e.g., GitHub)"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:border-accent focus:outline-none"
                    placeholder="https://..."
                  />
                  <select
                    value={link.type}
                    onChange={(e) => updateLink(index, 'type', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:border-accent focus:outline-none"
                  >
                    <option value="github">GitHub</option>
                    <option value="demo">Demo</option>
                    <option value="docs">Docs</option>
                    <option value="pypi">PyPI</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Decisions Section */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium">
              Technical Decisions
            </label>
            <button
              type="button"
              onClick={addDecision}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-dashed border-border rounded-md hover:border-accent hover:text-accent transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Decision
            </button>
          </div>
          
          {decisions.map((decision, index) => (
            <div key={index} className="mb-3 p-3 border border-border rounded-md bg-secondary/20">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={decision.title}
                    onChange={(e) => updateDecision(index, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-background focus:border-accent focus:outline-none"
                    placeholder="Decision title..."
                  />
                  <textarea
                    rows={2}
                    value={decision.rationale}
                    onChange={(e) => updateDecision(index, 'rationale', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:border-accent focus:outline-none resize-none"
                    placeholder="Rationale / reasoning..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDecision(index)}
                  className="p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Learnings Section */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium">
              Key Learnings
            </label>
            <button
              type="button"
              onClick={addLearning}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-dashed border-border rounded-md hover:border-accent hover:text-accent transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Learning
            </button>
          </div>
          
          {learnings.map((learning, index) => (
            <div key={index} className="mb-3 p-3 border border-border rounded-md bg-secondary/20">
              <div className="flex items-start gap-2">
                <textarea
                  rows={2}
                  value={learning}
                  onChange={(e) => updateLearning(index, e.target.value)}
                  className="flex-1 px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:border-accent focus:outline-none resize-none"
                  placeholder="What did you learn from this project?"
                />
                <button
                  type="button"
                  onClick={() => removeLearning(index)}
                  className="p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="border-t border-border pt-6">
          <label className="block text-sm font-medium mb-2">
            {t('form.status')}
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
            className="w-full px-4 py-2 rounded-md border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          >
            <option value="active">{t('status.active')}</option>
            <option value="wip">{t('status.wip')}</option>
            <option value="archived">{t('status.archived')}</option>
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3 p-4 rounded-md border border-border bg-secondary/30">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 rounded border-border text-accent focus:ring-accent cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-medium cursor-pointer select-none">
            {t('form.featured')}
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors"
          >
            {t('form.save')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-border rounded-md font-medium hover:bg-secondary transition-colors"
          >
            {t('form.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}