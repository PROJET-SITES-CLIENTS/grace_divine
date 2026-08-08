import ServiceDetailPage from '@/components/gdv/pages/ServiceDetailPage';

export default function ServiceRoute({ params }: { params: { slug: string } }) {
  return <ServiceDetailPage slug={params.slug} />;
}
