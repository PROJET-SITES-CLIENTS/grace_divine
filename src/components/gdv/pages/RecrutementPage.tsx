'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import { IMAGES } from '@/lib/images';
import Link from 'next/link';

interface RecrutementPageProps {
  jobs: { id: string; title: string; description: string; requirements: string; location: string; type: string }[] | null;
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

export default function RecrutementPage({ jobs }: RecrutementPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.recrutementHero})` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-[10%] w-40 h-40 rounded-full bg-gdv-teal/10 blur-xl"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Carrières
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Recrutement
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Rejoignez notre équipe et contribuez à créer des voyages inoubliables
          </motion.p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!jobs || jobs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-16 h-16 text-gdv-brown-pale mx-auto mb-4" />
              <p className="text-gdv-brown-light text-lg">Aucune offre d&apos;emploi disponible pour le moment.</p>
              <p className="text-gdv-brown-light/60 text-sm mt-2">
                Revenez bientôt pour découvrir de nouvelles opportunités.
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-6"
            >
              {jobs.map((job, index) => (
                <motion.div key={job.id} variants={fadeInUp} custom={index * 0.1}>
                  <Card className="border-gdv-brown-pale/30 bg-white hover:shadow-xl hover:shadow-gdv-teal/5 transition-all duration-300 group overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-gdv-teal to-gdv-teal-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gdv-teal/10 flex items-center justify-center text-gdv-teal">
                              <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gdv-brown font-serif group-hover:text-gdv-teal transition-colors">
                                {job.title}
                              </h3>
                              <div className="flex items-center gap-3 mt-1 flex-wrap">
                                <Badge variant="secondary" className="bg-gdv-warm text-gdv-brown-medium text-xs border-0">
                                  {job.type}
                                </Badge>
                                <span className="text-gdv-brown-light text-xs flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {job.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          {job.description && (
                            <p className="text-gdv-brown-light text-sm leading-relaxed mt-3">
                              {job.description}
                            </p>
                          )}
                          {job.requirements && (
                            <div className="mt-4">
                              <p className="text-gdv-brown-light/60 text-xs font-semibold uppercase tracking-wider mb-2">
                                Exigences
                              </p>
                              <p className="text-gdv-brown-light text-sm">{job.requirements}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-gdv-brown-pale/30">
                        <Button
                          onClick={() => onNavigate('contact')}
                          size="sm"
                          className="bg-gdv-teal hover:bg-gdv-teal-light text-white font-semibold rounded-full text-sm group/btn"
                        >
                          Postuler <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
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
