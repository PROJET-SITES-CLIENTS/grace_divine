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
  Star,
  Award,
  Clock,
  Globe,
  Users,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import PromoBanner from '@/components/gdv/PromoBanner';
import { useState, useEffect, useCallback } from 'react';

interface HomePageProps {
  services: { id: string; title: string; slug: string; shortDesc: string; icon: string }[] | null;
  testimonials: { id: string; name: string; role: string; content: string; rating: number }[] | null;
  homeSections: { sectionKey: string; title: string; subtitle: string; content: string }[] | null;
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-7 h-7" />,
  Ticket: <Ticket className="w-7 h-7" />,
  Passport: <PassportIcon className="w-7 h-7" />,
  Hotel: <Hotel className="w-7 h-7" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7" />,
  Car: <Car className="w-7 h-7" />,
  Package: <Package className="w-7 h-7" />,
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
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage({ services, testimonials, homeSections, onNavigate }: HomePageProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials]);

  const prevTestimonial = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials]);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [testimonials, nextTestimonial]);

  const heroSection = homeSections?.find((s) => s.sectionKey === 'hero');
  const whyChooseUsSection = homeSections?.find((s) => s.sectionKey === 'why-choose-us');
  const ctaSection = homeSections?.find((s) => s.sectionKey === 'cta-section');

  const currentTestimonial = testimonials?.[testimonialIndex];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gdv-dark via-gdv-brown to-gdv-dark" />
        <div className="hero-overlay absolute inset-0" />

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full bg-gdv-gold/10 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 left-[5%] w-24 h-24 rounded-full bg-gdv-gold/8 blur-lg"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full border border-gdv-gold/10"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gdv-gold/15 border border-gdv-gold/30 rounded-full px-5 py-2 mb-8"
          >
            <Plane className="w-4 h-4 text-gdv-gold" />
            <span className="text-gdv-gold text-sm font-medium">Agence de Voyage de Confiance</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight mb-6"
          >
            {heroSection?.title || 'Découvrez le Monde'}
            <br />
            <span className="text-gradient-gold">avec Élégance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gdv-cream/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {heroSection?.subtitle || 'Votre agence de voyage de confiance en Guinée'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => onNavigate('services')}
              size="lg"
              className="bg-gdv-gold hover:bg-gdv-gold-light text-white font-semibold px-8 rounded-full shadow-lg shadow-gdv-gold/25 hover:shadow-xl hover:shadow-gdv-gold/30 transition-all duration-300 group"
            >
              Nos Services
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              variant="outline"
              className="border-gdv-cream/30 text-gdv-cream hover:bg-white/10 hover:border-gdv-cream/50 font-semibold px-8 rounded-full transition-all duration-300"
            >
              Contactez-nous
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '500+', label: 'Clients Satisfaits' },
              { value: '15+', label: "Années d'Expérience" },
              { value: '50+', label: 'Destinations' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gdv-gold">{stat.value}</div>
                <div className="text-gdv-cream/60 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-gdv-cream/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-gdv-gold" />
          </div>
        </motion.div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Services Preview */}
      <section className="py-20 lg:py-28 bg-gdv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-gdv-gold text-sm font-semibold uppercase tracking-widest">Ce que nous offrons</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                Nos Services
              </h2>
              <p className="text-gdv-brown/60 mt-3 max-w-2xl mx-auto">
                Des solutions complètes pour tous vos besoins de voyage
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {services?.slice(0, 7).map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp} custom={index * 0.08}>
                <Card
                  onClick={() => onNavigate(`service-${service.slug}`)}
                  className="group cursor-pointer border-gdv-beige/50 hover:border-gdv-gold/50 bg-white hover:shadow-xl hover:shadow-gdv-gold/5 transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gdv-gold/10 flex items-center justify-center text-gdv-gold mb-4 group-hover:bg-gdv-gold group-hover:text-white transition-all duration-300">
                      {iconMap[service.icon] || <Plane className="w-7 h-7" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gdv-brown mb-2 group-hover:text-gdv-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gdv-brown/60 text-sm leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-gdv-gold text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Découvrir <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection delay={0.3} className="text-center mt-10">
            <Button
              onClick={() => onNavigate('services')}
              variant="outline"
              className="border-gdv-gold text-gdv-gold hover:bg-gdv-gold hover:text-white font-semibold rounded-full px-8 transition-all duration-300"
            >
              Voir tous les services <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-gdv-gold text-sm font-semibold uppercase tracking-widest">Notre Engagement</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                {whyChooseUsSection?.title || 'Pourquoi Nous Choisir ?'}
              </h2>
              <p className="text-gdv-brown/60 mt-3 max-w-2xl mx-auto">
                {whyChooseUsSection?.subtitle || "L'excellence au service de votre voyage"}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, title: 'Expertise', desc: 'Plus de 15 ans d\'expérience dans l\'industrie du voyage' },
              { icon: <Globe className="w-8 h-8" />, title: 'Tarifs Compétitifs', desc: 'Les meilleurs prix négociés auprès de nos partenaires' },
              { icon: <Clock className="w-8 h-8" />, title: 'Support 24/7', desc: 'Une équipe disponible à tout moment pour vous assister' },
              { icon: <Users className="w-8 h-8" />, title: 'Réseau Mondial', desc: 'Des partenaires dans plus de 50 destinations' },
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-gdv-gold/10 flex items-center justify-center text-gdv-gold mx-auto mb-5 group-hover:bg-gdv-gold group-hover:text-white group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gdv-gold/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gdv-brown mb-2">{feature.title}</h3>
                  <p className="text-gdv-brown/60 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 lg:py-28 bg-gdv-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-14">
                <span className="text-gdv-gold text-sm font-semibold uppercase tracking-widest">Témoignages</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                  Ce que disent nos clients
                </h2>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="max-w-3xl mx-auto">
                <div className="relative bg-white rounded-2xl p-8 sm:p-10 shadow-lg shadow-gdv-brown/5 border border-gdv-beige/50">
                  {/* Quote icon */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-gdv-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-serif leading-none">&ldquo;</span>
                  </div>

                  <motion.div
                    key={currentTestimonial?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {currentTestimonial && (
                      <>
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < currentTestimonial.rating
                                  ? 'text-gdv-gold fill-gdv-gold'
                                  : 'text-gdv-beige'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gdv-brown/80 text-base sm:text-lg leading-relaxed italic font-serif mb-6">
                          &ldquo;{currentTestimonial.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gdv-gold to-gdv-gold-light flex items-center justify-center text-white font-bold text-lg">
                            {currentTestimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gdv-brown">{currentTestimonial.name}</p>
                            <p className="text-gdv-brown/60 text-sm">{currentTestimonial.role}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* Navigation */}
                  {testimonials.length > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gdv-beige/50">
                      <button
                        onClick={prevTestimonial}
                        className="w-10 h-10 rounded-full border border-gdv-beige flex items-center justify-center text-gdv-brown/60 hover:bg-gdv-gold hover:text-white hover:border-gdv-gold transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-2">
                        {testimonials.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setTestimonialIndex(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              i === testimonialIndex ? 'w-6 bg-gdv-gold' : 'w-2 bg-gdv-beige'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={nextTestimonial}
                        className="w-10 h-10 rounded-full border border-gdv-beige flex items-center justify-center text-gdv-brown/60 hover:bg-gdv-gold hover:text-white hover:border-gdv-gold transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gdv-brown via-gdv-dark to-gdv-brown" />
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,0.05)_35px,rgba(255,255,255,0.05)_70px)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-gdv-gold/15 border border-gdv-gold/30 rounded-full px-5 py-2 mb-6"
            >
              <MessageCircle className="w-4 h-4 text-gdv-gold" />
              <span className="text-gdv-gold text-sm font-medium">Contactez-nous</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
              {ctaSection?.title || 'Prêt à Voyager ?'}
            </h2>
            <p className="text-gdv-cream/80 text-lg max-w-2xl mx-auto mb-10">
              {ctaSection?.subtitle || 'Contactez-nous dès maintenant et laissez-nous organiser votre prochain voyage'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => onNavigate('contact')}
                size="lg"
                className="bg-gdv-gold hover:bg-gdv-gold-light text-white font-semibold px-10 rounded-full shadow-lg shadow-gdv-gold/25 hover:shadow-xl transition-all duration-300 group"
              >
                Demander un Devis
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="https://wa.me/224627104646?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20services%20de%20voyage."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gdv-cream/30 text-gdv-cream hover:bg-white/10 font-semibold px-10 rounded-full transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
