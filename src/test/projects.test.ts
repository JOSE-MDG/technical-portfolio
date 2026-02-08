import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getAllProjects,
  getProjectBySlug,
  getFeaturedProject,
  addProject,
  deleteProject,
  Project
} from '../lib/projects';

describe('Projects - Sistema de Persistencia', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should load NovaNN as default project', () => {
    const projects = getAllProjects();
    
    expect(projects).toHaveLength(1);
    expect(projects[0].slug).toBe('novann');
    expect(projects[0].content.en.title).toBe('NovaNN');
  });

  it('should persist projects in localStorage', () => {
    const newProject: Project = {
      id: '2',
      slug: 'test-project',
      featured: false,
      status: 'wip',
      createdAt: 'Feb 2024',
      content: {
        en: {
          title: 'Test Project',
          summary: 'A test project',
          description: 'Test description',
          techStack: ['React', 'TypeScript'],
          decisions: [],
          learnings: [],
          links: []
        },
        es: {
          title: 'Proyecto de Prueba',
          summary: 'Un proyecto de prueba',
          description: 'Descripción de prueba',
          techStack: ['React', 'TypeScript'],
          decisions: [],
          learnings: [],
          links: []
        }
      }
    };

    addProject(newProject);
    const projects = getAllProjects();

    expect(projects).toHaveLength(2);
    expect(projects[1].id).toBe('2');
    expect(projects[1].slug).toBe('test-project');
  });

  it('should find project by slug', () => {
    const project = getProjectBySlug('novann');
    
    expect(project).toBeDefined();
    expect(project?.slug).toBe('novann');
    expect(project?.content.en.title).toBe('NovaNN');
  });

  it('should return undefined for non-existent slug', () => {
    const project = getProjectBySlug('non-existent');
    
    expect(project).toBeUndefined();
  });

  it('should get featured project', () => {
    const featured = getFeaturedProject();
    
    expect(featured).toBeDefined();
    expect(featured?.featured).toBe(true);
    expect(featured?.slug).toBe('novann');
  });

  it('should delete projects correctly', () => {
    const newProject: Project = {
      id: 'test-delete-id',
      slug: 'test-delete',
      featured: false,
      status: 'active',
      createdAt: 'Feb 2024',
      content: {
        en: {
          title: 'To Delete',
          summary: 'This will be deleted',
          description: 'Test',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        },
        es: {
          title: 'Para Eliminar',
          summary: 'Esto será eliminado',
          description: 'Prueba',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        }
      }
    };

    addProject(newProject);
    expect(getAllProjects()).toHaveLength(2);

    deleteProject('test-delete-id');
    
    const projects = getAllProjects();
    expect(projects).toHaveLength(1);
    expect(projects.find(p => p.id === 'test-delete-id')).toBeUndefined();
  });
});