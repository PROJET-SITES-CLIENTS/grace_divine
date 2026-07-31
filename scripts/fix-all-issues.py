#!/usr/bin/env python3
"""
Comprehensive fix script for all identified issues in Grace Divine Voyage.
This script patches files in-place.
"""
import re

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
print("GRACE DIVINE VOYAGE - COMPREHENSIVE FIX SCRIPT")
print("=" * 60)

# ============================================================
# C3: Fix SERVICE_IMAGE_MAP slug mismatch
# ============================================================
print("\n[C3] Fixing SERVICE_IMAGE_MAP slug mismatch...")
path = f"{BASE}/src/lib/images.ts"
content = read_file(path)
old_map = """  'visa': IMAGES.serviceVisa,
  'hebergement': IMAGES.serviceHotel,
  'transfert-aeroport': IMAGES.serviceAeroport,
  'location-voiture': IMAGES.serviceVoiture,
  'fret': IMAGES.serviceFret,"""
new_map = """  'assistance-visa': IMAGES.serviceVisa,
  'reservation-hotel': IMAGES.serviceHotel,
  'assistance-aeroportuaire': IMAGES.serviceAeroport,
  'location-vehicules': IMAGES.serviceVoiture,
  'fret-cargo': IMAGES.serviceFret,"""
content = content.replace(old_map, new_map)
write_file(path, content)
fix_count("SERVICE_IMAGE_MAP slugs now match database")

# ============================================================
# C4: Fix upload route - add file type/size validation
# ============================================================
print("\n[C4] Fixing upload route validation...")
path = f"{BASE}/src/app/api/upload/route.ts"
content = read_file(path)
new_upload = r"""import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm', '.pdf', '.doc', '.docx'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'video/mp4', 'video/webm',
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `Fichier trop volumineux (max ${MAX_FILE_SIZE / 1024 / 1024}MB)` }, { status: 400 });
    }

    // Validate file extension
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: `Type de fichier non autorise: ${ext}` }, { status: 400 });
    }

    // Validate MIME type
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `Type MIME non autorise: ${file.type}` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    await writeFile(filePath, buffer);

    const urlPath = `/uploads/${uniqueName}`;
    return NextResponse.json({ url: urlPath, name: uniqueName }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: "Echec de l'upload" }, { status: 500 });
  }
}
"""
write_file(path, new_upload)
fix_count("Upload route now validates file type, extension, and size (10MB max)")

# ============================================================
# H4/M14: Fix pages-visibility PUT - add title to create clause
# ============================================================
print("\n[H4/M14] Fixing pages-visibility upsert...")
path = f"{BASE}/src/app/api/pages-visibility/route.ts"
content = read_file(path)
content = content.replace(
    "create: { pageKey, visible },",
    "create: { pageKey, visible, title: pageKey.charAt(0).toUpperCase() + pageKey.slice(1) },"
)
write_file(path, content)
fix_count("pages-visibility upsert now includes title in create clause")

# ============================================================
# H1: Fix Playfair Display font - use next/font/google
# ============================================================
print("\n[H1/L5] Fixing Playfair Display font loading...")
path = f"{BASE}/src/app/layout.tsx"
new_layout = r"""import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grace Divine Voyage | Agence de Voyage",
  description: "Vous satisfaire est notre priorite. Vente de billets, reservation de vol, assistance visa, reservation d'hotel et plus encore.",
  keywords: ["voyage", "billet d'avion", "visa", "hotel", "Guinee", "Conakry", "grace divine voyage"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Grace Divine Voyage | Agence de Voyage",
    description: "Vous satisfaire est notre priorite. Vente de billets, reservation de vol, assistance visa, reservation d'hotel et plus encore.",
    siteName: "Grace Divine Voyage",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
"""
write_file(path, new_layout)
fix_count("Playfair Display now loaded via next/font/google + OpenGraph metadata added")

# Fix globals.css - remove broken @font-face and update font-serif
print("\n[H1/L5] Updating globals.css font references...")
path = f"{BASE}/src/app/globals.css"
content = read_file(path)
# Remove the broken @font-face block
content = re.sub(
    r"@font-face \{[^}]*\}\n\n",
    "",
    content
)
content = content.replace(
    "  --font-serif: 'Playfair Display', Georgia, serif;",
    "  --font-serif: var(--font-playfair), 'Playfair Display', Georgia, serif;"
)
write_file(path, content)
fix_count("globals.css: Removed broken @font-face, font-serif now uses CSS variable")

# ============================================================
# M10: Fix db.ts - disable query logging in production
# ============================================================
print("\n[M10] Fixing Prisma query logging...")
path = f"{BASE}/src/lib/db.ts"
content = """import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
"""
write_file(path, content)
fix_count("Prisma query logging now disabled in production")

# ============================================================
# M8: Fix next.config.ts - enable strict mode
# ============================================================
print("\n[M8] Fixing next.config.ts...")
path = f"{BASE}/next.config.ts"
content = """import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
"""
write_file(path, content)
fix_count("React Strict Mode enabled")

# ============================================================
# M11: Fix use-toast.ts - proper TOAST_LIMIT and TOAST_REMOVE_DELAY
# ============================================================
print("\n[M11] Fixing use-toast.ts...")
path = f"{BASE}/src/hooks/use-toast.ts"
content = read_file(path)
content = content.replace("const TOAST_LIMIT = 1", "const TOAST_LIMIT = 5")
content = content.replace("const TOAST_REMOVE_DELAY = 1000000", "const TOAST_REMOVE_DELAY = 5000")
write_file(path, content)
fix_count("TOAST_LIMIT=5, TOAST_REMOVE_DELAY=5000ms")

# ============================================================
# M12: Fix use-mobile.ts - use mql.matches
# ============================================================
print("\n[M12] Fixing use-mobile.ts...")
path = f"{BASE}/src/hooks/use-mobile.ts"
content = """import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
"""
write_file(path, content)
fix_count("use-mobile now uses mql.matches instead of window.innerWidth")

# ============================================================
# H5: Fix ContactPage - check response.ok before success
# ============================================================
print("\n[H5] Fixing ContactPage response check...")
path = f"{BASE}/src/components/gdv/pages/ContactPage.tsx"
content = read_file(path)
old_contact_fetch = """      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setSuccess(true);"""
new_contact_fetch = """      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setError("Une erreur est survenue lors de l'envoi. Veuillez reessayer.");
        return;
      }

      setSuccess(true);"""
content = content.replace(old_contact_fetch, new_contact_fetch)
write_file(path, content)
fix_count("ContactPage now checks response.ok before showing success")

# ============================================================
# H6: Fix GalleryPage silent error swallowing
# ============================================================
print("\n[H6] Fixing GalleryPage error handling...")
path = f"{BASE}/src/components/gdv/pages/GalleryPage.tsx"
content = read_file(path)
content = content.replace(
    ".catch(() => {})",
    ".catch((err) => { console.error('Erreur galerie:', err); })"
)
write_file(path, content)
fix_count("GalleryPage now logs errors instead of swallowing")

# ============================================================
# M7: Fix copyright year - use dynamic year
# ============================================================
print("\n[M7] Fixing copyright year...")
path = f"{BASE}/src/components/gdv/Footer.tsx"
content = read_file(path)
content = content.replace(
    "\u00a9 2026 Grace Divine Voyage. Tous droits reserves.",
    "{`\u00a9 ${new Date().getFullYear()} Grace Divine Voyage. Tous droits reserves.`}"
)
write_file(path, content)
fix_count("Copyright year now uses new Date().getFullYear()")

print("\n" + "=" * 60)
print("SCRIPT 1 COMPLETE - Core fixes applied")
print("=" * 60)
