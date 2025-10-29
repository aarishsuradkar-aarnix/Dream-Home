import { z } from 'zod';

const locationSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
});

const agentSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().url(),
});

export const propertyBaseSchema = z.object({
  title: z.string().min(3),
  price: z.number().nonnegative(),
  location: locationSchema,
  type: z.enum(['Apartment', 'House', 'Villa']),
  status: z.enum(['For Sale', 'For Rent']),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  area: z.number().int().positive(),
  description: z.string().min(10),
  amenities: z.array(z.string().min(1)).default([]),
  images: z.array(z.string().url()).min(1),
  agent: agentSchema,
  featured: z.boolean().default(false),
  approved: z.boolean().optional(),
  image_prompt: z.string().optional(),
});

export const propertyCreateSchema = propertyBaseSchema.extend({
  id: z.string().optional(),
});

export const propertyUpdateSchema = propertyBaseSchema.partial().extend({
  id: z.string().optional(),
});
