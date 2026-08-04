'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsappNumber?: string;
  siteName?: string;
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.072-1.95A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.338 22.624c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.748-1.97-7.804-6.81-8.04-7.126-.226-.316-1.842-2.456-1.842-4.684s1.168-3.324 1.582-3.778c.39-.41.864-.52 1.154-.52h.828c.264 0 .618.01.892.688.328.808 1.116 2.728 1.214 2.926.1.198.166.43.034.692-.132.264-.198.428-.396.66-.198.23-.418.514-.596.69-.198.198-.406.414-.174.812.23.396 1.026 1.692 2.204 2.742 1.514 1.346 2.79 1.764 3.188 1.962.398.198.628.166.858-.1.232-.268.996-1.162 1.262-1.56.264-.398.528-.33.892-.198.364.132 2.308 1.09 2.704 1.288.398.198.662.298.76.462.098.164.098.948-.292 2.048z" />
  </svg>
);

export default function WhatsAppButton({ whatsappNumber, siteName }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const number = whatsappNumber?.replace(/[^0-9]/g, '') || '224627104646';
  const defaultMsg = siteName
    ? `Bonjour ${siteName}, j'ai besoin d'informations.`
    : 'Bonjour, j\'ai besoin d\'informations.';
  const url = `https://wa.me/${number}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed bottom-16 right-4 z-[95] lg:bottom-20 lg:right-6">
      {/* Tooltip popup */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 origin-bottom-right"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <WhatsAppIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Besoin d&apos;aide ?</p>
                <p className="text-gray-500 text-xs">Reponse rapide sur WhatsApp</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed mb-3">
              Contactez-nous directement pour vos demandes de devis, renseignements sur nos services ou toute autre question.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
              Demarrer la conversation
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          if (showTooltip) {
            e.preventDefault();
            setShowTooltip(false);
          }
        }}
        className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe57] shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 flex items-center justify-center text-white transition-all duration-300 relative"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 lg:w-8 lg:h-8" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      </motion.a>
    </div>
  );
}
