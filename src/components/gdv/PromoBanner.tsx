'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, X } from 'lucide-react';
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

interface PromoBannerProps {
  ads?: Ad[] | null;
}

export default function PromoBanner({ ads }: PromoBannerProps) {
  const bannerAds = (ads || []).filter((a) => a.position === 'banner');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dismissed, setDismissed] = useState(false);

  const nextAd = useCallback(() => {
    if (bannerAds.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % bannerAds.length);
  }, [bannerAds.length]);

  const prevAd = useCallback(() => {
    if (bannerAds.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + bannerAds.length) % bannerAds.length);
  }, [bannerAds.length]);

  if (dismissed || bannerAds.length === 0) return null;

  const currentAd = bannerAds[currentIndex];
  if (!currentAd) return null;

  const openWhatsApp = () => {
    const msg = currentAd.whatsappMsg || currentAd.title || 'Bonjour, je suis intéressé par votre offre.';
    const url = `https://wa.me/224627104646?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gdv-brown via-gdv-dark to-gdv-brown">
      <div className="absolute inset-0 bg-[url('/placeholder-promo.jpg')] bg-cover bg-center opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentAd.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-gdv-cream font-semibold text-sm sm:text-base">
                {currentAd.title}
              </h4>
              {currentAd.description && (
                <p className="text-gdv-cream/70 text-xs sm:text-sm mt-0.5">
                  {currentAd.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-full gap-1.5 px-4"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </Button>
              {bannerAds.length > 1 && (
                <div className="flex items-center gap-1">
                  <button onClick={prevAd} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gdv-cream transition-colors" aria-label="Publicite precedente">
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                  <button onClick={nextAd} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gdv-cream transition-colors" aria-label="Publicite suivante">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        {bannerAds.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2 sm:mt-0">
            {bannerAds.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-gdv-gold' : 'w-1.5 bg-gdv-cream/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Close button - visible on all screens */}
      <button onClick={() => setDismissed(true)} className="absolute top-2 right-3 text-gdv-cream/50 hover:text-gdv-cream transition-colors z-10" aria-label="Fermer la banniere">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
