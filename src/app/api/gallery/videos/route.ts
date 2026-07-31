import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { galleryVideoSchema } from '@/lib/validations';

export async function GET() {
  try {
    const videos = await db.galleryVideo.findMany({ orderBy: { order: 'asc' } });
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
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery video:', error);
    return NextResponse.json({ error: 'Failed to create gallery video' }, { status: 500 });
  }
}
