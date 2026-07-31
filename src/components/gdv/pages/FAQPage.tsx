'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import { IMAGES } from '@/lib/images';

interface FAQPageProps {
  faqs: { id: string; question: string; answer: string; category: string }[] | null;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FAQPage({ faqs }: FAQPageProps) {
  const groupedFAQs = faqs?.reduce<Record<string, typeof faqs>>((acc, faq) => {
    const cat = faq.category || 'Général';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  const categories = groupedFAQs ? Object.keys(groupedFAQs) : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.faqHero})` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/3 left-[15%] w-40 h-40 rounded-full bg-gdv-teal/10 blur-xl"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            FAQ
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Questions Fréquentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Trouvez rapidement les réponses à vos questions
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!faqs || faqs.length === 0 ? (
            <div className="text-center py-20">
              <HelpCircle className="w-16 h-16 text-gdv-brown-pale mx-auto mb-4" />
              <p className="text-gdv-brown-light text-lg">Aucune question fréquente disponible.</p>
            </div>
          ) : (
            categories.map((category, catIndex) => (
              <AnimatedSection key={category} delay={catIndex * 0.1} className="mb-10">
                <div className="mb-5">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gdv-teal/10 border border-gdv-teal/30 text-gdv-teal text-sm font-semibold">
                    {category}
                  </span>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                  {groupedFAQs[category].map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={index * 0.06}
                      variants={fadeInUp}
                    >
                      <AccordionItem
                        value={faq.id}
                        className="bg-white rounded-xl border border-gdv-brown-pale/30 overflow-hidden hover:border-gdv-teal/30 transition-colors data-[state=open]:border-gdv-teal/50 data-[state=open]:shadow-md data-[state=open]:shadow-gdv-teal/5"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left text-gdv-brown font-semibold hover:text-gdv-teal hover:no-underline transition-colors [&[data-state=open]>svg]:text-gdv-teal [&[data-state=open]]:text-gdv-teal">
                          <span className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-gdv-teal/10 flex items-center justify-center text-gdv-teal text-xs font-bold shrink-0">
                              {index + 1}
                            </span>
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5 text-gdv-brown-light leading-relaxed pl-16">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </AnimatedSection>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
