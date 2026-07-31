'use client';

import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Plane,
  Send,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FooterProps {
  pageVisibilities: { pageKey: string; title: string; visible: boolean; order: number }[] | null;
  settings: Record<string, string> | null;
  onNavigate: (page: string) => void;
}

const quickLinks = [
  { key: 'accueil', label: 'Accueil' },
  { key: 'a-propos', label: 'À propos' },
  { key: 'services', label: 'Services' },
  { key: 'galerie', label: 'Galerie' },
  { key: 'temoignages', label: 'Témoignages' },
  { key: 'partenaires', label: 'Partenaires' },
  { key: 'faq', label: 'FAQ' },
  { key: 'recrutement', label: 'Recrutement' },
  { key: 'equipe', label: 'Équipe' },
  { key: 'contact', label: 'Contact' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Footer({ pageVisibilities, settings, onNavigate }: FooterProps) {
  const visibleLinks = quickLinks.filter((item) => {
    if (!pageVisibilities) return true;
    const vis = pageVisibilities.find((p) => p.pageKey === item.key);
    return vis ? vis.visible : true;
  });

  const phone1 = settings?.phone1 || '+224 627 10 46 46';
  const phone2 = settings?.phone2 || '+224 627 10 49 49';
  const email1 = settings?.email1 || 'contact@gracedivinevoyage.net';
  const address = settings?.address || 'Kaloum Manque pas, Immeuble Yansané';

  return (
    <footer className="bg-gdv-dark text-gdv-cream relative">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-gdv-gold via-gdv-gold-light to-gdv-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo & Slogan */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gdv-gold/20 flex items-center justify-center border border-gdv-gold/40">
                <Plane className="w-5 h-5 text-gdv-gold" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-gdv-cream">Grace Divine</span>
                <span className="text-gdv-gold text-sm font-semibold tracking-widest uppercase">Voyage</span>
              </div>
            </div>
            <p className="text-gdv-cream/60 text-sm italic font-serif">
              &ldquo;Vous satisfaire est notre priorité&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={settings?.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 hover:border-gdv-teal/50 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.twitterUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4 text-gdv-gold" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-gdv-gold font-semibold text-base uppercase tracking-wider">Liens Rapides</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {visibleLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => onNavigate(link.key)}
                  className="text-gdv-cream/60 text-sm hover:text-gdv-teal-light transition-colors text-left flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gdv-teal-light" />
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-gdv-gold font-semibold text-base uppercase tracking-wider">Contact</h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:${phone1.replace(/\s/g, '')}`} className="flex items-start gap-3 text-gdv-cream/60 hover:text-gdv-teal-light transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-gdv-gold" />
                <span>{phone1}</span>
              </a>
              <a href={`tel:${phone2.replace(/\s/g, '')}`} className="flex items-start gap-3 text-gdv-cream/60 hover:text-gdv-teal-light transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-gdv-gold" />
                <span>{phone2}</span>
              </a>
              <a href={`mailto:${email1}`} className="flex items-start gap-3 text-gdv-cream/60 hover:text-gdv-teal-light transition-colors">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-gdv-gold" />
                <span>{email1}</span>
              </a>
              <div className="flex items-start gap-3 text-gdv-cream/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gdv-gold" />
                <span>{address}</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-gdv-gold font-semibold text-base uppercase tracking-wider">Newsletter</h3>
            <p className="text-gdv-cream/60 text-sm">
              Recevez nos meilleures offres et destinations directement dans votre boîte mail.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-gdv-dark border-gdv-gold/30 text-gdv-cream placeholder:text-gdv-cream/40 text-sm rounded-full px-4 h-10 focus-visible:ring-gdv-teal/50 focus-visible:border-gdv-teal/50"
              />
              <Button size="sm" className="bg-gdv-teal hover:bg-gdv-teal-light text-white rounded-full shrink-0 px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          variants={fadeIn}
          className="mt-12 pt-8 border-t border-gdv-gold/15 text-center"
        >
          <p className="text-gdv-cream/40 text-sm">
            © 2026 Grace Divine Voyage. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
