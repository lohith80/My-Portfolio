import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './components/layout/ThemeToggle';
import Navigation from './components/layout/Navigation';
import LoadingScreen from './components/3d/LoadingScreen';
import Scene from './components/3d/Scene';

/* ────── Lazy-loaded UI sections ────── */
const HeroSection         = React.lazy(() => import('./components/sections/HeroSection'));
const AboutSection        = React.lazy(() => import('./components/sections/AboutSection'));
const SkillsSection       = React.lazy(() => import('./components/sections/SkillsSection'));
const ExperienceSection   = React.lazy(() => import('./components/sections/ExperienceSection'));
const ProjectsSection     = React.lazy(() => import('./components/sections/ProjectsSection'));
const CertificatesSection = React.lazy(() => import('./components/sections/CertificatesSection'));   // 🆕
const ContactSection      = React.lazy(() => import('./components/sections/ContactSection'));

/* ────── 3-D overlays ────── */
import { HeroSection3D }         from './components/sections/HeroSection';
import { AboutSection3D }        from './components/sections/AboutSection';
import { SkillsSection3D }       from './components/sections/SkillsSection';
import { ExperienceSection3D }   from './components/sections/ExperienceSection';
import { ProjectsSection3D }     from './components/sections/ProjectsSection';
import { CertificatesSection3D } from './components/sections/CertificatesSection';   // 🆕
import { ContactSection3D }      from './components/sections/ContactSection';

function App() {
  const [loading, setLoading]           = useState(true);
  const [loadingProgress, setProgress]  = useState(0);
  const [currentSection, setSection]    = useState('hero');

  /* Fake loading bar */
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); return 100; }
        return p + 5;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  const handleNavigate = (section: string) => {
    setSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Update currentSection on scroll (now includes “certificates”) */
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];
    const onScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const winH = window.innerHeight;
          if (rect.top <= winH * 0.5 && rect.bottom >= winH * 0.5) {
            setSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      {loading && (
        <LoadingScreen progress={loadingProgress} onComplete={() => setLoading(false)} />
      )}

      <ThemeToggle />
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />

      {!loading && (
        <Scene currentSection={currentSection}>
          <group>
            <group visible={currentSection === 'hero'}>         <HeroSection3D />         </group>
            <group visible={currentSection === 'about'}>        <AboutSection3D />        </group>
            <group visible={currentSection === 'skills'}>       <SkillsSection3D />       </group>
            <group visible={currentSection === 'experience'}>   <ExperienceSection3D />   </group>
            <group visible={currentSection === 'projects'}>     <ProjectsSection3D />     </group>
            <group visible={currentSection === 'certificates'}> <CertificatesSection3D /> </group> {/* 🆕 */}
            <group visible={currentSection === 'contact'}>      <ContactSection3D />      </group>
          </group>
        </Scene>
      )}

      {/* ─────────── Main HTML sections ─────────── */}
      <div className="relative z-20">
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading section…</div>}>
          <section id="hero"><HeroSection onExplore={() => handleNavigate('about')} /></section>
          <section id="about"><AboutSection /></section>
          <section id="skills"><SkillsSection /></section>
          <section id="experience"><ExperienceSection /></section>
          <section id="projects"><ProjectsSection /></section>
          <section id="certificates"><CertificatesSection /></section>   {/* 🆕 */}
          <section id="contact"><ContactSection /></section>
        </Suspense>
      </div>

      {/* Footer notice */}
      <motion.div
        className="fixed bottom-4 w-full flex flex-col items-center z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          © 2026 Indu Lohith Narisetty. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}

export default App;
