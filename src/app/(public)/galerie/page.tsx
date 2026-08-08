import { db } from '@/lib/db';
import GalleryPage from '@/components/gdv/pages/GalleryPage';

export const revalidate = 60;

export default async function GalleryRoute() {
  const [images, videos] = await Promise.all([
    db.galleryImage.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.galleryVideo.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return <GalleryPage initialImages={images as any} initialVideos={videos as any} />;
}
