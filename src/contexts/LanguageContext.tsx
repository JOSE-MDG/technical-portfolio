import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    
    // Hero
    'hero.greeting': 'Technical Portfolio',
    'hero.subtitle': 'Real projects, technical decisions, and lessons learned.',
    'hero.cta': 'View Projects',
    
    // About
    'about.title': 'About Me',
    
    // Skills
    'skills.title': 'Skills',
    
    // Links
    'links.title': 'Connect',
    
    // Projects
    'projects.title': 'Projects',
    'projects.featured': 'Featured Project',
    'projects.all': 'All Projects',
    'projects.viewProject': 'View Full Details',
    'projects.techStack': 'Tech Stack',
    'projects.status': 'Status',
    'projects.decisions': 'Technical Decisions',
    'projects.learnings': 'Key Learnings',
    'projects.links': 'Links',
    'projects.addNew': 'Add New Project',
    'projects.empty': 'No projects yet',
    
    // Status
    'status.active': 'Active',
    'status.wip': 'In Progress',
    'status.archived': 'Archived',
    
    // Profile
    'profile.role': 'Machine Learning Enthusiast',
    
    // Footer
    'footer.built': 'Built with intention and curiosity.',
    'footer.source': 'Source',
    'footer.rights': 'All rights reserved.',
    
    // Add Project Form
    'form.title': 'Project Title',
    'form.slug': 'URL Slug',
    'form.summary': 'Summary',
    'form.description': 'Description',
    'form.techStack': 'Tech Stack (comma separated)',
    'form.status': 'Status',
    'form.featured': 'Featured Project',
    'form.save': 'Save Project',
    'form.cancel': 'Cancel',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    
    'hero.greeting': 'Portafolio Técnico',
    'hero.subtitle': 'Proyectos reales, decisiones técnicas y lecciones aprendidas.',
    'hero.cta': 'Ver Proyectos',
    
    'about.title': 'Sobre Mí',
    
    'skills.title': 'Habilidades',
    
    'links.title': 'Conecta',
    
    'projects.title': 'Proyectos',
    'projects.featured': 'Proyecto Destacado',
    'projects.all': 'Todos los Proyectos',
    'projects.viewProject': 'Ver Detalles Completos',
    'projects.techStack': 'Stack Técnico',
    'projects.status': 'Estado',
    'projects.decisions': 'Decisiones Técnicas',
    'projects.learnings': 'Aprendizajes Clave',
    'projects.links': 'Enlaces',
    'projects.addNew': 'Añadir Nuevo Proyecto',
    'projects.empty': 'Sin proyectos todavía',
    
    'status.active': 'Activo',
    'status.wip': 'En Progreso',
    'status.archived': 'Archivado',
    
    'profile.role': 'Entusiasta de Machine Learning',
    
    'footer.built': 'Construido con intención y curiosidad.',
    'footer.source': 'Código',
    'footer.rights': 'Todos los derechos reservados.',
    
    'form.title': 'Título del Proyecto',
    'form.slug': 'Slug URL',
    'form.summary': 'Resumen',
    'form.description': 'Descripción',
    'form.techStack': 'Stack Técnico (separado por comas)',
    'form.status': 'Estado',
    'form.featured': 'Proyecto Destacado',
    'form.save': 'Guardar Proyecto',
    'form.cancel': 'Cancelar',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('portfolio-language');
    return (stored as Language) || 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
