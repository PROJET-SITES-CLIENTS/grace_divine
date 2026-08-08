import { db } from '@/lib/db';
import ContactPage from '@/components/gdv/pages/ContactPage';

export const revalidate = 60;

export default async function ContactRoute() {
  const [settingsData, servicesData] = await Promise.all([
    db.siteSettings.findFirst().catch(() => null),
    db.service.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return <ContactPage settings={settingsData as any} services={servicesData as any} />;
}
