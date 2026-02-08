export interface ProfileData {
  name: string;
  role: {
    en: string;
    es: string;
  };
  tagline: {
    en: string;
    es: string;
  };
  location: string;
  email: string;
  github: string;
  linkedin: string;
  bio: {
    en: string;
    es: string;
  };
}

export interface Skill {
  name: string;
  category: 'ml' | 'programming' | 'systems' | 'tools' | 'engineering';
}

export interface SkillCategory {
  id: 'ml' | 'programming' | 'systems' | 'tools' | 'engineering';
  label: {
    en: string;
    es: string;
  };
  skills: string[];
}

export const profile: ProfileData = {
  name: 'Juan José Medina',
  role: {
    en: 'Machine Learning Enthusiast (Fundamentals & Systems)',
    es: 'Entusiasta de Machine Learning (Fundamentos y Sistemas)',
  },
  tagline: {
    en: 'Build system to understand them. Understand them to engineer better ones.',
    es: 'Construye sistemas para entenderlos. Entiéndelos para diseñar mejores.',
  },
  location: 'Sevilla, España',
  email: 'josepemlengineer@gmail.com',
  github: 'https://github.com/JOSE-MDG',
  linkedin: 'https://www.linkedin.com/in/juan-jos%C3%A9-medina-671a4a3a4/',
  bio: {
    en:`I'm a first-year Systems and Networks student with a strong technical profile that bridges IT infrastructure and Machine Learning engineering. I focus on understanding systems from the inside out—prioritizing how things work internally over simply using high-level tools.

    I'm the creator of **NovaNN**, a Deep Learning framework developed entirely from scratch to study and implement core concepts such as automatic differentiation, computational graphs, numerical stability, modular architecture, and training workflows inspired by modern ML frameworks.

    Alongside software engineering, I have hands-on experience in hardware assembly, operating system installation, network maintenance, and technical support. I'm seeking opportunities where I can contribute to both system-level operations and the development of internal tools, automation, or data-driven solutions.`,

    es: `Soy estudiante de primer año de Sistemas Microinformáticos y Redes con un perfil técnico sólido que conecta infraestructura IT con ingeniería de Machine Learning. Mi enfoque está en comprender los sistemas desde dentro, priorizando cómo funcionan internamente más allá del uso de herramientas de alto nivel.

    Soy el creador de **NovaNN**, un framework de Deep Learning desarrollado completamente desde cero para estudiar e implementar conceptos clave como autograd, grafos computacionales, estabilidad numérica, arquitectura modular y flujos de entrenamiento inspirados en frameworks modernos.

    Además del desarrollo de software, cuento con experiencia práctica en montaje de hardware, instalación de sistemas operativos, mantenimiento de redes y soporte técnico. Busco oportunidades donde pueda aportar tanto a nivel de sistemas como en el desarrollo de herramientas internas, automatización y soluciones basadas en datos.`,
  },
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'ml',
    label: {
      en: 'Machine Learning & Data Science',
      es: 'Machine Learning y Data Science',
    },
    skills: [
      'Deep Learning',
      'Neural Network Architectures',
      'Classical Machine Learning',
      'Optimization Algorithms',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'Pytorch',
      'Data Preprocessing',
      'Model Evaluation',
    ],
  },
  {
    id: 'programming',
    label: {
      en: 'Programming & Development',
      es: 'Programación y Desarrollo',
    },
    skills: [
      'Python',
      'Object-Oriented Programming (OOP)',
      'Framework Design',
      'API Design',
      'Type Hints',
      'Metaprogramming',
      'Git & GitHub',
      'PyTest',
      'Test-Driven Development (TDD)',
      'Modular & Scalable Design',
    ],
  },
  {
    id: 'systems',
    label: {
      en: 'Systems & Networks',
      es: 'Sistemas y Redes',
    },
    skills: [
      'Linux',
      'Windows',
      'Local Area Networks (LAN)',
      'Network Installation & Maintenance',
      'System Administration Basics',
      'Hardware Installation & Troubleshooting',
      'installation of SCS',
      'Technical Support',
    ],
  },
  {
    id: 'tools',
    label: {
      en: 'Tools & Methodologies',
      es: 'Herramientas y Metodologías',
    },
    skills: [
      'Poetry',
      'Virtual Environments',
      'Semantic Versioning',
      'Dependency Management',
      'Technical Documentation',
      'Clean Code Principles',
      'VS Code',
    ],
  },
  {
    id: 'engineering',
    label: {
      en: 'Software Engineering Practices',
      es: 'Buenas Prácticas de Ingeniería de Software',
    },
    skills: [
      'Clean Architecture',
      'Separation of Concerns',
      'Refactoring',
      'Debugging Complex Systems',
      ],
  }
];

export const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/JOSE-MDG',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/juan-jos%C3%A9-medina-671a4a3a4/',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    url: 'mailto:josepemlengineer@gmail.com',
    icon: 'mail',
  },
];
