'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import { IMAGES } from '@/lib/images';
import { parsePhones, parseEmails } from '@/lib/contacts';

interface ContactPageProps {
  settings: Record<string, string> | null;
  services: { id: string; title: string; slug: string }[] | null;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ContactPage({ settings, services }: ContactPageProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError('Veuillez remplir les champs obligatoires.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setError("Une erreur est survenue lors de l'envoi. Veuillez reessayer.");
        return;
      }

      setSuccess(true);

      // Redirect to WhatsApp
      const msg = `Bonjour, je suis ${form.name}.\n\nSujet: ${form.subject || 'Nouveau contact'}\n${form.service ? `Service: ${form.service}\n` : ''}${form.phone ? `Téléphone: ${form.phone}\n` : ''}${form.email ? `Email: ${form.email}\n` : ''}\n\nMessage:\n${form.message}`;

      window.open(`https://wa.me/224627104646?text=${encodeURIComponent(msg)}`, '_blank');

      setForm({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const allPhones = parsePhones(settings);
  const allEmails = parseEmails(settings);
  const address = settings?.address || 'Kaloum Manque pas, Immeuble Yansané';

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.contactHero})` }}
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
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Nous sommes à votre écoute pour répondre à toutes vos questions
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeInUp}
              className="lg:col-span-3"
            >
              <Card className="border-gdv-brown-pale/30 bg-white shadow-lg shadow-black/5">
                <CardContent className="p-8 sm:p-10">
                  <h2 className="text-2xl font-bold text-gdv-brown font-serif mb-2">Envoyez-nous un message</h2>
                  <p className="text-gdv-brown-light text-sm mb-8">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>

                  {success && (
                    <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                      Votre message a été envoyé avec succès ! Vous allez être redirigé vers WhatsApp.
                    </div>
                  )}
                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gdv-brown text-sm font-medium">
                          Nom complet <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Votre nom"
                          className="bg-gdv-cream/50 border-gdv-brown-pale/30 focus-visible:ring-gdv-teal/30 focus-visible:border-gdv-teal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gdv-brown text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          className="bg-gdv-cream/50 border-gdv-brown-pale/30 focus-visible:ring-gdv-teal/30 focus-visible:border-gdv-teal"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gdv-brown text-sm font-medium">
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+224 ..."
                          className="bg-gdv-cream/50 border-gdv-brown-pale/30 focus-visible:ring-gdv-teal/30 focus-visible:border-gdv-teal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gdv-brown text-sm font-medium">
                          Sujet
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Sujet de votre demande"
                          className="bg-gdv-cream/50 border-gdv-brown-pale/30 focus-visible:ring-gdv-teal/30 focus-visible:border-gdv-teal"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-gdv-brown text-sm font-medium">
                        Service souhaité
                      </Label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full h-10 rounded-md bg-gdv-cream/50 border border-gdv-brown-pale/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gdv-teal/30 focus:border-gdv-teal text-gdv-brown"
                      >
                        <option value="">Sélectionnez un service</option>
                        {services?.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gdv-brown text-sm font-medium">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Décrivez votre demande..."
                        rows={5}
                        className="bg-gdv-cream/50 border-gdv-brown-pale/30 focus-visible:ring-gdv-teal/30 focus-visible:border-gdv-teal resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto bg-gdv-teal hover:bg-gdv-teal-light text-white font-semibold px-8 rounded-full transition-all duration-300 disabled:opacity-50 group"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15}
              variants={fadeInUp}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Contact */}
              <Card className="border-gdv-brown-pale/30 bg-white overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-gdv-teal to-gdv-teal-light" />
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gdv-brown font-serif mb-5">Coordonnées</h3>
                  <div className="space-y-4">
                    {allPhones.map((phone, i) => (
                      <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-start gap-3 text-gdv-brown-light hover:text-gdv-teal transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-gdv-teal/10 flex items-center justify-center shrink-0 group-hover:bg-gdv-teal/20 transition-colors">
                          <Phone className="w-5 h-5 text-gdv-teal" />
                        </div>
                        <div>
                          <p className="text-xs text-gdv-brown-light/70 font-medium">{i === 0 ? 'Téléphone principal' : `Téléphone ${i + 1}`}</p>
                          <p className="text-sm font-medium">{phone}</p>
                        </div>
                      </a>
                    ))}
                    {allEmails.map((email, i) => (
                      <a key={i} href={`mailto:${email}`} className="flex items-start gap-3 text-gdv-brown-light hover:text-gdv-teal transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-gdv-teal/10 flex items-center justify-center shrink-0 group-hover:bg-gdv-teal/20 transition-colors">
                          <Mail className="w-5 h-5 text-gdv-teal" />
                        </div>
                        <div>
                          <p className="text-xs text-gdv-brown-light/70 font-medium">{i === 0 ? 'Email principal' : `Email ${i + 1}`}</p>
                          <p className="text-sm font-medium">{email}</p>
                        </div>
                      </a>
                    ))}
                    <div className="flex items-start gap-3 text-gdv-brown-light">
                      <div className="w-10 h-10 rounded-lg bg-gdv-teal/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-gdv-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-gdv-brown-light/70 font-medium">Adresse</p>
                        <p className="text-sm font-medium">{address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA */}
              <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white overflow-hidden border-0">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-80" />
                  <h3 className="text-lg font-bold mb-2">Préférez WhatsApp ?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Contactez-nous directement pour une réponse rapide.
                  </p>
                  <a href="https://wa.me/224627104646?text=Bonjour%2C%20je%20souhaite%20des%20informations." target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-white text-green-700 hover:bg-green-50 font-semibold rounded-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ouvrir WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-gdv-brown-pale/30 bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gdv-brown font-serif mb-4">Réseaux Sociaux</h3>
                  <div className="flex items-center gap-3">
                    <a href={settings?.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gdv-teal/10 flex items-center justify-center hover:bg-gdv-teal hover:text-white text-gdv-teal transition-all" aria-label="Facebook">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gdv-teal/10 flex items-center justify-center hover:bg-gdv-teal hover:text-white text-gdv-teal transition-all" aria-label="Instagram">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href={settings?.twitterUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gdv-teal/10 flex items-center justify-center hover:bg-gdv-teal hover:text-white text-gdv-teal transition-all" aria-label="Twitter">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={settings?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gdv-teal/10 flex items-center justify-center hover:bg-gdv-teal hover:text-white text-gdv-teal transition-all" aria-label="YouTube">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="border-gdv-brown-pale/30 bg-white overflow-hidden">
                <div className="aspect-video bg-gdv-warm flex flex-col items-center justify-center text-gdv-brown-light">
                  <MapPin className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">Carte</p>
                  <p className="text-xs mt-1">Kaloum, Conakry, Guinée</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
