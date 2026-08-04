'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  whatsappMsg: string;
  position: string;
  active: boolean;
}

interface GlobalBannersProps {
  ads?: Ad[] | null;
}

export default function GlobalBanners({ ads }: GlobalBannersProps) {
  const allAds = ads || [];
  const bottomAds = allAds.filter((a) => a.position === 'bottom' && a.active);
  const sidebarAds = allAds.filter((a) => a.position === 'sidebar' && a.active);

  const [bottomDismissed, setBottomDismissed] = useState<string[]>([]);
  const [sidebarDismissed, setSidebarDismissed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const b = sessionStorage.getItem('gdv-bottom-dismissed');
      if (b) setBottomDismissed(JSON.parse(b));
      const s = sessionStorage.getItem('gdv-sidebar-dismissed');
      if (s) setSidebarDismissed(JSON.parse(s));
    } catch { /* ignore */ }
  }, []);

  const dismissBottom = useCallback((id: string) => {
    setBottomDismissed((prev) => {
      const next = [...prev, id];
      sessionStorage.setItem('gdv-bottom-dismissed', JSON.stringify(next));
      return next;
    });
  }, []);

  const dismissSidebar = useCallback((id: string) => {
    setSidebarDismissed((prev) => {
      const next = [...prev, id];
      sessionStorage.setItem('gdv-sidebar-dismissed', JSON.stringify(next));
      return next;
    });
  }, []);

  const openWhatsApp = (ad: Ad) => {
    const msg = ad.whatsappMsg || ad.title || 'Bonjour, je suis interesse par votre offre.';
    window.open(`https://wa.me/224627104646?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const visibleBottomAds = bottomAds.filter((ad) => !bottomDismissed.includes(ad.id));
  const visibleSidebarAds = sidebarAds.filter((ad) => !sidebarDismissed.includes(ad.id));

  return (
    <>
      {/* Fixed Bottom Banner */}
      <AnimatePresence>
        {visibleBottomAds.map((ad) => (
          <motion.div
            key={ad.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-[90]"
          >
            <div className="bg-gradient-to-r from-gdv-teal via-gdv-teal to-gdv-teal-light text-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                {ad.imageUrl && (
                  <img src={ad.imageUrl} alt={ad.title} className="hidden sm:block w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{ad.title}</p>
                  {ad.description && (
                    <p className="text-white/80 text-xs truncate hidden sm:block">{ad.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    onClick={() => openWhatsApp(ad)}
                    className="bg-white text-gdv-teal hover:bg-gdv-cream text-xs font-semibold rounded-full px-4 h-8"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                    WhatsApp
                  </Button>
                  {ad.linkUrl && (
                    <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/40 text-white hover:bg-white/10 text-xs rounded-full px-3 h-8"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  )}
                  <button
                    onClick={() => dismissBottom(ad.id)}
                    className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Fixed Sidebar Banners (left & right) */}
      <AnimatePresence>
        {visibleSidebarAds.map((ad, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={ad.id}
              initial={{ x: isLeft ? -200 : 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isLeft ? -200 : 200, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.1 }}
              className={`fixed top-1/2 -translate-y-1/2 z-[80] hidden lg:block ${isLeft ? 'left-0' : 'right-0'}`}
            >
              <div className={`relative bg-white shadow-xl border border-gdv-teal/20 overflow-hidden w-48 ${isLeft ? 'rounded-r-xl' : 'rounded-l-xl'}`}>
                <button
                  onClick={() => dismissSidebar(ad.id)}
                  className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-3 h-3" />
                </button>
                {ad.imageUrl && (
                  <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover" />
                )}
                <div className="p-3">
                  <p className="font-semibold text-gdv-brown text-xs mb-1 line-clamp-2">{ad.title}</p>
                  <Button
                    size="sm"
                    onClick={() => openWhatsApp(ad)}
                    className="w-full bg-gdv-teal hover:bg-gdv-teal-light text-white text-xs rounded-full h-7 mt-2"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
}
