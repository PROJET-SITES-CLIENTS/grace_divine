'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { parsePhones, parseEmails } from '@/lib/contacts';

interface HeaderProps {
  pageVisibilities: { pageKey: string; title: string; visible: boolean; order: number }[] | null;
  settings: Record<string, string> | null;
}

const navItems = [
  { key: 'accueil', label: 'Accueil' },
  { key: 'a-propos', label: 'À propos' },
  { key: 'services', label: 'Services' },
  { key: 'galerie', label: 'Galerie' },
  { key: 'temoignages', label: 'Témoignages' },
  { key: 'partenaires', label: 'Partenaires' },
  { key: 'equipe', label: 'Équipe' },
  { key: 'faq', label: 'FAQ' },
  { key: 'recrutement', label: 'Recrutement' },
  { key: 'contact', label: 'Contact' },
];

const pathMap: Record<string, string> = {
  'accueil': '/',
  'a-propos': '/a-propos',
  'services': '/services',
  'galerie': '/galerie',
  'temoignages': '/temoignages',
  'partenaires': '/partenaires',
  'equipe': '/equipe',
  'faq': '/faq',
  'recrutement': '/recrutement',
  'contact': '/contact',
};

export default function Header({ pageVisibilities, settings }: HeaderProps) {
  const allPhones = parsePhones(settings);
  const allEmails = parseEmails(settings);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleNavItems = navItems
    .map((item) => {
      if (!pageVisibilities) return { ...item, order: 0 };
      const vis = pageVisibilities.find((p) => p.pageKey === item.key);
      return { ...item, visible: vis ? vis.visible : true, order: vis ? vis.order : 0 };
    })
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`bg-gdv-warm text-gdv-brown-medium transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            {allPhones.slice(0, 3).map((phone, i) => (
              <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className={`flex items-center gap-1.5 hover:text-gdv-teal transition-colors ${i > 0 ? 'hidden sm:flex' : ''}`}>
                <Phone className="w-3 h-3" />
                <span>{phone}</span>
              </a>
            ))}
            {allEmails.slice(0, 2).map((email, i) => (
              <a key={i} href={`mailto:${email}`} className={`flex items-center gap-1.5 hover:text-gdv-teal transition-colors ${i > 0 ? 'hidden lg:flex' : 'hidden md:flex'}`}>
                <Mail className="w-3 h-3" />
                {email}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={settings?.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-gdv-teal transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-gdv-teal transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href={settings?.twitterUrl || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-gdv-teal transition-colors" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href={settings?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-gdv-teal transition-colors" aria-label="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            {settings?.tiktokUrl && (
              <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gdv-teal transition-colors" aria-label="TikTok">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.42V13.2a8.16 8.16 0 005.58 2.18V11.9a4.85 4.85 0 01-3.77-1.82V6.69h3.77z"/></svg>
              </a>
            )}
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
            ? 'glass shadow-lg shadow-black/5'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center">
                <Image
                  src="/logo.jpg"
                  alt="Grace Divine Voyage"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain rounded"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.key}
                  href={pathMap[item.key] || '/'}
                  className={`relative px-2 xl:px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                    pathname === pathMap[item.key] || (pathname === '/' && item.key === 'accueil')
                      ? 'text-gdv-teal'
                      : 'text-gdv-brown-medium hover:text-gdv-brown hover:bg-gdv-beige/60'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.label}
                    {(pathname === pathMap[item.key] || (pathname === '/' && item.key === 'accueil')) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1 right-1 h-0.5 bg-gdv-teal rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/contact" passHref>
                <Button
                  size="sm"
                  className="hidden sm:flex bg-gdv-teal hover:bg-gdv-teal-light text-white text-xs font-semibold px-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gdv-teal/25"
                >
                  Devis Gratuit
                </Button>
              </Link>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-gdv-brown hover:text-gdv-teal p-2 rounded-lg hover:bg-gdv-beige/60 transition-colors"
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
            className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-gdv-brown-pale/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {visibleNavItems.map((item, index) => (
                <Link href={pathMap[item.key] || '/'} passHref key={item.key}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      pathname === pathMap[item.key] || (pathname === '/' && item.key === 'accueil')
                        ? 'bg-gdv-teal/10 text-gdv-teal border-l-2 border-gdv-teal'
                        : 'text-gdv-brown-medium hover:bg-gdv-beige/60 hover:text-gdv-brown'
                    }`}
                  >
                    {item.label}
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </motion.div>
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: visibleNavItems.length * 0.05 }}
                className="pt-3 px-4"
              >
                <Link href="/contact" passHref>
                  <Button
                    className="w-full bg-gdv-teal hover:bg-gdv-teal-light text-white font-semibold rounded-full"
                  >
                    Devis Gratuit
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
