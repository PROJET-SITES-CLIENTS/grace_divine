import { db } from '@/lib/db';
import PartnersPage from '@/components/gdv/pages/PartnersPage';

export const revalidate = 60;

export default async function PartnersRoute() {
  const partners = await db.partner.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []);

  return <PartnersPage partners={partners as any} />;
}
