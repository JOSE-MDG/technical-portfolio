import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectDetail from '../pages/ProjectDetail';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ReactNode } from 'react';
import * as projectsLib from '../lib/projects';

vi.mock('../lib/projects', async () => {
  const actual = await vi.importActual('../lib/projects');
  return {
    ...actual,
    getProjectBySlug: vi.fn()
  };
});

const renderWithProviders = (ui: ReactNode) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('ProjectDetail - Empty Sections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Shouldn\'t show empty sections', () => {
    const mockProject = {
      id: '1',
      slug: 'test-project',
      featured: false,
      status: 'active' as const,
      createdAt: 'Jan 2024',
      content: {
        en: {
          title: 'Test Project',
          summary: 'A test project',
          description: 'Test description',
          techStack: ['React'],
          decisions: [],
          learnings: [],
          links: []
        },
        es: {
          title: 'Proyecto de Prueba',
          summary: 'Un proyecto de prueba',
          description: 'Descripción de prueba',
          techStack: ['React'],
          decisions: [],
          learnings: [],
          links: []
        }
      }
    };

    vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(mockProject);

    renderWithProviders(<ProjectDetail />);

    expect(screen.queryByText(/Technical Decisions/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Key Learnings/i)).not.toBeInTheDocument();
  });

  it('Shouldn\'t show empty Technical Decisions section', () => {
    const mockProject = {
      id: '1',
      slug: 'test',
      featured: false,
      status: 'active' as const,
      createdAt: 'Jan 2024',
      content: {
        en: {
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        },
        es: {
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        }
      }
    };

    vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(mockProject);
    renderWithProviders(<ProjectDetail />);
    
    expect(screen.queryByText(/Technical Decisions/i)).not.toBeInTheDocument();
  });

  it('Shouldn\'t show empty Key Learnings section', () => {
    const mockProject = {
      id: '1',
      slug: 'test',
      featured: false,
      status: 'active' as const,
      createdAt: 'Jan 2024',
      content: {
        en: {
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        },
        es: {
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        }
      }
    };

    vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(mockProject);
    renderWithProviders(<ProjectDetail />);
    
    expect(screen.queryByText(/Key Learnings/i)).not.toBeInTheDocument();
  });

  it('Should always show Tech Stack (even if empty)', () => {
    const mockProject = {
      id: '1',
      slug: 'test',
      featured: false,
      status: 'active' as const,
      createdAt: 'Jan 2024',
      content: {
        en: {
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        },
        es: {
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          decisions: [],
          learnings: [],
          links: []
        }
      }
    };

    vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(mockProject);
    renderWithProviders(<ProjectDetail />);
    
    expect(screen.getByText(/Stack Técnico|Tech Stack/i)).toBeInTheDocument();
  });
});