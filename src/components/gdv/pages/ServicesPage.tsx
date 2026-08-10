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
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import { IMAGES, SERVICE_IMAGE_MAP } from '@/lib/images';
import Link from 'next/link';

interface ServicesPageProps {
  services: { id: string; title: string; slug: string; shortDesc: string; icon: string; image?: string; features?: any }[] | null;
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

export default function ServicesPage({ services }: ServicesPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.servicesHero})` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full bg-gdv-teal/10 blur-xl"
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
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Des solutions complètes pour tous vos besoins de voyage
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services?.map((service, index) => {
              const serviceImg = service.image || SERVICE_IMAGE_MAP[service.slug] || IMAGES.servicesHero;
              let features: string[] = [];
              try {
                if (service.features) {
                  const parsed = typeof service.features === 'string' ? JSON.parse(service.features) : service.features;
                  features = Array.isArray(parsed) ? parsed.map(String) : [];
                }
              } catch {
                features = [];
              }
              
              return (
                <motion.div key={service.id} variants={fadeInUp} custom={index * 0.1}>
                  <Link href={`/services/${service.slug}`}>
                    <Card
                      className="group cursor-pointer border-gdv-brown-pale/30 bg-white hover:shadow-2xl hover:shadow-gdv-teal/10 transition-all duration-500 overflow-hidden h-full"
                    >
                      {/* Service image background */}
                    <div className="relative h-48 overflow-hidden">
                      {serviceImg && (
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${serviceImg})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* Icon overlay */}
                      <div className="absolute bottom-4 left-5 w-14 h-14 rounded-2xl bg-gdv-teal/90 flex items-center justify-center text-white group-hover:bg-gdv-teal group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                        {iconMap[service.icon] || <Plane className="w-8 h-8" />}
                      </div>
                    </div>

                    {/* Top accent */}
                    <div className="h-0.5 bg-gradient-to-r from-gdv-teal via-gdv-teal-light to-gdv-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gdv-brown mb-3 group-hover:text-gdv-teal transition-colors font-serif">
                        {service.title}
                      </h3>
                      <p className="text-gdv-brown-light text-sm leading-relaxed mb-6">
                        {service.shortDesc}
                      </p>
                      
                      {features.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {features.slice(0, 3).map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gdv-brown-light">
                              <CheckCircle2 className="w-4 h-4 text-gdv-teal mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="flex items-center gap-2 text-gdv-teal text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                        En savoir plus
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                </motion.div>
              );
            })}
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
            <p className="text-white/70 mb-8">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <AnimatedSection delay={0.4} className="mt-8 flex justify-center">
              <Link href="/contact" passHref>
                <Button className="h-14 px-8 text-base bg-white text-gdv-teal hover:bg-gdv-cream hover:text-gdv-teal rounded-full shadow-xl shadow-gdv-teal/20 transition-all duration-300 hover:scale-105">
                  Demander un devis personnalisé
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
