import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const submission = await db.contactSubmission.update({
      where: { id },
      data: body,
    });
    revalidatePath('/', 'layout');
      return NextResponse.json(submission);
  } catch (error) {
    console.error('Error updating contact submission:', error);
    return NextResponse.json({ error: 'Failed to update contact submission' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.contactSubmission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    return NextResponse.json({ error: 'Failed to delete contact submission' }, { status: 500 });
  }
}
