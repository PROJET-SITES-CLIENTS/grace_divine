import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { jobSchema } from '@/lib/validations';

export async function GET() {
  try {
    const jobs = await db.jobListing.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = jobSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const job = await db.jobListing.create({ data: validated.data });
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
