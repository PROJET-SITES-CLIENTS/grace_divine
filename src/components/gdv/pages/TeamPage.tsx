'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/gdv/AnimatedSection';

interface TeamPageProps {
  team: { id: string; name: string; role: string; bio: string; photo: string }[] | null;
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
    'from-gdv-gold-light to-gdv-dark',
    'from-gdv-brown to-gdv-dark',
  ];
  const index = name.length % colors.length;
  return colors[index];
}

export default function TeamPage({ team }: TeamPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gdv-dark via-gdv-brown to-gdv-dark" />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-1/3 left-[10%] w-40 h-40 rounded-full bg-gdv-gold/10 blur-xl"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Notre Équipe
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Les Visages de Grace Divine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gdv-cream/80 text-lg max-w-2xl mx-auto"
          >
            Une équipe dévouée au service de votre satisfaction
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 lg:py-28 bg-gdv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!team || team.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gdv-beige mx-auto mb-4" />
              <p className="text-gdv-brown/60 text-lg">Aucun membre de l&apos;équipe affiché.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {team.map((member, index) => (
                <motion.div key={member.id} variants={fadeInUp} custom={index * 0.1}>
                  <Card className="border-gdv-beige/50 bg-white hover:shadow-xl hover:shadow-gdv-gold/5 transition-all duration-500 group overflow-hidden h-full">
                    <CardContent className="p-8 text-center">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto mb-5 object-cover border-4 border-gdv-gold/20 group-hover:border-gdv-gold/50 transition-all duration-300"
                        />
                      ) : (
                        <div className={`w-24 h-24 rounded-full mx-auto mb-5 bg-gradient-to-br ${getColor(member.name)} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-gdv-gold/20`}>
                          {getInitials(member.name)}
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gdv-brown group-hover:text-gdv-gold transition-colors font-serif">
                        {member.name}
                      </h3>
                      <p className="text-gdv-gold text-sm font-medium mt-1">{member.role}</p>
                      {member.bio && (
                        <p className="text-gdv-brown/60 text-sm leading-relaxed mt-3">
                          {member.bio}
                        </p>
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
