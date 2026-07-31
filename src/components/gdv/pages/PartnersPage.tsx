'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/gdv/AnimatedSection';

interface PartnersPageProps {
  partners: { id: string; name: string; logo: string; website: string }[] | null;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getColor(name: string): string {
  const colors = [
    'from-gdv-brown to-gdv-gold',
    'from-gdv-gold to-gdv-gold-light',
    'from-gdv-dark to-gdv-brown',
    'from-gdv-gold-light to-gdv-brown',
    'from-gdv-brown to-gdv-dark',
  ];
  const index = name.length % colors.length;
  return colors[index];
}

export default function PartnersPage({ partners }: PartnersPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gdv-dark via-gdv-brown to-gdv-dark" />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-1/4 right-[15%] w-40 h-40 rounded-full bg-gdv-gold/10 blur-xl"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Nos Partenaires
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Partenaires de Confiance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gdv-cream/80 text-lg max-w-2xl mx-auto"
          >
            Nous collaborons avec les meilleurs pour vous offrir un service d&apos;excellence
          </motion.p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 lg:py-28 bg-gdv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!partners || partners.length === 0 ? (
            <div className="text-center py-20">
              <Building className="w-16 h-16 text-gdv-beige mx-auto mb-4" />
              <p className="text-gdv-brown/60 text-lg">Aucun partenaire affiché pour le moment.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {partners.map((partner, index) => (
                <motion.div key={partner.id} variants={fadeInUp} custom={index * 0.08}>
                  <Card className="border-gdv-beige/50 bg-white hover:shadow-xl hover:shadow-gdv-gold/5 transition-all duration-300 group cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center justify-center min-h-[180px]">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getColor(partner.name)} flex items-center justify-center text-white font-bold text-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          {getInitials(partner.name)}
                        </div>
                      )}
                      <h3 className="font-semibold text-gdv-brown text-sm group-hover:text-gdv-gold transition-colors">
                        {partner.name}
                      </h3>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-gdv-brown/40 hover:text-gdv-gold transition-colors"
                          aria-label={`Visiter ${partner.name}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
