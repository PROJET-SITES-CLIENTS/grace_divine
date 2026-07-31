import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const sections = await db.homePageSection.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching home sections:', error);
    return NextResponse.json({ error: 'Failed to fetch home sections' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { sectionKey, ...fields } = await request.json();
    if (!sectionKey) {
      return NextResponse.json({ error: 'sectionKey is required' }, { status: 400 });
    }
    const section = await db.homePageSection.upsert({
      where: { sectionKey },
      update: fields,
      create: { sectionKey, ...fields },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating home section:', error);
    return NextResponse.json({ error: 'Failed to update home section' }, { status: 500 });
  }
}
