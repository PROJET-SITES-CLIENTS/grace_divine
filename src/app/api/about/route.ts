import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { aboutPageSchema } from '@/lib/validations_extras';

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
    const validated = aboutPageSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    
    const existing = await db.aboutPage.findFirst();

    if (existing) {
      const updated = await db.aboutPage.update({
        where: { id: existing.id },
        data: validated.data,
      });
      return NextResponse.json(updated);
    } else {
      const created = await db.aboutPage.create({ data: validated.data });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    console.error('Error updating about page:', error);
    return NextResponse.json({ error: 'Failed to update about page' }, { status: 500 });
  }
}
