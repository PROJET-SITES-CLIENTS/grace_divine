'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import { IMAGES } from '@/lib/images';
import Link from 'next/link';

interface AboutPageProps {
  aboutData: {
    heroTitle: string;
    heroSubtitle: string;
    mission: string;
    vision: string;
    values: string;
    story: string;
  } | null;
  team: { id: string; name: string; role: string; bio: string; photo: string }[] | null;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutPage({ aboutData, team }: AboutPageProps) {
  let values: string[] = [];
  try {
    if (aboutData?.values) {
      values = typeof aboutData.values === 'string' ? JSON.parse(aboutData.values) : Array.isArray(aboutData.values) ? aboutData.values : [];
    }
  } catch {
    values = [];
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.aboutHero})` }}
        />
        <div className="hero-overlay absolute inset-0" />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-[15%] w-40 h-40 rounded-full bg-gdv-teal/10 blur-xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            À propos
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            {aboutData?.heroTitle || 'À propos de Grace Divine Voyage'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {aboutData?.heroSubtitle || 'Votre partenaire de confiance pour des voyages inoubliables'}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <Card className="border-gdv-brown-pale/30 bg-white hover:shadow-xl hover:shadow-gdv-teal/5 transition-all duration-300 overflow-hidden h-full">
                <div className="h-1.5 bg-gradient-to-r from-gdv-teal to-gdv-teal-light" />
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gdv-teal/10 flex items-center justify-center text-gdv-teal mb-5">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gdv-brown font-serif mb-4">Notre Mission</h3>
                  <p className="text-gdv-brown-light leading-relaxed">
                    {aboutData?.mission || 'Notre mission est de rendre les voyages accessibles, agréables et mémorables pour chaque client.'}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <Card className="border-gdv-brown-pale/30 bg-white hover:shadow-xl hover:shadow-gdv-teal/5 transition-all duration-300 overflow-hidden h-full">
                <div className="h-1.5 bg-gradient-to-r from-gdv-teal-light to-gdv-teal" />
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gdv-teal/10 flex items-center justify-center text-gdv-teal mb-5">
                    <Eye className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gdv-brown font-serif mb-4">Notre Vision</h3>
                  <p className="text-gdv-brown-light leading-relaxed">
                    {aboutData?.vision || "Devenir l'agence de voyage de référence en Guinée et en Afrique de l'Ouest."}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      {values.length > 0 && (
        <section className="py-20 lg:py-28 bg-gdv-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <span className="text-gdv-teal text-sm font-semibold uppercase tracking-widest">Ce qui nous guide</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                  Nos Valeurs
                </h2>
              </div>
            </AnimatedSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {values.map((value: string, index: number) => (
                <motion.div key={value} variants={fadeInUp} custom={index * 0.08}>
                  <div className="px-6 py-3 rounded-full bg-white border border-gdv-brown-pale/30 hover:border-gdv-teal/40 hover:bg-gdv-teal/5 transition-all duration-300 cursor-default group">
                    <span className="text-gdv-brown font-medium text-sm sm:text-base group-hover:text-gdv-teal transition-colors flex items-center gap-2">
                      <Heart className="w-4 h-4 text-gdv-teal" />
                      {value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="text-gdv-teal text-sm font-semibold uppercase tracking-widest">Notre Histoire</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                Notre Parcours
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <Card className="border-gdv-brown-pale/30 bg-white p-8 sm:p-10 shadow-lg shadow-black/5 relative">
              <div className="absolute -top-3 left-10 w-6 h-6 bg-gdv-teal rounded-full" />
              <p className="text-gdv-brown-medium leading-relaxed text-base sm:text-lg font-serif italic">
                {aboutData?.story || "Fondée avec la passion du voyage et le désir de servir, Grace Divine Voyage est née de la conviction que chaque voyageur mérite une expérience exceptionnelle."}
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Preview */}
      {team && team.length > 0 && (
        <section className="py-20 lg:py-28 bg-gdv-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <span className="text-gdv-teal text-sm font-semibold uppercase tracking-widest">Notre Équipe</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gdv-brown font-serif mt-3">
                  Les Visages de Grace Divine
                </h2>
              </div>
            </AnimatedSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {team.slice(0, 4).map((member, index) => (
                <motion.div key={member.id} variants={fadeInUp} custom={index * 0.1}>
                  <div className="text-center group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gdv-teal to-gdv-teal-light mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gdv-teal/20">
                      {member.name.split(' ').map((n) => n.charAt(0)).join('')}
                    </div>
                    <h4 className="font-semibold text-gdv-brown">{member.name}</h4>
                    <p className="text-gdv-brown-light text-sm">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <AnimatedSection delay={0.4} className="text-center mt-12">
              <Link href="/equipe" passHref>
                <Button variant="outline" className="border-gdv-teal text-gdv-teal hover:bg-gdv-teal hover:text-white rounded-full">
                  Voir toute l'équipe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
}
