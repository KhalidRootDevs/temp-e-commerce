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
  app_logo: z.string().url('Please enter a valid URL for the logo'),
  app_title: z.string().min(1, { message: 'App title is required' }),
  terms: z.string().min(1, 'Terms and conditions are required').max(50000),
  privacy: z.string().min(1, 'Privacy policy is required').max(50000),
  stripe_secret: z.string().min(1, 'Stripe secret key is required')
});

export type GeneralSettingsFormValues = z.infer<
  typeof GeneralSettingsFormSchema
>;
