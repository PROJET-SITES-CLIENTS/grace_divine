'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight, Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedSection from '@/components/gdv/AnimatedSection';
import { IMAGES } from '@/lib/images';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  order: number;
}

interface GalleryVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  order: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/gallery/images').then((r) => r.json()),
      fetch('/api/gallery/videos').then((r) => r.json()),
    ])
      .then(([imgs, vids]) => {
        setImages(imgs || []);
        setVideos(vids || []);
      })
      .catch((err) => { console.error('Erreur galerie:', err); })
      .finally(() => setLoading(false));
  }, []);

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gdv-cream pt-20">
        <div className="w-10 h-10 rounded-full border-2 border-gdv-teal border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.galleryHero})` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/3 right-[10%] w-40 h-40 rounded-full bg-gdv-teal/10 blur-xl"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-gdv-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Notre Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-4"
          >
            Galerie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Découvrez nos plus belles destinations et moments
          </motion.p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="images" className="w-full">
            <AnimatedSection>
              <TabsList className="mx-auto flex w-fit bg-white border border-gdv-brown-pale/30 rounded-full p-1 mb-10">
                <TabsTrigger
                  value="images"
                  className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-gdv-teal data-[state=active]:text-white transition-all duration-200 flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Images ({images.length})
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-gdv-teal data-[state=active]:text-white transition-all duration-200 flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Vidéos ({videos.length})
                </TabsTrigger>
              </TabsList>
            </AnimatedSection>

            {/* Images Tab */}
            <TabsContent value="images">
              {images.length === 0 ? (
                <div className="text-center py-20">
                  <Camera className="w-16 h-16 text-gdv-brown-pale mx-auto mb-4" />
                  <p className="text-gdv-brown-light text-lg">Aucune image disponible pour le moment.</p>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
                >
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      variants={fadeInUp}
                      custom={index * 0.06}
                      className="break-inside-avoid cursor-pointer group"
                      onClick={() => setLightboxIndex(index)}
                    >
                      <div className="relative rounded-xl overflow-hidden bg-gdv-warm border border-gdv-brown-pale/20 hover:shadow-xl hover:shadow-gdv-teal/10 transition-all duration-300">
                        <img
                          src={image.url}
                          alt={image.title || 'Galerie'}
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {image.title && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white text-sm font-medium truncate">{image.title}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              {videos.length === 0 ? (
                <div className="text-center py-20">
                  <Video className="w-16 h-16 text-gdv-brown-pale mx-auto mb-4" />
                  <p className="text-gdv-brown-light text-lg">Aucune vidéo disponible pour le moment.</p>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      variants={fadeInUp}
                      custom={index * 0.08}
                      className="cursor-pointer group"
                      onClick={() => setVideoModal(video.url)}
                    >
                      <div className="relative rounded-xl overflow-hidden bg-gdv-warm border border-gdv-brown-pale/20 hover:shadow-xl hover:shadow-gdv-teal/10 transition-all duration-300 aspect-video">
                        <img
                          src={video.thumbnail || video.url}
                          alt={video.title || 'Vidéo'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                          <div className="w-16 h-16 rounded-full bg-gdv-teal/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Play className="w-7 h-7 text-white ml-1" />
                          </div>
                        </div>
                        {video.title && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white font-medium text-sm">{video.title}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
              onClick={() => setLightboxIndex(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 sm:inset-10 lg:inset-20 z-[101] flex items-center justify-center"
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Fermer la lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <img
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].title || 'Image'}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
              onClick={() => setVideoModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 sm:inset-10 lg:inset-20 z-[101] flex items-center justify-center"
            >
              <button
                onClick={() => setVideoModal(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                src={videoModal}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
