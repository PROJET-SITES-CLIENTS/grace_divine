'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Menu,
  X,
  Plane,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  pageVisibilities: { pageKey: string; title: string; visible: boolean; order: number }[] | null;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navItems = [
  { key: 'accueil', label: 'Accueil' },
  { key: 'a-propos', label: 'À propos' },
  { key: 'services', label: 'Services' },
  { key: 'galerie', label: 'Galerie' },
  { key: 'temoignages', label: 'Témoignages' },
  { key: 'partenaires', label: 'Partenaires' },
  { key: 'faq', label: 'FAQ' },
  { key: 'contact', label: 'Contact' },
];

export default function Header({ pageVisibilities, onNavigate, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleNavItems = navItems.filter((item) => {
    if (!pageVisibilities) return true;
    const vis = pageVisibilities.find((p) => p.pageKey === item.key);
    return vis ? vis.visible : true;
  });

  // Handle navigation: scroll to top
  const prevPageRef = useRef(currentPage);
  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentionally close menu on navigation
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`bg-gdv-dark text-gdv-cream/90 transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="tel:+224627104646" className="flex items-center gap-1.5 hover:text-gdv-gold transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+224 627 10 46 46</span>
              <span className="sm:hidden">+224 627 10 46 46</span>
            </a>
            <a href="tel:+224627104949" className="flex items-center gap-1.5 hover:text-gdv-gold transition-colors hidden sm:flex">
              <Phone className="w-3 h-3" />
              +224 627 10 49 49
            </a>
            <a href="mailto:contact@gracedivinevoyage.net" className="flex items-center gap-1.5 hover:text-gdv-gold transition-colors hidden md:flex">
              <Mail className="w-3 h-3" />
              contact@gracedivinevoyage.net
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com/gracedivinevoyage" target="_blank" rel="noopener noreferrer" className="hover:text-gdv-gold transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com/gracedivinevoyage" target="_blank" rel="noopener noreferrer" className="hover:text-gdv-gold transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-gdv-gold transition-colors" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-gdv-gold transition-colors" aria-label="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg shadow-gdv-dark/10'
            : 'bg-gdv-dark/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => onNavigate('accueil')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-gdv-gold/20 flex items-center justify-center border border-gdv-gold/40 group-hover:bg-gdv-gold/30 transition-colors">
                <Plane className="w-5 h-5 text-gdv-gold" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg lg:text-xl font-bold text-gdv-cream tracking-wide">
                  Grace Divine
                </span>
                <span className="text-gdv-gold text-sm lg:text-base font-semibold tracking-widest uppercase">
                  Voyage
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {visibleNavItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`relative px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentPage === item.key
                      ? 'text-gdv-gold'
                      : 'text-gdv-cream/80 hover:text-gdv-cream hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.label}
                    {currentPage === item.key && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gdv-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={() => onNavigate('contact')}
                size="sm"
                className="hidden sm:flex bg-gdv-gold hover:bg-gdv-gold-light text-white text-xs font-semibold px-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gdv-gold/25"
              >
                Devis Gratuit
              </Button>
              <Button
                onClick={() => onNavigate('admin')}
                variant="ghost"
                size="sm"
                className="text-gdv-cream/50 hover:text-gdv-gold hover:bg-white/5 text-xs px-2"
                aria-label="Administration"
              >
                <ShieldCheck className="w-4 h-4" />
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-gdv-cream hover:text-gdv-gold p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-gdv-dark/98 backdrop-blur-lg border-t border-gdv-gold/20 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {visibleNavItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    onNavigate(item.key);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === item.key
                      ? 'bg-gdv-gold/15 text-gdv-gold border-l-2 border-gdv-gold'
                      : 'text-gdv-cream/80 hover:bg-white/5 hover:text-gdv-cream'
                  }`}
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: visibleNavItems.length * 0.05 }}
                className="pt-3 px-4"
              >
                <Button
                  onClick={() => {
                    onNavigate('contact');
                    setMobileOpen(false);
                  }}
                  className="w-full bg-gdv-gold hover:bg-gdv-gold-light text-white font-semibold rounded-full"
                >
                  Devis Gratuit
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
