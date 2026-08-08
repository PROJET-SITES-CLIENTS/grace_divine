import { db } from '@/lib/db';
import ServicesPage from '@/components/gdv/pages/ServicesPage';

export const revalidate = 60;

export default async function ServicesRoute() {
  const servicesData = await db.service.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []);

  return <ServicesPage services={servicesData as any} />;
}
