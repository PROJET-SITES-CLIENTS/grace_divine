import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  // Site Settings
  await db.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      siteName: 'Grace Divine Voyage',
      slogan: 'Vous satisfaire est notre priorité',
      address: 'Kaloum Manque pas, Immeuble Yansané',
      phone1: '+224627104646',
      phone2: '+224627104949',
      email1: 'contact@gracedivinevoyage.net',
      whatsappNumber: '224627104646',
      facebookUrl: 'https://facebook.com/gracedivinevoyage',
      instagramUrl: 'https://instagram.com/gracedivinevoyage',
      tiktokUrl: 'https://tiktok.com/@gracedivinevoyage',
    }
  })

  // Page Visibility
  const pages = [
    { pageKey: 'accueil', title: 'Accueil', visible: true, order: 0 },
    { pageKey: 'a-propos', title: 'À propos', visible: true, order: 1 },
    { pageKey: 'services', title: 'Services', visible: true, order: 2 },
    { pageKey: 'galerie', title: 'Galerie', visible: true, order: 3 },
    { pageKey: 'temoignages', title: 'Témoignages', visible: true, order: 4 },
    { pageKey: 'partenaires', title: 'Partenaires', visible: true, order: 5 },
    { pageKey: 'faq', title: 'FAQ', visible: true, order: 6 },
    { pageKey: 'recrutement', title: 'Recrutement', visible: true, order: 7 },
    { pageKey: 'equipe', title: 'Équipe', visible: true, order: 8 },
    { pageKey: 'contact', title: 'Contact', visible: true, order: 9 },
  ]
  for (const p of pages) {
    await db.pageVisibility.upsert({ where: { pageKey: p.pageKey }, update: {}, create: p })
  }

  // Services
  const services = [
    {
      title: 'Vente de Billets',
      slug: 'vente-billets',
      shortDesc: 'Des billets d\'avion aux meilleurs prix pour toutes vos destinations.',
      description: 'Grace Divine Voyage vous propose une large gamme de billets d\'avion vers les meilleures destinations du monde. Que vous voyagiez pour affaires ou pour le loisir, nous trouvons toujours les offres les plus compétitives du marché. Notre équipe d\'experts compare les tarifs de multiples compagnies aériennes pour vous garantir le meilleur rapport qualité-prix. Nous prenons en charge les réservations pour les vols domestiques, régionaux et internationaux, avec des options flexibles adaptées à votre budget et vos contraintes de temps.',
      icon: 'Ticket',
      features: JSON.stringify(['Vols domestiques et internationaux', 'Comparaison de prix multi-compagnies', 'Options de paiement flexibles', 'Assistance après-vente', 'Modification et annulation faciles', 'Tarifs négociés exclusifs']),
      order: 0
    },
    {
      title: 'Réservation de Vol',
      slug: 'reservation-vol',
      shortDesc: 'Réservez vos vols en toute simplicité avec notre service personnalisé.',
      description: 'Notre service de réservation de vol est conçu pour vous offrir une expérience sans stress. De la recherche à la confirmation, nous vous accompagnons à chaque étape. Nos conseillers spécialisés analysent vos besoins spécifiques — dates de voyage préférentielles, escales acceptées, classe de cabine — pour vous proposer les itinéraires les mieux adaptés. Nous gérons également les réservations de groupe pour les entreprises et les voyages familiaux avec des tarifs dégressifs intéressants.',
      icon: 'Plane',
      features: JSON.stringify(['Recherche personnalisée d\'itinéraires', 'Réservation de groupe', 'Gestion des escales et correspondances', 'Choix de la classe de cabine', 'Confirmation instantanée', 'Suivi en temps réel du vol']),
      order: 1
    },
    {
      title: 'Assistance Visa',
      slug: 'assistance-visa',
      shortDesc: 'Un accompagnement complet pour l\'obtention de votre visa.',
      description: 'L\'obtention d\'un visa peut être un processus complexe et stressant. Chez Grace Divine Voyage, nous simplifions cette démarche en vous fournissant un accompagnement complet. Nos experts connaissent les exigences spécifiques de chaque pays et vous guident dans la préparation de votre dossier. De la collecte des documents à la soumission auprès des ambassades et consulats, nous nous assurons que chaque étape est traitée avec la plus grande rigueur pour maximiser vos chances d\'obtention.',
      icon: 'Passport',
      features: JSON.stringify(['Conseil sur les exigences documentaires', 'Préparation et vérification du dossier', 'Suivi du processus de demande', 'Assistance pour les entretiens', 'Visa express disponible', 'Service pour tous les types de visa']),
      order: 2
    },
    {
      title: 'Réservation d\'Hôtel',
      slug: 'reservation-hotel',
      shortDesc: 'Trouvez l\'hébergement parfait parmi notre vaste réseau de partenaires.',
      description: 'Grace Divine Voyage collabore avec un vaste réseau d\'hôtels, de resorts et de logements à travers le monde pour vous offrir le meilleur hébergement quel que soit votre budget. Des hôtels de luxe aux options économiques, nous avons la solution idéale pour chaque voyageur. Notre équipe sélectionne minutieusement chaque établissement pour garantir des standards de qualité élevés. Profitez de nos tarifs négociés et d\'avantages exclusifs comme des surclassements gratuits, des petits-déjeuners inclus et des arrivées anticipées.',
      icon: 'Hotel',
      features: JSON.stringify(['Réseau mondial de partenaires', 'Tarifs négociés exclusifs', 'Hôtels, resorts et appartements', 'Surclassements et avantages VIP', 'Annulation gratuite sur certaines options', 'Service client 24h/24']),
      order: 3
    },
    {
      title: 'Assistance Aéroportuaire',
      slug: 'assistance-aeroportuaire',
      shortDesc: 'Un service d\'assistance complet pour un voyage sans stress.',
      description: 'L\'assistance aéroportuaire de Grace Divine Voyage transforme votre expérience de voyage dès votre arrivée à l\'aéroport. Nos agents expérimentés vous accueillent, vous aident avec vos formalités d\'enregistrement, de bagages et de douane, et vous accompagnent jusqu\'à votre véhicule de transfert. Ce service est particulièrement apprécié des voyageurs d\'affaires, des familles avec enfants et des personnes âgées. Nous assurons également un service de fast-track pour un passage accéléré aux contrôles de sécurité et à l\'immigration.',
      icon: 'ShieldCheck',
      features: JSON.stringify(['Accueil personnalisé à l\'aéroport', 'Aide aux formalités d\'enregistrement', 'Service fast-track', 'Assistance bagages', 'Accompagnement douane et immigration', 'Transfert vers l\'hébergement']),
      order: 4
    },
    {
      title: 'Location de Véhicules',
      slug: 'location-vehicules',
      shortDesc: 'Louez le véhicule idéal pour vos déplacements en toute liberté.',
      description: 'Que vous ayez besoin d\'une voiture économique pour la ville, d\'un SUV pour une aventure ou d\'un véhicule de luxe pour une occasion spéciale, Grace Divine Voyage a la solution. Nous collaborons avec les plus grandes agences de location de véhicules pour vous offrir un choix étendu et des tarifs compétitifs. Chaque véhicule est entretenu selon les standards les plus élevés et dispose d\'une assurance complète. Nos options incluent la livraison et la récupération du véhicule à l\'aéroport, à votre hôtel ou à toute autre adresse de votre choix.',
      icon: 'Car',
      features: JSON.stringify(['Large gamme de véhicules', 'Livraison à l\'aéroport ou à l\'hôtel', 'Assurance tous risques incluse', 'GPS et sièges auto disponibles', 'Tarifs journaliers et mensuels', 'Service de chauffeur privé']),
      order: 5
    },
    {
      title: 'Fret & Cargo',
      slug: 'fret-cargo',
      shortDesc: 'Des solutions de fret fiables pour vos envois nationaux et internationaux.',
      description: 'Le service fret et cargo de Grace Divine Voyage offre des solutions logistiques complètes pour l\'envoi de marchandises à travers le monde. Que vous ayez besoin d\'expédier des colis, des documents importants ou des cargaisons volumineuses, nous disposons de l\'expertise et du réseau nécessaires pour garantir une livraison rapide et sécurisée. Nous gérons toutes les formalités douanières et offrons un suivi en temps réel de vos envois. Nos tarifs sont compétitifs et adaptés à tous les volumes, des petits colis aux conteneurs complets.',
      icon: 'Package',
      features: JSON.stringify(['Envois nationaux et internationaux', 'Gestion des formalités douanières', 'Suivi en temps réel', 'Tarifs adaptés à tous les volumes', 'Livraison express disponible', 'Assurance marchandises']),
      order: 6
    },
  ]
  for (const s of services) {
    await db.service.upsert({ where: { slug: s.slug }, update: {}, create: s })
  }

  // Team Members
  const team = [
    { name: 'Directeur Général', role: 'Fondateur & CEO', bio: 'Visionnaire passionné par le secteur du voyage avec plus de 15 ans d\'expérience dans l\'industrie touristique.', order: 0 },
    { name: 'Responsable Commercial', role: 'Directeur Commercial', bio: 'Expert en relations client et négociation, il veille à offrir les meilleures offres à nos clients.', order: 1 },
    { name: 'Conseillère Voyage', role: 'Conseillère Spécialisée', bio: 'Spécialiste des destinations africaines et européennes, elle accompagne nos clients dans la planification de leurs voyages.', order: 2 },
    { name: 'Assistance Client', role: 'Responsable Support', bio: 'Dédiée à la satisfaction client, elle assure un suivi rigoureux de chaque dossier.', order: 3 },
  ]
  for (const t of team) {
    await db.teamMember.create({ data: t })
  }

  // Testimonials
  const testimonials = [
    { name: 'Mamadou Diallo', role: 'Homme d\'affaires', content: 'Grace Divine Voyage a transformé mes déplacements professionnels. Leur service de réservation de vol est exceptionnel et toujours ponctuel. Je recommande vivement cette agence à tous les entrepreneurs.', rating: 5, order: 0 },
    { name: 'Aissatou Bah', role: 'Étudiante', content: 'Grâce à leur assistance visa, j\'ai pu obtenir mon visa étudiant en un temps record. L\'équipe est très professionnelle et disponible. Un grand merci !', rating: 5, order: 1 },
    { name: 'Ibrahima Condé', role: 'Directeur d\'entreprise', content: 'Nous faisons appel à Grace Divine Voyage pour tous nos déplacements d\'affaires. Leur service est fiable, rapide et les tarifs sont très compétitifs. Un partenaire de confiance.', rating: 5, order: 2 },
    { name: 'Fatoumata Touré', role: 'Famille voyageuse', content: 'Notre voyage familial a été parfaitement organisé de A à Z. La réservation d\'hôtel et l\'assistance aéroportuaire ont fait toute la différence. Merci Grace Divine !', rating: 4, order: 3 },
  ]
  for (const t of testimonials) {
    await db.testimonial.create({ data: t })
  }

  // Partners
  const partners = [
    { name: 'Air France', website: 'https://www.airfrance.com', order: 0 },
    { name: 'Ethiopian Airlines', website: 'https://www.ethiopianairlines.com', order: 1 },
    { name: 'Royal Air Maroc', website: 'https://www.royalairmaroc.com', order: 2 },
    { name: 'Turkish Airlines', website: 'https://www.turkishairlines.com', order: 3 },
    { name: 'Emirates', website: 'https://www.emirates.com', order: 4 },
  ]
  for (const p of partners) {
    await db.partner.create({ data: p })
  }

  // FAQ
  const faqs = [
    { question: 'Comment réserver un vol ?', answer: 'Vous pouvez réserver un vol en nous contactant directement par téléphone, par email ou en remplissant le formulaire de contact sur notre site. Notre équipe vous répondra dans les plus brefs délais avec les meilleures offres disponibles.', category: 'Réservation', order: 0 },
    { question: 'Quels documents sont nécessaires pour obtenir un visa ?', answer: 'Les documents nécessaires varient selon le pays de destination. Généralement, vous aurez besoin d\'un passeport valide d\'au moins 6 mois, de photos d\'identité, d\'une lettre de motivation, de justificatifs de ressources financières et d\'un billet d\'avion. Contactez-nous pour obtenir la liste complète spécifique à votre destination.', category: 'Visa', order: 1 },
    { question: 'Proposez-vous des vols pour les groupes ?', answer: 'Oui, nous proposons des tarifs spéciaux pour les réservations de groupe. Que ce soit pour des voyages d\'affaires, des voyages scolaires ou des événements familiaux, nous négocions les meilleurs tarifs auprès des compagnies aériennes. Contactez-nous pour obtenir un devis personnalisé.', category: 'Réservation', order: 2 },
    { question: 'Comment puis-je annuler ou modifier ma réservation ?', answer: 'Les conditions d\'annulation et de modification dépendent du type de billet acheté et de la politique de la compagnie aérienne. Contactez-nous dès que possible et nous ferons le nécessaire pour vous aider dans vos démarches.', category: 'Réservation', order: 3 },
    { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Nous acceptons les paiements par virement bancaire, par Mobile Money (Orange Money, MTN Money) et par espèces à notre agence. Les détails vous seront communiqués lors de la confirmation de votre réservation.', category: 'Paiement', order: 4 },
    { question: 'Proposez-vous une assurance voyage ?', answer: 'Oui, nous proposons des solutions d\'assurance voyage adaptées à vos besoins. Que vous voyagiez pour affaires ou pour le loisir, nous avons une couverture appropriée. Demandez-nous plus d\'informations lors de votre réservation.', category: 'Assurance', order: 5 },
  ]
  for (const f of faqs) {
    await db.fAQ.create({ data: f })
  }

  // About Page
  await db.aboutPage.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      heroTitle: 'À propos de Grace Divine Voyage',
      heroSubtitle: 'Votre partenaire de confiance pour des voyages inoubliables',
      mission: 'Notre mission est de rendre les voyages accessibles, agréables et mémorables pour chaque client. Nous nous engageons à fournir un service d\'excellence, des tarifs compétitifs et un accompagnement personnalisé à chaque étape de votre parcours.',
      vision: 'Devenir l\'agence de voyage de référence en Guinée et en Afrique de l\'Ouest, reconnue pour la qualité de ses services, son innovation et sa capacité à dépasser les attentes de ses clients.',
      values: JSON.stringify(['Excellence', 'Intégrité', 'Innovation', 'Service client', 'Fiabilité', 'Engagement']),
      story: 'Fondée avec la passion du voyage et le désir de servir, Grace Divine Voyage est née de la conviction que chaque voyageur mérite une expérience exceptionnelle. Depuis notre siège situé à Kaloum, au cœur de Conakry, nous avons accompagné des centaines de voyageurs — hommes d\'affaires, étudiants, familles — dans leurs projets de voyage à travers le monde. Notre équipe de professionnels dévoués met son expertise au service de votre satisfaction, car chez Grace Divine Voyage, vous satisfaire n\'est pas seulement notre slogan, c\'est notre priorité absolue.',
    }
  })

  // Home Page Sections
  const homeSections = [
    { sectionKey: 'hero', title: 'Découvrez le Monde', subtitle: 'Votre agence de voyage de confiance en Guinée', content: 'Grace Divine Voyage vous accompagne dans tous vos projets de voyage avec professionnalisme et passion.', order: 0 },
    { sectionKey: 'services-intro', title: 'Nos Services', subtitle: 'Des solutions complètes pour tous vos besoins de voyage', order: 1 },
    { sectionKey: 'why-choose-us', title: 'Pourquoi Nous Choisir ?', subtitle: 'L\'excellence au service de votre voyage', content: 'Plus de 15 ans d\'expérience, un réseau mondial de partenaires et une équipe dévouée à votre satisfaction.', order: 2 },
    { sectionKey: 'cta-section', title: 'Prêt à Voyager ?', subtitle: 'Contactez-nous dès maintenant et laissez-nous organiser votre prochain voyage', order: 3 },
  ]
  for (const s of homeSections) {
    await db.homePageSection.upsert({ where: { sectionKey: s.sectionKey }, update: {}, create: s })
  }

  // Job Listings
  const jobs = [
    {
      title: 'Agent de Voyage',
      description: 'Nous recherchons un agent de voyage expérimenté pour rejoindre notre équipe. Le candidat idéal maîtrise les systèmes de réservation et possède une excellente connaissance des destinations.',
      requirements: '3+ ans d\'expérience en agence de voyage, Maîtrise d\'un système de réservation (Amadeus, Sabre), Excellente communication, Bilingue français/anglais',
      location: 'Conakry, Guinée',
      type: 'CDI',
    },
    {
      title: 'Assistante Administrative',
      description: 'Poste d\'assistante administrative pour la gestion du back-office et l\'accueil des clients.',
      requirements: 'Bac+2 en administration ou gestion, Maîtrise des outils bureautiques, Excellente présentation, Organisée et rigoureuse',
      location: 'Conakry, Guinée',
      type: 'CDI',
    },
  ]
  for (const j of jobs) {
    await db.jobListing.create({ data: j })
  }

  console.log('✅ Seed completed successfully!')
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect())
