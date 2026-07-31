import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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
    const ad = await db.promotionalAd.create({ data: body });
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}
