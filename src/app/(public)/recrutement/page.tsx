import { db } from '@/lib/db';
import RecrutementPage from '@/components/gdv/pages/RecrutementPage';

export const revalidate = 60;

export default async function RecrutementRoute() {
  const jobs = await db.jobListing.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' } }).catch(() => []);

  return <RecrutementPage jobs={jobs as any} />;
}
