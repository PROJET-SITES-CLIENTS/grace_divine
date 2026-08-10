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

export const contactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(200),
  email: z.string().email('Email invalide').max(200).optional().or(z.literal('')),
  phone: z.string().max(30).optional(),
  subject: z.string().max(300).optional(),
  service: z.string().max(200).optional(),
  message: z.string().min(1, 'Le message est requis').max(5000),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  shortDesc: z.string().max(500).optional(),
  description: z.string().max(5000).optional(),
  icon: z.string().max(100).optional(),
  image: z.string().max(500).optional(),
  features: jsonArrayString.optional(),
  visible: z.boolean().optional().default(true),
  order: z.number().int().optional(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1).max(200),
  role: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  photo: z.string().max(500).optional(),
  order: z.number().int().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1).max(200),
  role: z.string().max(200).optional(),
  content: z.string().min(1).max(3000),
  rating: z.number().int().min(1).max(5).optional().default(5),
  order: z.number().int().optional(),
});

export const partnerSchema = z.object({
  name: z.string().min(1).max(200),
  logo: z.string().max(500).optional(),
  website: z.string().max(500).optional(),
  order: z.number().int().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  category: z.string().max(100).optional(),
  order: z.number().int().optional(),
});

export const adSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(1000).optional(),
  imageUrl: z.string().max(500).optional(),
  linkUrl: z.string().max(500).optional(),
  whatsappMsg: z.string().max(500).optional(),
  position: z.enum(['popup', 'banner', 'inline']).optional().default('popup'),
  active: z.boolean().optional().default(true),
  order: z.number().int().optional(),
});

export const jobSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(5000).optional(),
  requirements: z.string().max(5000).optional(),
  location: z.string().max(200).optional(),
  type: z.string().max(50).optional(),
});

export const galleryImageSchema = z.object({
  title: z.string().max(200).optional(),
  url: z.string().url('URL invalide').max(500),
  order: z.number().int().optional(),
});

export const galleryVideoSchema = z.object({
  title: z.string().max(200).optional(),
  url: z.string().url('URL invalide').max(500),
  thumbnail: z.string().max(500).optional(),
  order: z.number().int().optional(),
});
