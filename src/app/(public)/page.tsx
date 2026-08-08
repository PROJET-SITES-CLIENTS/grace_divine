import { db } from '@/lib/db';
import HomePage from '@/components/gdv/pages/HomePage';

export const revalidate = 60; // Optionnel : ISR

export default async function Home() {
  const [
    servicesData,
    testimonialsData,
    homeSectionsData,
    adsData,
  ] = await Promise.all([
    db.service.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.testimonial.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.homePageSection.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    db.promotionalAd.findMany({ where: { active: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return (
    <HomePage
      services={servicesData as any}
      testimonials={testimonialsData as any}
      homeSections={homeSectionsData as any}
      ads={adsData as any}
    />
  );
}
