export type ProjectStatus = 'active' | 'wip' | 'archived';

export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'demo' | 'docs' | 'pypi' | 'other';
}

export interface Project {
  id: string;
  slug: string;
  featured: boolean;
  status: ProjectStatus;
  createdAt: string;
  content: {
    en: ProjectContent;
    es: ProjectContent;
  };
}

export interface ProjectContent {
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  decisions: TechnicalDecision[];
  learnings: string[];
  links: ProjectLink[];
}

export interface TechnicalDecision {
  title: string;
  rationale: string;
}

// Default projects (initial data)
const defaultProjects: Project[] = [
  {
    id: '1',
    slug: 'novann',
    featured: true,
    status: 'active',
    createdAt: 'Oct 2025',
    content: {
      en: {
        title: 'NovaNN',
        summary: 'A Deep Learning framework built from scratch in Python, designed to understand how modern frameworks like PyTorch work internally.',
        description: `**NovaNN** is a Deep Learning framework developed from scratch in Python, designed to build, train, and evaluate neural networks in a modular, clear, and extensible way.

The main goal of NovaNN is not to compete with industrial frameworks, but to **understand, implement, and demonstrate** how modern frameworks like PyTorch or TensorFlow work internally, with special emphasis on PyTorch's architecture, which served as the main inspiration.

## Project Philosophy

NovaNN was born with a clear idea:

> *Don't use the magic of existing frameworks—build it*

Every component of the framework is designed to be **readable, traceable, and testable**, prioritizing deep understanding of:

- How computational graphs are built
- How gradients flow during backward pass
- How scalable ML frameworks are structured
- How clean and extensible APIs are designed

## Architecture Overview

NovaNN allows defining complete neural models, managing training, and performing automatic backpropagation through a **dynamic autograd engine**, all built explicitly without depending on external compute engines.

### Implemented Components

- **Layers**: Linear, Conv, MaxPool, AvgPoold, Dropout, BatchNorm, LayerNorm
- **Optimizers**: SGD, Adam, AdamW, RMSprop with momentum support
- **Schedulers**: StepLR, CosineAnnealing, OneCycleLR
- **Loss Functions**: MSE, CrossEntropy, BCE with gradient computation
- **Serialization**: Complete save/load system for checkpoints

## Technical Highlights

- **Version**: 4.0.3
- **Test Coverage**: ~87%
- **Commits**: +700 organized with semantic versioning
- **Operations**: +80 mathematical operations implemented with dynamic binding system`,
        techStack: ['Python 3.14', 'NumPy', 'Pandas', 'Pyarrow', 'Pyyaml', 'Scikit-learn', 'Matplotlib', 'PyTest', 'Poetry', 'Git'],
        decisions: [
          {
            title: 'DFS Computational Graphs (PyTorch-style)',
            rationale: 'Implemented a dynamic autograd engine with DFS-based computational graphs, allowing automatic gradient tracking and backpropagation without external engines.'
          },
          {
            title: 'Dynamic Binding System',
            rationale: 'Operations registered via decorators + YAML file, with dynamic binding injecting +60 operations into the Tensor class at module initialization.'
          },
          {
            title: 'Pure NumPy Backend',
            rationale: 'Prioritized understanding over performance. NumPy allows step-by-step debugging and explicit control over all mathematical operations.'
          },
          {
            title: 'PyTorch-Compatible API',
            rationale: 'Designed the API to be familiar to PyTorch users, reducing the learning curve and enabling knowledge transfer between frameworks.'
          }
        ],
        learnings: [
          'Gradient clipping is essential for deep networks—I learned this the hard way after exploding gradients crashed my experiments.',
          'Batch normalization dramatically improves training stability. Understanding why requires tracing gradients through the layer.',
          'Weight initialization matters more than expected. Xavier/He initialization prevents saturation in deep networks.',
          'Graph cleanup during backward pass reduced computational cost significantly in complex architectures.',
          'Building from scratch exposed every "magic" abstraction—there is no magic, just well-organized math.'
        ],
        links: [
          { label: 'GitHub', url: 'https://github.com/JOSE-MDG/NovaNN', type: 'github' },
          { label: 'PyPI', url: 'https://pypi.org/project/novann/', type: 'pypi' },
          { label: 'Documentation', url: 'https://github.com/JOSE-MDG/NovaNN#readme', type: 'docs' }
        ]
      },
      es: {
        title: 'NovaNN',
        summary: 'Un framework de Deep Learning construido desde cero en Python, diseñado para entender cómo funcionan internamente frameworks modernos como PyTorch.',
        description: `**NovaNN** es un framework de Deep Learning desarrollado desde cero en Python, diseñado para construir, entrenar y evaluar redes neuronales de forma modular, clara y extensible.

El objetivo principal de NovaNN no es competir con frameworks industriales, sino **entender, implementar y demostrar** cómo funcionan internamente frameworks modernos como PyTorch o TensorFlow, poniendo especial énfasis en la arquitectura de PyTorch, que sirvió como inspiración principal.

## Filosofía del Proyecto

NovaNN nace con una idea clara:

> *No usar la magia de los frameworks existentes, sino construirla*

Cada componente del framework está diseñado para ser **legible, trazable y testeable**, priorizando la comprensión profunda de:

- Cómo se construyen los grafos computacionales
- Cómo fluye el gradiente durante el backward
- Cómo se estructuran frameworks escalables de ML
- Cómo se diseñan APIs limpias y extensibles

## Visión General de la Arquitectura

NovaNN permite definir modelos neuronales completos, gestionar el entrenamiento y realizar backpropagation automático mediante un **motor de autograd dinámico**, todo construido explícitamente y sin depender de motores de cómputo externos.

### Componentes Implementados

- **Capas**: Linear, Conv, MaxPool, AvgPoold, Dropout, BatchNorm, LayerNorm
- **Optimizadores**: SGD, Adam, AdamW, RMSprop con soporte de momentum
- **Schedulers**: StepLR, CosineAnnealing, OneCycleLR
- **Funciones de Pérdida**: MSE, CrossEntropy, BCE con cálculo de gradientes
- **Serialización**: Sistema completo de save/load para checkpoints

## Aspectos Técnicos Destacados

- **Versión**: 4.0.3
- **Cobertura de Tests**: ~87%
- **Commits**: +700 organizados con versionado semántico
- **Operaciones**: +80 operaciones matemáticas implementadas con binding dinámico`,
        techStack: ['Python 3.14', 'NumPy', 'Pandas', 'Pyarrow', 'Pyyaml', 'Scikit-learn', 'Matplotlib', 'PyTest', 'Poetry', 'Git'],
        decisions: [
          {
            title: 'Grafos Computacionales DFS (estilo PyTorch)',
            rationale: 'Implementé un motor de autograd dinámico con grafos computacionales basados en DFS, permitiendo seguimiento automático de gradientes y backpropagation sin motores externos.'
          },
          {
            title: 'Sistema de Binding Dinámico',
            rationale: 'Operaciones registradas mediante decoradores + archivo YAML, con binding dinámico que inyecta +60 operaciones en la clase Tensor al inicializar el módulo.'
          },
          {
            title: 'Backend NumPy Puro',
            rationale: 'Prioricé la comprensión sobre el rendimiento. NumPy permite depuración paso a paso y control explícito sobre todas las operaciones matemáticas.'
          },
          {
            title: 'API Compatible con PyTorch',
            rationale: 'Diseñé la API para ser familiar a usuarios de PyTorch, reduciendo la curva de aprendizaje y permitiendo transferencia de conocimiento entre frameworks.'
          }
        ],
        learnings: [
          'El gradient clipping es esencial para redes profundas—aprendí esto por las malas cuando gradientes explosivos crashearon mis experimentos.',
          'La normalización por lotes mejora dramáticamente la estabilidad del entrenamiento. Entender por qué requiere trazar gradientes a través de la capa.',
          'La inicialización de pesos importa más de lo esperado. La inicialización Xavier/He previene la saturación en redes profundas.',
          'La limpieza de grafos durante el backward redujo significativamente el coste computacional en arquitecturas complejas.',
          'Construir desde cero expuso cada abstracción "mágica"—no hay magia, solo matemáticas bien organizadas.'
        ],
        links: [
          { label: 'GitHub', url: 'https://github.com/JOSE-MDG/NovaNN', type: 'github' },
          { label: 'PyPI', url: 'https://pypi.org/project/novann/', type: 'pypi' },
          { label: 'Documentación', url: 'https://github.com/JOSE-MDG/NovaNN#readme', type: 'docs' }
        ]
      }
    }
  }
];

const STORAGE_KEY = 'portfolio-projects';

function loadProjects(): Project[] {
  if (typeof window === 'undefined') return [...defaultProjects];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [...defaultProjects]; 
  }
  
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...defaultProjects];
  } catch (e) {
    console.error('Error parsing projects from localStorage:', e);
    return [...defaultProjects];
  }
}

// Save projects to localStorage
function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event('projectsUpdated'));
}

if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
  saveProjects(defaultProjects);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = loadProjects();
  return projects.find(p => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  const projects = loadProjects();
  return projects.find(p => p.featured);
}

export function getAllProjects(): Project[] {
  return loadProjects();
}

export function addProject(project: Project): void {
  const projects = loadProjects();
  projects.push(project);
  saveProjects(projects);
}

export function updateProject(id: string, updatedProject: Project): void {
  const projects = loadProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = updatedProject;
    saveProjects(projects);
  }
}

export function deleteProject(id: string): void {
  const projects = loadProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects.splice(index, 1);
    saveProjects(projects);
  }
}