'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/gdv/AnimatedSection';

interface TestimonialsPageProps {
  testimonials: { id: string; name: string; role: string; content: string; rating: number }[] | null;
}

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

export default function TestimonialsPage({ testimonials }: TestimonialsPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gdv-dark via-gdv-brown to-gdv-dark" />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-[10%] w-40 h-40 rounded-full bg-gdv-gold/10 blur-xl"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Témoignages
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Ce que disent nos clients
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gdv-cream/80 text-lg max-w-2xl mx-auto"
          >
            Découvrez les expériences de nos voyageurs satisfaits
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 lg:py-28 bg-gdv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!testimonials || testimonials.length === 0 ? (
            <div className="text-center py-20">
              <Quote className="w-16 h-16 text-gdv-beige mx-auto mb-4" />
              <p className="text-gdv-brown/60 text-lg">Aucun témoignage disponible pour le moment.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={testimonial.id} variants={fadeInUp} custom={index * 0.1}>
                  <Card className="border-gdv-beige/50 bg-white hover:shadow-xl hover:shadow-gdv-gold/5 transition-all duration-300 h-full relative group">
                    {/* Quote icon */}
                    <div className="absolute -top-3 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <Quote className="w-16 h-16 text-gdv-gold" />
                    </div>
                    <CardContent className="p-8">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? 'text-gdv-gold fill-gdv-gold'
                                : 'text-gdv-beige'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-gdv-brown/70 leading-relaxed italic font-serif mb-6">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gdv-beige/30">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gdv-gold to-gdv-gold-light flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gdv-brown">{testimonial.name}</p>
                          <p className="text-gdv-brown/60 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
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
