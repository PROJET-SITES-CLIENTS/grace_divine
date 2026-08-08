import { db } from '@/lib/db';
import AboutPage from '@/components/gdv/pages/AboutPage';

export const revalidate = 60;

export default async function AboutRoute() {
  const [aboutData, teamData] = await Promise.all([
    db.aboutPage.findFirst().catch(() => null),
    db.teamMember.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return <AboutPage aboutData={aboutData as any} team={teamData as any} />;
}
