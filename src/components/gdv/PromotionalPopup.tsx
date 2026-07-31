'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
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

export default function PromotionalPopup() {
  const [popupAd, setPopupAd] = useState<Ad | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('gdv-popup-shown');
    if (shown) return;

    fetch('/api/ads')
      .then((res) => res.json())
      .then((ads: Ad[]) => {
        const popup = ads.find((a) => a.position === 'popup' && a.imageUrl);
        if (popup) {
          setPopupAd(popup);
          setShowPopup(true);
          sessionStorage.setItem('gdv-popup-shown', 'true');
        }
      })
      .catch(() => {});
  }, []);

  const closePopup = () => setShowPopup(false);

  const openWhatsApp = () => {
    const msg = popupAd?.whatsappMsg || popupAd?.title || 'Bonjour, je suis intéressé par votre offre.';
    const url = `https://wa.me/224627104646?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    closePopup();
  };

  return (
    <AnimatePresence>
      {showPopup && popupAd && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={closePopup}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-md"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Shimmer border */}
              <div className="absolute inset-0 rounded-2xl shimmer border-2 border-gdv-gold/40 pointer-events-none z-10" />

              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Close button */}
                <button
                  onClick={closePopup}
                  className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image */}
                {popupAd.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={popupAd.imageUrl}
                      alt={popupAd.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gdv-brown font-serif mb-2">
                    {popupAd.title}
                  </h3>
                  {popupAd.description && (
                    <p className="text-gdv-brown/70 text-sm leading-relaxed mb-4">
                      {popupAd.description}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <Button
                      onClick={openWhatsApp}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contacter sur WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      onClick={closePopup}
                      className="rounded-full border-gdv-beige text-gdv-brown"
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
