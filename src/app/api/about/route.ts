import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const about = await db.aboutPage.findFirst();
    return NextResponse.json(about ?? {});
  } catch (error) {
    console.error('Error fetching about page:', error);
    return NextResponse.json({ error: 'Failed to fetch about page' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existing = await db.aboutPage.findFirst();

    if (existing) {
      const updated = await db.aboutPage.update({
        where: { id: existing.id },
        data: body,
      });
      return NextResponse.json(updated);
    } else {
      const created = await db.aboutPage.create({ data: body });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    console.error('Error updating about page:', error);
    return NextResponse.json({ error: 'Failed to update about page' }, { status: 500 });
  }
}
