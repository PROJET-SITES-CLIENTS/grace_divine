import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { teamMemberSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // Admin route passes ?all=true to see everything (including hidden)
    const showAll = searchParams.get('all') === 'true';
    const members = await db.teamMember.findMany({
      ...(showAll ? {} : { where: { visible: true } }),
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = teamMemberSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const member = await db.teamMember.create({ data: validated.data });
    revalidatePath('/', 'layout');
      return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
