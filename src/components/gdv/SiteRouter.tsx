'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/gdv/Header';
import Footer from '@/components/gdv/Footer';
import PromotionalPopup from '@/components/gdv/PromotionalPopup';
import HomePage from '@/components/gdv/pages/HomePage';
import AboutPage from '@/components/gdv/pages/AboutPage';
import ServicesPage from '@/components/gdv/pages/ServicesPage';
import ServiceDetailPage from '@/components/gdv/pages/ServiceDetailPage';
import GalleryPage from '@/components/gdv/pages/GalleryPage';
import TestimonialsPage from '@/components/gdv/pages/TestimonialsPage';
import PartnersPage from '@/components/gdv/pages/PartnersPage';
import FAQPage from '@/components/gdv/pages/FAQPage';
import RecrutementPage from '@/components/gdv/pages/RecrutementPage';
import TeamPage from '@/components/gdv/pages/TeamPage';
import ContactPage from '@/components/gdv/pages/ContactPage';
import AdminDashboard from '@/components/gdv/pages/AdminDashboard';

interface SiteRouterProps {
  pageVisibilities: { pageKey: string; title: string; visible: boolean; order: number }[] | null;
  settings: Record<string, string> | null;
  services: { id: string; title: string; slug: string; shortDesc: string; icon: string; description: string; features: string }[] | null;
  team: { id: string; name: string; role: string; bio: string; photo: string }[] | null;
  testimonials: { id: string; name: string; role: string; content: string; rating: number }[] | null;
  partners: { id: string; name: string; logo: string; website: string }[] | null;
  faqs: { id: string; question: string; answer: string; category: string }[] | null;
  ads: { id: string; title: string; description: string; imageUrl: string; linkUrl: string; whatsappMsg: string; position: string; active: boolean }[] | null;
  jobs: { id: string; title: string; description: string; requirements: string; location: string; type: string }[] | null;
  galleryImages: { id: string; title: string; url: string; order: number }[] | null;
  galleryVideos: { id: string; title: string; url: string; thumbnail: string; order: number }[] | null;
  homeSections: { sectionKey: string; title: string; subtitle: string; content: string }[] | null;
  aboutData: { heroTitle: string; heroSubtitle: string; mission: string; vision: string; values: string; story: string } | null;
}

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function SiteRouter({
  pageVisibilities,
  settings,
  services,
  team,
  testimonials,
  partners,
  faqs,
  ads,
  jobs,
  galleryImages,
  galleryVideos,
  homeSections,
  aboutData,
}: SiteRouterProps) {
  const [currentPage, setCurrentPage] = useState('accueil');

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  const isAdmin = currentPage === 'admin';

  // Extract slug for service detail pages
  const serviceSlug = currentPage.startsWith('service-') ? currentPage.replace('service-', '') : null;

  const renderPage = () => {
    if (isAdmin) {
      return <AdminDashboard onNavigate={handleNavigate} />;
    }

    if (serviceSlug) {
      return <ServiceDetailPage slug={serviceSlug} onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'accueil':
        return (
          <HomePage
            services={services}
            testimonials={testimonials}
            homeSections={homeSections}
            onNavigate={handleNavigate}
          />
        );
      case 'a-propos':
        return (
          <AboutPage
            aboutData={aboutData}
            team={team}
            onNavigate={handleNavigate}
          />
        );
      case 'services':
        return (
          <ServicesPage
            services={services}
            onNavigate={handleNavigate}
          />
        );
      case 'galerie':
        return <GalleryPage />;
      case 'temoignages':
        return <TestimonialsPage testimonials={testimonials} />;
      case 'partenaires':
        return <PartnersPage partners={partners} />;
      case 'faq':
        return <FAQPage faqs={faqs} />;
      case 'recrutement':
        return <RecrutementPage jobs={jobs} onNavigate={handleNavigate} />;
      case 'equipe':
        return <TeamPage team={team} />;
      case 'contact':
        return <ContactPage settings={settings} services={services} />;
      default:
        return (
          <HomePage
            services={services}
            testimonials={testimonials}
            homeSections={homeSections}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <>
      {!isAdmin && (
        <Header
          pageVisibilities={pageVisibilities}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={isAdmin ? '' : 'pt-0'}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {!isAdmin && (
        <Footer
          pageVisibilities={pageVisibilities}
          settings={settings}
          onNavigate={handleNavigate}
        />
      )}

      {!isAdmin && <PromotionalPopup />}
    </>
  );
}
