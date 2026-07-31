'use client';

import { motion } from 'framer-motion';
import {
  Plane,
  Ticket,
  FileCheck as PassportIcon,
  Hotel,
  ShieldCheck,
  Car,
  Package,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/gdv/AnimatedSection';

interface ServicesPageProps {
  services: { id: string; title: string; slug: string; shortDesc: string; icon: string }[] | null;
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-8 h-8" />,
  Ticket: <Ticket className="w-8 h-8" />,
  Passport: <PassportIcon className="w-8 h-8" />,
  Hotel: <Hotel className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Car: <Car className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesPage({ services, onNavigate }: ServicesPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gdv-dark via-gdv-brown to-gdv-dark" />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full bg-gdv-gold/10 blur-xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Nos Expertises
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Nos Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gdv-cream/80 text-lg max-w-2xl mx-auto"
          >
            Des solutions complètes pour tous vos besoins de voyage
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-gdv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services?.map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp} custom={index * 0.1}>
                <Card
                  onClick={() => onNavigate(`service-${service.slug}`)}
                  className="group cursor-pointer border-gdv-beige/50 bg-white hover:shadow-2xl hover:shadow-gdv-gold/10 transition-all duration-500 overflow-hidden h-full"
                >
                  {/* Top accent */}
                  <div className="h-1 bg-gradient-to-r from-gdv-gold via-gdv-gold-light to-gdv-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gdv-gold/10 flex items-center justify-center text-gdv-gold mb-6 group-hover:bg-gdv-gold group-hover:text-white group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gdv-gold/20">
                      {iconMap[service.icon] || <Plane className="w-8 h-8" />}
                    </div>
                    <h3 className="text-xl font-bold text-gdv-brown mb-3 group-hover:text-gdv-gold transition-colors font-serif">
                      {service.title}
                    </h3>
                    <p className="text-gdv-brown/60 text-sm leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center gap-2 text-gdv-gold text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gdv-brown to-gdv-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-4">
              Vous avez besoin d&apos;un service sur mesure ?
            </h2>
            <p className="text-gdv-cream/70 mb-8">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              className="bg-gdv-gold hover:bg-gdv-gold-light text-white font-semibold px-10 rounded-full shadow-lg transition-all duration-300 group"
            >
              Demander un Devis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
