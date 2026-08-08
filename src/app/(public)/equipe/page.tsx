import { db } from '@/lib/db';
import TeamPage from '@/components/gdv/pages/TeamPage';

export const revalidate = 60;

export default async function TeamRoute() {
  const team = await db.teamMember.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []);

  return <TeamPage team={team as any} />;
}
