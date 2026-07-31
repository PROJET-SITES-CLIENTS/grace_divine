#!/usr/bin/env python3
"""
Fix script 4: Zod validation for remaining API routes (team, testimonials, partners, faq, gallery, jobs)
And fix favicon reference in layout.
"""
import os

BASE = "/home/z/my-project"

def read_file(path):
    with open(path, "r") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w") as f:
        f.write(content)

def fix_count(label):
    print(f"  [FIXED] {label}")

print("=" * 60)
print("FIX SCRIPT 4 - Remaining API Zod validation")
print("=" * 60)

# ============================================================
# Team API
# ============================================================
print("\n[C2] Adding Zod to Team API...")
path = f"{BASE}/src/app/api/team/route.ts"
content = read_file(path)
if 'zod' not in content and 'validation' not in content:
    content = """import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { teamMemberSchema } from '@/lib/validations';

export async function GET() {
  try {
    const members = await db.teamMember.findMany({ orderBy: { order: 'asc' } });
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
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
"""
    write_file(path, content)
    fix_count("Team API route now uses Zod validation")

# ============================================================
# Testimonials API
# ============================================================
print("\n[C2] Adding Zod to Testimonials API...")
path = f"{BASE}/src/app/api/testimonials/route.ts"
content = read_file(path)
if 'zod' not in content and 'validation' not in content:
    content = """import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { testimonialSchema } from '@/lib/validations';

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = testimonialSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const testimonial = await db.testimonial.create({ data: validated.data });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
"""
    write_file(path, content)
    fix_count("Testimonials API route now uses Zod validation")

# ============================================================
# Partners API
# ============================================================
print("\n[C2] Adding Zod to Partners API...")
path = f"{BASE}/src/app/api/partners/route.ts"
content = read_file(path)
if 'zod' not in content and 'validation' not in content:
    content = """import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { partnerSchema } from '@/lib/validations';

export async function GET() {
  try {
    const partners = await db.partner.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = partnerSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const partner = await db.partner.create({ data: validated.data });
    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
"""
    write_file(path, content)
    fix_count("Partners API route now uses Zod validation")

# ============================================================
# FAQ API
# ============================================================
print("\n[C2] Adding Zod to FAQ API...")
path = f"{BASE}/src/app/api/faq/route.ts"
content = read_file(path)
if 'zod' not in content and 'validation' not in content:
    content = """import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { faqSchema } from '@/lib/validations';

export async function GET() {
  try {
    const faqs = await db.fAQ.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = faqSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const faq = await db.fAQ.create({ data: validated.data });
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
"""
    write_file(path, content)
    fix_count("FAQ API route now uses Zod validation")

# ============================================================
# Jobs API
# ============================================================
print("\n[C2] Adding Zod to Jobs API...")
path = f"{BASE}/src/app/api/jobs/route.ts"
content = read_file(path)
if 'zod' not in content and 'validation' not in content:
    content = """import { db } from '@/lib/db';
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
"""
    write_file(path, content)
    fix_count("Jobs API route now uses Zod validation")

# ============================================================
# Gallery Images API
# ============================================================
print("\n[C2] Adding Zod to Gallery Images API...")
path = f"{BASE}/src/app/api/gallery/images/route.ts"
content = read_file(path)
if 'zod' not in content and 'validation' not in content:
    content = """import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { galleryImageSchema } from '@/lib/validations';

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = galleryImageSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const image = await db.galleryImage.create({ data: validated.data });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}
"""
    write_file(path, content)
    fix_count("Gallery Images API route now uses Zod validation")

# ============================================================
# Gallery Videos API
# ============================================================
print("\n[C2] Adding Zod to Gallery Videos API...")
path = f"{BASE}/src/app/api/gallery/videos/route.ts"
content = read_file(path)
if 'zod' not in content and 'validation' not in content:
    content = """import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { galleryVideoSchema } from '@/lib/validations';

export async function GET() {
  try {
    const videos = await db.galleryVideo.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching gallery videos:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = galleryVideoSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten().fieldErrors }, { status: 400 });
    }
    const video = await db.galleryVideo.create({ data: validated.data });
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery video:', error);
    return NextResponse.json({ error: 'Failed to create gallery video' }, { status: 500 });
  }
}
"""
    write_file(path, content)
    fix_count("Gallery Videos API route now uses Zod validation")

# ============================================================
# M6: Fix favicon reference in layout
# ============================================================
print("\n[M6] Updating favicon reference in layout...")
path = f"{BASE}/src/app/layout.tsx"
content = read_file(path)
content = content.replace(
    'icon: "/favicon.ico",',
    'icon: [\n    { url: "/favicon.svg", type: "image/svg+xml" },\n  ],'
)
write_file(path, content)
fix_count("Layout now references favicon.svg")

print("\n" + "=" * 60)
print("SCRIPT 4 COMPLETE")
print("=" * 60)
