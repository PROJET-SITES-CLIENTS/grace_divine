import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { adSchema } from '@/lib/validations';

export async function GET() {
  try {
    const ads = await db.promotionalAd.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(ads);
  } catch (error) {
    console.error('Error fetching active ads:', error);
    return NextResponse.json({ error: 'Failed to fetch active ads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = adSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const ad = await db.promotionalAd.create({ data: validated.data });
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}
