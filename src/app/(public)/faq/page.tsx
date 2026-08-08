import { db } from '@/lib/db';
import FAQPage from '@/components/gdv/pages/FAQPage';

export const revalidate = 60;

export default async function FAQRoute() {
  const faqs = await db.fAQ.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []);

  return <FAQPage faqs={faqs as any} />;
}
