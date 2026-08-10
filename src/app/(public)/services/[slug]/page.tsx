import ServiceDetailPage from '@/components/gdv/pages/ServiceDetailPage';

export default async function ServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailPage slug={slug} />;
}
