import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { galleryImageSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';
    const images = await db.galleryImage.findMany({
      ...(showAll ? {} : { where: { visible: true } }),
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = galleryImageSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const image = await db.galleryImage.create({ data: validated.data });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}
