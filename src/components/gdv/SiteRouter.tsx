'use client';

import { useState, useCallback, useRef } from 'react';
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

export default function SiteRouter(initialProps: SiteRouterProps) {
  const [settings, setSettings] = useState(initialProps.settings);
  const [pageVisibilities, setPageVisibilities] = useState(initialProps.pageVisibilities);
  const [services, setServices] = useState(initialProps.services);
  const [team, setTeam] = useState(initialProps.team);
  const [testimonials, setTestimonials] = useState(initialProps.testimonials);
  const [partners, setPartners] = useState(initialProps.partners);
  const [faqs, setFaqs] = useState(initialProps.faqs);
  const [jobs, setJobs] = useState(initialProps.jobs);
  const [homeSections, setHomeSections] = useState(initialProps.homeSections);
  const [aboutData, setAboutData] = useState(initialProps.aboutData);
  const [ads, setAds] = useState(initialProps.ads);
  const [galleryImages, setGalleryImages] = useState(initialProps.galleryImages);
  const [galleryVideos, setGalleryVideos] = useState(initialProps.galleryVideos);
  const [currentPage, setCurrentPage] = useState('accueil');
  const [refreshing, setRefreshing] = useState(false);
  const prevPageRef = useRef('accueil');
  const refreshPromiseRef = useRef<Promise<void> | null>(null);

  const refreshAllData = useCallback(async (force = false) => {
    // Deduplicate: if a refresh is already in progress, reuse its promise
    if (refreshPromiseRef.current && !force) return refreshPromiseRef.current;
    setRefreshing(true);
    const promise = (async () => {
    try {
      const results = await Promise.all([
        fetch('/api/settings').then((r) => r.json()).catch(() => null),
        fetch('/api/pages-visibility').then((r) => r.json()).catch(() => []),
        fetch('/api/services').then((r) => r.json()).catch(() => []),
        fetch('/api/team').then((r) => r.json()).catch(() => []),
        fetch('/api/testimonials').then((r) => r.json()).catch(() => []),
        fetch('/api/partners').then((r) => r.json()).catch(() => []),
        fetch('/api/faq').then((r) => r.json()).catch(() => []),
        fetch('/api/ads').then((r) => r.json()).catch(() => []),
        fetch('/api/jobs').then((r) => r.json()).catch(() => []),
        fetch('/api/home-sections').then((r) => r.json()).catch(() => []),
        fetch('/api/about').then((r) => r.json()).catch(() => null),
        fetch('/api/gallery/images').then((r) => r.json()).catch(() => []),
        fetch('/api/gallery/videos').then((r) => r.json()).catch(() => []),
      ]);
      const [settingsData, pagesData, servicesData, teamData, testimonialsData, partnersData, faqsData, adsData, jobsData, homeSectionsData, aboutResult, galleryImagesData, galleryVideosData] = results;
      // Apply same filters as page.tsx server component for consistency
      if (settingsData) setSettings(settingsData);
      if (pagesData) setPageVisibilities((pagesData as any[]).filter((p: any) => p.visible !== false));
      if (servicesData) setServices(servicesData); // API already filters visible: true
      if (teamData) setTeam((teamData as any[]).filter((t: any) => t.visible !== false));
      if (testimonialsData) setTestimonials((testimonialsData as any[]).filter((t: any) => t.visible !== false));
      if (partnersData) setPartners((partnersData as any[]).filter((p: any) => p.visible !== false));
      if (faqsData) setFaqs((faqsData as any[]).filter((f: any) => f.visible !== false));
      if (adsData) setAds(adsData); // API already filters active: true
      if (jobsData) setJobs((jobsData as any[]).filter((j: any) => j.active !== false));
      if (homeSectionsData) setHomeSections(homeSectionsData);
      if (aboutResult) setAboutData(aboutResult);
      if (galleryImagesData) setGalleryImages((galleryImagesData as any[]).filter((g: any) => g.visible !== false));
      if (galleryVideosData) setGalleryVideos((galleryVideosData as any[]).filter((g: any) => g.visible !== false));
    } catch (err) {
      console.error('Erreur rafraichissement:', err);
    } finally {
      setRefreshing(false);
      refreshPromiseRef.current = null;
    }
    })();
    refreshPromiseRef.current = promise;
    return promise;
  }, []);

  const handleNavigate = useCallback(async (page: string) => {
    const wasAdmin = prevPageRef.current === 'admin';
    prevPageRef.current = page;
    // When leaving admin, wait for fresh data BEFORE rendering the new page
    if (wasAdmin && page !== 'admin') {
      refreshPromiseRef.current = null; // force a fresh refresh
      await refreshAllData(true);
    }
    setCurrentPage(page);
  }, [refreshAllData]);

  const handleDataChanged = useCallback(() => {
    refreshAllData();
  }, [refreshAllData]);

  const isAdmin = currentPage === 'admin';
  const serviceSlug = currentPage.startsWith('service-') ? currentPage.replace('service-', '') : null;

  const renderPage = () => {
    if (isAdmin) {
      return <AdminDashboard onNavigate={handleNavigate} onDataChanged={handleDataChanged} />;
    }
    if (serviceSlug) {
      return <ServiceDetailPage slug={serviceSlug} onNavigate={handleNavigate} />;
    }
    switch (currentPage) {
      case 'accueil':
        return <HomePage services={services} testimonials={testimonials} homeSections={homeSections} ads={ads} onNavigate={handleNavigate} />;
      case 'a-propos':
        return <AboutPage aboutData={aboutData} team={team} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage services={services} onNavigate={handleNavigate} />;
      case 'galerie':
        return <GalleryPage initialImages={galleryImages} initialVideos={galleryVideos} />;
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
        return <HomePage services={services} testimonials={testimonials} homeSections={homeSections} ads={ads} onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {refreshing && (
        <div className="fixed top-20 right-4 z-[200] bg-gdv-teal text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium animate-pulse">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          <span>Synchronisation...</span>
        </div>
      )}

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

      {!isAdmin && <PromotionalPopup ads={ads} />}
    </>
  );
}
