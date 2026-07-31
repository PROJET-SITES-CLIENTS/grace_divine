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
import { IMAGES, SERVICE_IMAGE_MAP } from '@/lib/images';
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
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full bg-gdv-teal/10 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 left-[5%] w-24 h-24 rounded-full bg-gdv-gold/8 blur-lg"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full border border-white/10"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
          >
            <Plane className="w-4 h-4 text-gdv-gold" />
            <span className="text-white text-sm font-medium">Agence de Voyage de Confiance</span>
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
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
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
              className="bg-gdv-teal hover:bg-gdv-teal-light text-white font-semibold px-8 rounded-full shadow-lg shadow-gdv-teal/25 hover:shadow-xl hover:shadow-gdv-teal/30 transition-all duration-300 group"
            >
              Nos Services
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-8 rounded-full transition-all duration-300"
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
                <div className="text-white/60 text-xs sm:text-sm mt-1">{stat.label}</div>
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
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-gdv-teal-light" />
          </div>
        </motion.div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Services Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-gdv-teal text-sm font-semibold uppercase tracking-widest">Ce que nous offrons</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                Nos Services
              </h2>
              <p className="text-gdv-brown-light mt-3 max-w-2xl mx-auto">
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
            {services?.slice(0, 7).map((service, index) => {
              const serviceImg = SERVICE_IMAGE_MAP[service.slug];
              return (
                <motion.div key={service.id} variants={fadeInUp} custom={index * 0.08}>
                  <Card
                    onClick={() => onNavigate(`service-${service.slug}`)}
                    className="group cursor-pointer border-gdv-brown-pale/40 hover:border-gdv-teal/40 bg-white hover:shadow-xl hover:shadow-gdv-teal/5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Service image background */}
                    <div className="relative h-40 overflow-hidden">
                      {serviceImg && (
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${serviceImg})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gdv-teal/90 flex items-center justify-center text-white group-hover:bg-gdv-teal group-hover:scale-110 transition-all duration-300 shadow-lg">
                        {iconMap[service.icon] || <Plane className="w-7 h-7" />}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-gdv-brown mb-2 group-hover:text-gdv-teal transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gdv-brown-light text-sm leading-relaxed line-clamp-2">
                        {service.shortDesc}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-gdv-teal text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Découvrir <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <AnimatedSection delay={0.3} className="text-center mt-10">
            <Button
              onClick={() => onNavigate('services')}
              variant="outline"
              className="border-gdv-teal text-gdv-teal hover:bg-gdv-teal hover:text-white font-semibold rounded-full px-8 transition-all duration-300"
            >
              Voir tous les services <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-gdv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-gdv-teal text-sm font-semibold uppercase tracking-widest">Notre Engagement</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                {whyChooseUsSection?.title || 'Pourquoi Nous Choisir ?'}
              </h2>
              <p className="text-gdv-brown-light mt-3 max-w-2xl mx-auto">
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
                  <div className="w-20 h-20 rounded-2xl bg-gdv-teal/10 flex items-center justify-center text-gdv-teal mx-auto mb-5 group-hover:bg-gdv-teal group-hover:text-white group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gdv-teal/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gdv-brown mb-2">{feature.title}</h3>
                  <p className="text-gdv-brown-light text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-14">
                <span className="text-gdv-teal text-sm font-semibold uppercase tracking-widest">Témoignages</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                  Ce que disent nos clients
                </h2>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="max-w-3xl mx-auto">
                <div className="relative bg-white rounded-2xl p-8 sm:p-10 shadow-lg shadow-black/5 border border-gdv-brown-pale/30">
                  {/* Quote icon */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-gdv-teal rounded-full flex items-center justify-center">
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
                                  : 'text-gdv-brown-pale'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gdv-brown-medium text-base sm:text-lg leading-relaxed italic font-serif mb-6">
                          &ldquo;{currentTestimonial.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gdv-teal to-gdv-teal-light flex items-center justify-center text-white font-bold text-lg">
                            {currentTestimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gdv-brown">{currentTestimonial.name}</p>
                            <p className="text-gdv-brown-light text-sm">{currentTestimonial.role}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* Navigation */}
                  {testimonials.length > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gdv-brown-pale/30">
                      <button
                        onClick={prevTestimonial}
                        className="w-10 h-10 rounded-full border border-gdv-brown-pale/50 flex items-center justify-center text-gdv-brown-light hover:bg-gdv-teal hover:text-white hover:border-gdv-teal transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-2">
                        {testimonials.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setTestimonialIndex(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              i === testimonialIndex ? 'w-6 bg-gdv-teal' : 'w-2 bg-gdv-brown-pale'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={nextTestimonial}
                        className="w-10 h-10 rounded-full border border-gdv-brown-pale/50 flex items-center justify-center text-gdv-brown-light hover:bg-gdv-teal hover:text-white hover:border-gdv-teal transition-all"
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.ctaBg})` }}
        />
        <div className="absolute inset-0 bg-gdv-dark/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4 text-gdv-teal-light" />
              <span className="text-white text-sm font-medium">Contactez-nous</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
              {ctaSection?.title || 'Prêt à Voyager ?'}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              {ctaSection?.subtitle || 'Contactez-nous dès maintenant et laissez-nous organiser votre prochain voyage'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => onNavigate('contact')}
                size="lg"
                className="bg-gdv-teal hover:bg-gdv-teal-light text-white font-semibold px-10 rounded-full shadow-lg shadow-gdv-teal/25 hover:shadow-xl transition-all duration-300 group"
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
                  className="border-white/30 text-white hover:bg-white/10 font-semibold px-10 rounded-full transition-all duration-300"
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
