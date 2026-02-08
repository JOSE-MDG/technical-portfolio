import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Skills } from '@/components/home/Skills';
import { Links } from '@/components/home/Links';
import { FeaturedProject } from '@/components/projects/FeaturedProject';
import { getFeaturedProject } from '@/lib/projects';

const Index = () => {
  const [featuredProject, setFeaturedProject] = useState(getFeaturedProject());

  // Listen to storage events to update when projects change
  useEffect(() => {
    const handleStorageChange = () => {
      setFeaturedProject(getFeaturedProject());
    };

    window.addEventListener('projectsUpdated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('projectsUpdated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Layout>
      <Hero />
      
      {featuredProject && (
        <FeaturedProject project={featuredProject} />
      )}

      <About />
      <Skills />
      <Links />
    </Layout>
  );
};

export default Index;