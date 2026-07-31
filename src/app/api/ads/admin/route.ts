import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ads = await db.promotionalAd.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(ads);
  } catch (error) {
    console.error('Error fetching all ads:', error);
    return NextResponse.json({ error: 'Failed to fetch all ads' }, { status: 500 });
  }
}
