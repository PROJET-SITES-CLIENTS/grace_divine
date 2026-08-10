import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { galleryVideoSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';
    const videos = await db.galleryVideo.findMany({
      ...(showAll ? {} : { where: { visible: true } }),
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching gallery videos:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = galleryVideoSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const video = await db.galleryVideo.create({ data: validated.data });
    revalidatePath('/', 'layout');
      return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery video:', error);
    return NextResponse.json({ error: 'Failed to create gallery video' }, { status: 500 });
  }
}
