import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const video = await db.galleryVideo.update({
      where: { id },
      data: body,
    });
    revalidatePath('/', 'layout');
      return NextResponse.json(video);
  } catch (error) {
    console.error('Error updating gallery video:', error);
    return NextResponse.json({ error: 'Failed to update gallery video' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.galleryVideo.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery video:', error);
    return NextResponse.json({ error: 'Failed to delete gallery video' }, { status: 500 });
  }
}
