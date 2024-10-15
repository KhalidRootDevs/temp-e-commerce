import * as z from 'zod';

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Category Name must be at least 3 characters' })
    .max(100, { message: 'Category Name must be at most 100 characters' }),
  image: z.any(),
  status: z.boolean().default(true),
  isPopular: z.boolean().default(false)
});

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;

export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' })
    .max(100, { message: 'Product Name must be at most 100 characters' }),
  image: z.any(),
  status: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  price: z
    .number()
    .int()
    .nonnegative({ message: 'Price must be a non-negative integer' }),
  quantity: z
    .number()
    .int()
    .nonnegative({ message: 'Quantity must be a non-negative integer' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  description: z
    .string()
    .min(3, { message: 'Product description must be at least 3 characters' })
    .max(1000, {
      message: 'Product description must be at most 1000 characters'
    })
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;

export const GeneralSettingsFormSchema = z.object({
  app_name: z.string().min(1, { message: 'App name is required' }),
  app_title: z.string().min(1, { message: 'App title is required' }),
  app_logo: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\/\S+\.\S+$/.test(value), {
      message: 'Please enter a valid URL for the logo'
    }),
  app_logo_type: z.enum(['url', 'image']).default('url').optional(),
  supportEmail: z.string().email('Please enter a valid email').optional(),
  terms: z.string().min(1, 'Terms and conditions are required').max(50000),
  privacy: z.string().min(1, 'Privacy policy is required').max(50000),
  stripe_secret: z.string().min(1, 'Stripe secret key is required'),
  stripe_encryption_key: z.string().optional().or(z.literal('')),
  redirect: z.boolean().default(false),
  redirect_url: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\/\S+\.\S+$/.test(value), {
      message: 'Please enter a valid URL for the redirect'
    }),
  payment_allowed: z.boolean().default(false),
  checkout_allowed: z.boolean().default(false),
  paymentSuccessMessage: z.string().optional()
});

export type GeneralSettingsFormValues = z.infer<
  typeof GeneralSettingsFormSchema
>;

export const ContactUsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email('Please enter a valid email').optional(),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(10, { message: 'Message is required' })
});

export type ContactUsValues = z.infer<typeof ContactUsSchema>;
