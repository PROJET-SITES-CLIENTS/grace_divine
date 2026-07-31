export const IMAGES = {
  // Hero / Accueil
  hero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/64015fc7592e.jpg',
  heroAlt: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f7c5a8d1d126.jpg',

  // Services
  serviceBillets: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ed74d41bfc9b.jpg',
  serviceVol: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/242ce26bd146.jpg',
  serviceVisa: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c337c3e787b0.jpg',
  serviceHotel: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c0da4fc58484.jpg',
  serviceAeroport: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c7fffd190841.jpg',
  serviceVoiture: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f4bf3a389b55.jpg',
  serviceFret: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e2ae5f2b5c12.jpg',

  // Pages
  aboutHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/122cabee16b0.jpg',
  servicesHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/242ce26bd146.jpg',
  galleryHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2c46e8ffe679.jpg',
  temoignagesHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/30704ff8f872.jpg',
  partenairesHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a864bf1d188c.jpg',
  faqHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/815211d0670f.png',
  contactHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7f15cf347eaf.jpg',
  recrutementHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/46f47a2f6b0b.jpg',
  equipeHero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/07cf3191b026.jpg',

  // CTA section
  ctaBg: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cafca0e6d4d2.jpg',
} as const;

// Slug-to-image mapping for services
export const SERVICE_IMAGE_MAP: Record<string, string> = {
  'vente-billets': IMAGES.serviceBillets,
  'reservation-vol': IMAGES.serviceVol,
  'assistance-visa': IMAGES.serviceVisa,
  'reservation-hotel': IMAGES.serviceHotel,
  'assistance-aeroportuaire': IMAGES.serviceAeroport,
  'location-vehicules': IMAGES.serviceVoiture,
  'fret-cargo': IMAGES.serviceFret,
};
