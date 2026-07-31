import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const visibilities = await db.pageVisibility.findMany({
      orderBy: { pageKey: 'asc' },
    });
    return NextResponse.json(visibilities);
  } catch (error) {
    console.error('Error fetching page visibilities:', error);
    return NextResponse.json({ error: 'Failed to fetch page visibilities' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { pageKey, visible } = await request.json();
    if (!pageKey) {
      return NextResponse.json({ error: 'pageKey is required' }, { status: 400 });
    }
    const updated = await db.pageVisibility.upsert({
      where: { pageKey },
      update: { visible },
      create: { pageKey, visible },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating page visibility:', error);
    return NextResponse.json({ error: 'Failed to update page visibility' }, { status: 500 });
  }
}
