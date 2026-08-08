import { db } from '@/lib/db';
import TestimonialsPage from '@/components/gdv/pages/TestimonialsPage';

export const revalidate = 60;

export default async function TestimonialsRoute() {
  const testimonials = await db.testimonial.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []);

  return <TestimonialsPage testimonials={testimonials as any} />;
}
