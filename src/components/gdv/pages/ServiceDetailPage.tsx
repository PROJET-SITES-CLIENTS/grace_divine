'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  Ticket,
  FileCheck as PassportIcon,
  Hotel,
  ShieldCheck,
  Car,
  Package,
  Check,
  ArrowRight,
  ChevronRight,
  Home,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import { SERVICE_IMAGE_MAP } from '@/lib/images';
import Link from 'next/link';

interface ServiceDetailPageProps {
  slug: string;
}

interface ServiceData {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  icon: string;
  features: string;
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/services/${slug}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gdv-cream">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-gdv-teal border-t-transparent animate-spin" />
          <span className="text-gdv-brown-light text-sm">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gdv-cream">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gdv-brown mb-4">Service non trouvé</h2>
          <Link href="/services" passHref>
            <Button variant="outline" className="border-gdv-teal text-gdv-teal rounded-full">
              Retour aux services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  let features: string[] = [];
  try {
    if (service.features) {
      const parsed = typeof service.features === 'string' ? JSON.parse(service.features) : service.features;
      features = Array.isArray(parsed) ? parsed.map(String) : [];
    }
  } catch {
    features = [];
  }
  const serviceImg = SERVICE_IMAGE_MAP[service.slug];

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${serviceImg || ''})` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-[10%] w-40 h-40 rounded-full bg-gdv-teal/10 blur-xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <Link href="/" passHref>
              <button className="hover:text-gdv-teal-light transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                Accueil
              </button>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" passHref>
              <button className="hover:text-gdv-teal-light transition-colors">
                Services
              </button>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gdv-teal-light">{service.title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-5 mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gdv-teal/20 backdrop-blur-sm flex items-center justify-center text-white">
              {iconMap[service.icon] || <Plane className="w-8 h-8" />}
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">
                {service.title}
              </h1>
              <p className="text-white/70 mt-1">{service.shortDesc}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-gdv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <Card className="border-gdv-brown-pale/30 bg-white p-8 sm:p-10 shadow-lg shadow-black/5">
                  <h2 className="text-2xl font-bold text-gdv-brown font-serif mb-6">
                    Description du Service
                  </h2>
                  <p className="text-gdv-brown-light leading-relaxed text-base sm:text-lg">
                    {service.description}
                  </p>
                </Card>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Features */}
              <AnimatedSection delay={0.15}>
                <Card className="border-gdv-brown-pale/30 bg-white overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-gdv-teal to-gdv-teal-light" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gdv-brown font-serif mb-5">
                      Ce qui est inclus
                    </h3>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      {features.map((feature: string, index: number) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          custom={index * 0.06}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-gdv-teal/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-gdv-teal" />
                          </div>
                          <span className="text-gdv-brown-light text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* CTA */}
              <AnimatedSection delay={0.3}>
                <Card className="border-gdv-teal/30 bg-gradient-to-br from-gdv-brown to-gdv-dark text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold font-serif mb-3">Intéressé ?</h3>
                    <p className="text-white/70 text-sm mb-5">
                      Demandez un devis gratuit pour ce service.
                    </p>
                    <div className="mt-8">
                      <Link href="/contact" passHref>
                        <Button className="w-full h-12 bg-gdv-teal hover:bg-gdv-teal-light text-white rounded-full">
                          Demander ce service
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                    <a
                      href={`https://wa.me/224627104646?text=${encodeURIComponent(`Bonjour, je suis intéressé par votre service de ${service.title}. Pouvez-vous me donner plus d'informations ?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block text-center text-gdv-teal-light text-sm hover:underline"
                    >
                      Ou contactez-nous sur WhatsApp
                    </a>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
