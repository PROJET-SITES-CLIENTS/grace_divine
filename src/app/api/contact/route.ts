import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch contact submissions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const submission = await db.contactSubmission.create({ data: validated.data });
    revalidatePath('/', 'layout');
      return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return NextResponse.json({ error: 'Failed to create contact submission' }, { status: 500 });
  }
}
