import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seeding...');

  // ===== SITE SETTINGS =====
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Grace Divine Voyage',
      slogan: 'Vous satisfaire est notre priorité',
      address: 'Kaloum Manque pas, Immeuble Yansané, Conakry, Guinée',
      phone1: '+224 627 10 46 46',
      phone2: '+224 627 10 49 49',
      whatsappNumber: '224627104646',
      email1: 'contact@gracedivinevoyage.net',
      email2: 'reservation@gracedivinevoyage.net',
      facebookUrl: 'https://facebook.com/gracedivinevoyage',
      instagramUrl: 'https://instagram.com/gracedivinevoyage',
    },
  });
  console.log('✅ Settings créés');

  // ===== PAGE VISIBILITY =====
  const pages = [
    { pageKey: 'accueil', title: 'Accueil', order: 0 },
    { pageKey: 'a-propos', title: 'À propos', order: 1 },
    { pageKey: 'services', title: 'Services', order: 2 },
    { pageKey: 'equipe', title: 'Notre Équipe', order: 3 },
    { pageKey: 'galerie', title: 'Galerie', order: 4 },
    { pageKey: 'temoignages', title: 'Témoignages', order: 5 },
    { pageKey: 'partenaires', title: 'Partenaires', order: 6 },
    { pageKey: 'faq', title: 'FAQ', order: 7 },
    { pageKey: 'recrutement', title: 'Recrutement', order: 8 },
    { pageKey: 'contact', title: 'Contact', order: 9 },
  ];

  for (const page of pages) {
    await prisma.pageVisibility.upsert({
      where: { pageKey: page.pageKey },
      update: {},
      create: { ...page, visible: true },
    });
  }
  console.log('✅ Pages créées');

  // ===== SERVICES =====
  const services = [
    {
      title: 'Billetterie Aérienne',
      slug: 'billetterie-aerienne',
      shortDesc: 'Réservation de vols sur toutes les compagnies aériennes au meilleur prix.',
      description: 'Nous vous proposons des billets d\'avion pour toutes les destinations du monde, avec les meilleures compagnies aériennes. Notre équipe vous aide à trouver le meilleur rapport qualité/prix.',
      icon: 'Plane',
      features: JSON.stringify(['Vols intérieurs et internationaux', 'Toutes classes disponibles', 'Meilleurs tarifs garantis', 'Assistance 24h/24']),
      order: 0,
    },
    {
      title: 'Visa & Passeport',
      slug: 'visa-passeport',
      shortDesc: 'Assistance complète pour l\'obtention de vos visas et passeports.',
      description: 'Nous vous accompagnons dans toutes les démarches administratives pour l\'obtention de vos visas et passeports. Notre expertise garantit un traitement rapide et efficace de votre dossier.',
      icon: 'FileText',
      features: JSON.stringify(['Visa touristique', 'Visa d\'affaires', 'Passeport ordinaire et diplomatique', 'Suivi de dossier en temps réel']),
      order: 1,
    },
    {
      title: 'Hôtels & Hébergements',
      slug: 'hotels-hebergements',
      shortDesc: 'Réservation d\'hôtels dans le monde entier à des tarifs compétitifs.',
      description: 'Des palaces aux maisons d\'hôtes, nous vous proposons une large gamme d\'hébergements pour tous les budgets et toutes les destinations.',
      icon: 'Building',
      features: JSON.stringify(['Hôtels 1 à 5 étoiles', 'Appartements et villas', 'Réservation flexible', 'Annulation gratuite']),
      order: 2,
    },
    {
      title: 'Voyages Organisés',
      slug: 'voyages-organises',
      shortDesc: 'Circuits touristiques clés en main pour des destinations de rêve.',
      description: 'Laissez-vous guider par nos experts et découvrez le monde en toute sérénité. Nos circuits tout inclus vous garantissent une expérience inoubliable.',
      icon: 'MapPin',
      features: JSON.stringify(['Circuits tout inclus', 'Guide francophone', 'Transport inclus', 'Assurance voyage']),
      order: 3,
    },
    {
      title: 'Pèlerinage (Omra & Hajj)',
      slug: 'pelerinage-omra-hajj',
      shortDesc: 'Forfaits pèlerinage pour la Omra et le Hajj, tout inclus.',
      description: 'Nous organisons vos voyages spirituels vers les Lieux Saints de l\'Islam. Nos forfaits Omra et Hajj sont complets et soigneusement préparés pour vous offrir une expérience sereine.',
      icon: 'Star',
      features: JSON.stringify(['Visa pèlerinage', 'Hébergement à La Mecque et Médine', 'Transport inclus', 'Accompagnement spirituel']),
      order: 4,
    },
    {
      title: 'Transferts & Location',
      slug: 'transferts-location',
      shortDesc: 'Location de véhicules et transferts aéroport dans le monde entier.',
      description: 'Profitez de nos services de transfert aéroport et de location de voitures pour vous déplacer en toute liberté et en toute sécurité.',
      icon: 'Car',
      features: JSON.stringify(['Transfert aéroport', 'Location avec chauffeur', 'Location sans chauffeur', 'Véhicules de luxe disponibles']),
      order: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: { ...service, visible: true },
    });
  }
  console.log('✅ Services créés');

  // ===== TEAM MEMBERS =====
  const team = [
    { name: 'Mamadou Diallo', role: 'Directeur Général', bio: 'Fort de 15 ans d\'expérience dans le secteur du tourisme, Mamadou dirige Grace Divine Voyage avec passion et vision.', order: 0 },
    { name: 'Fatoumata Camara', role: 'Responsable Billetterie', bio: 'Experte en billetterie aérienne, Fatoumata assure les meilleures offres pour nos clients depuis plus de 8 ans.', order: 1 },
    { name: 'Ibrahim Bah', role: 'Conseiller Voyage', bio: 'Passionné de voyage, Ibrahim accompagne nos clients dans la conception de leurs itinéraires sur mesure.', order: 2 },
    { name: 'Aissatou Barry', role: 'Responsable Visa', bio: 'Spécialiste des procédures consulaires, Aissatou traite vos dossiers visa avec rapidité et efficacité.', order: 3 },
  ];

  for (const member of team) {
    await prisma.teamMember.create({ data: { ...member, visible: true } }).catch(() => {});
  }
  console.log('✅ Équipe créée');

  // ===== TESTIMONIALS =====
  const testimonials = [
    { name: 'Aminata Kouyaté', role: 'Cliente fidèle', content: 'Service exceptionnel ! Grace Divine Voyage m\'a organisé un voyage inoubliable à Dubaï. Tout était parfait, du billet à l\'hôtel.', rating: 5, order: 0 },
    { name: 'Sekou Touré', role: 'Homme d\'affaires', content: 'Je fais confiance à Grace Divine pour tous mes déplacements professionnels. Réactifs, professionnels et aux meilleurs prix !', rating: 5, order: 1 },
    { name: 'Mariama Sylla', role: 'Cliente', content: 'Mon pèlerinage pour la Omra était parfaitement organisé. Aucun stress, tout a été pris en charge. Je recommande vivement !', rating: 5, order: 2 },
    { name: 'Alpha Baldé', role: 'Étudiant', content: 'Ils m\'ont aidé à obtenir mon visa étudiant rapidement. Un service rapide et efficace, le personnel est très sympathique.', rating: 4, order: 3 },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: { ...testimonial, visible: true } }).catch(() => {});
  }
  console.log('✅ Témoignages créés');

  // ===== FAQ =====
  const faqs = [
    { question: 'Comment réserver un billet d\'avion ?', answer: 'Contactez-nous par téléphone, WhatsApp ou via notre formulaire de contact. Notre équipe vous répondra dans les plus brefs délais pour vous proposer les meilleures offres.', category: 'Billetterie', order: 0 },
    { question: 'Quels sont vos délais pour l\'obtention d\'un visa ?', answer: 'Les délais varient selon le pays de destination. En général, comptez entre 5 et 15 jours ouvrables. Nous vous informons du délai précis lors de la soumission de votre dossier.', category: 'Visa', order: 1 },
    { question: 'Proposez-vous des forfaits tout inclus ?', answer: 'Oui, nous proposons des forfaits complets incluant le vol, l\'hôtel, les transferts et parfois les repas selon la destination choisie.', category: 'Voyages', order: 2 },
    { question: 'Comment se déroule le pèlerinage Omra avec vous ?', answer: 'Nos forfaits Omra incluent le visa pèlerinage, les billets d\'avion, l\'hébergement à La Mecque et Médine, les transferts et un accompagnateur spirituel pour toute la durée du séjour.', category: 'Pèlerinage', order: 3 },
    { question: 'Acceptez-vous les paiements échelonnés ?', answer: 'Oui, nous proposons des facilités de paiement selon le montant du voyage. Renseignez-vous auprès de notre équipe pour les modalités disponibles.', category: 'Paiement', order: 4 },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: { ...faq, visible: true } }).catch(() => {});
  }
  console.log('✅ FAQ créée');

  // ===== PARTNERS =====
  const partners = [
    { name: 'Air France', website: 'https://airfrance.com', order: 0 },
    { name: 'Turkish Airlines', website: 'https://turkishairlines.com', order: 1 },
    { name: 'Royal Air Maroc', website: 'https://royalairmaroc.com', order: 2 },
    { name: 'Ethiopian Airlines', website: 'https://ethiopianairlines.com', order: 3 },
    { name: 'Emirates', website: 'https://emirates.com', order: 4 },
  ];

  for (const partner of partners) {
    await prisma.partner.create({ data: { ...partner, visible: true } }).catch(() => {});
  }
  console.log('✅ Partenaires créés');

  // ===== HOME SECTIONS =====
  const homeSections = [
    { sectionKey: 'hero', title: 'Votre Agence de Voyage de Confiance', subtitle: 'Découvrez le monde avec Grace Divine Voyage', content: 'Billetterie, visas, hôtels, voyages organisés et pèlerinage — tout ce dont vous avez besoin pour voyager en toute sérénité.', order: 0 },
    { sectionKey: 'about', title: 'Qui sommes-nous ?', subtitle: 'Une agence dédiée à vos voyages depuis 2010', content: 'Grace Divine Voyage est une agence de voyage implantée en Guinée, spécialisée dans la billetterie aérienne, l\'organisation de voyages, l\'obtention de visas et le pèlerinage.', order: 1 },
    { sectionKey: 'why-us', title: 'Pourquoi nous choisir ?', subtitle: 'Notre engagement envers vous', content: 'Professionnalisme, réactivité et meilleurs prix garantis. Nous vous accompagnons à chaque étape de votre voyage.', order: 2 },
  ];

  for (const section of homeSections) {
    await prisma.homePageSection.upsert({
      where: { sectionKey: section.sectionKey },
      update: {},
      create: { ...section, visible: true },
    });
  }
  console.log('✅ Sections accueil créées');

  // ===== ABOUT PAGE =====
  await prisma.aboutPage.create({
    data: {
      heroTitle: 'À propos de Grace Divine Voyage',
      heroSubtitle: 'Votre partenaire de confiance pour tous vos voyages',
      mission: 'Notre mission est de rendre le voyage accessible à tous les Guinéens, en proposant des services de qualité au meilleur prix.',
      vision: 'Devenir l\'agence de voyage de référence en Guinée et en Afrique de l\'Ouest.',
      story: 'Fondée en 2010 à Conakry, Grace Divine Voyage a débuté comme une petite agence de billetterie. Grâce à la confiance de nos clients et au professionnalisme de notre équipe, nous avons su nous développer pour proposer une gamme complète de services touristiques.',
      values: JSON.stringify(['Intégrité', 'Professionnalisme', 'Réactivité', 'Excellence', 'Confiance']),
    },
  }).catch(() => {});
  console.log('✅ Page À propos créée');

  console.log('\n🎉 Seeding terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur de seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
