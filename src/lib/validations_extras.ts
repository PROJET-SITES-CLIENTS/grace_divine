import { z } from 'zod';

const jsonArrayString = z.string().refine((val) => {
  if (!val) return true;
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) && parsed.every((item: any) => typeof item === 'string');
  } catch {
    return false;
  }
}, { message: "Format JSON invalide. Doit être une liste valide comme [\"item1\", \"item2\"]." });

export const siteSettingsSchema = z.object({
  siteName: z.string().optional(),
  slogan: z.string().optional(),
  address: z.string().optional(),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  extraPhones: jsonArrayString.optional(),
  email1: z.string().optional(),
  email2: z.string().optional(),
  extraEmails: jsonArrayString.optional(),
  whatsappNumber: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  tiktokUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  heroImage: z.string().optional(),
});

export const aboutPageSchema = z.object({
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  values: jsonArrayString.optional(),
  story: z.string().optional(),
});
