import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { siteSettingsSchema } from '@/lib/validations_extras';

export async function GET() {
  try {
    const settings = await db.siteSettings.findFirst();
    return NextResponse.json(settings ?? {});
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = siteSettingsSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const data = validated.data;
    const existing = await db.siteSettings.findFirst();

    if (existing) {
      const updated = await db.siteSettings.update({
        where: { id: existing.id },
        data: data,
      });
      return NextResponse.json(updated);
    } else {
      const created = await db.siteSettings.create({ data: data });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
