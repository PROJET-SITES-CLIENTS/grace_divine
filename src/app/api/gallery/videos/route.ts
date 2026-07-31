import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const videos = await db.galleryVideo.findMany({
      where: { visible: true },
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
    const video = await db.galleryVideo.create({ data: body });
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery video:', error);
    return NextResponse.json({ error: 'Failed to create gallery video' }, { status: 500 });
  }
}
