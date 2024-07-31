'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  useCategoryCreateApiMutation,
  useCategoryUpdateApiMutation
} from '@/features/admin/category/categoryApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUploadSingle from '../file-upload-single';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';

export const IMG_MAX_LIMIT = 1;

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Category Name must be at least 3 characters' })
    .max(100, { message: 'Category Name must be at most 100 characters' }),
  image: z.string().nonempty({ message: 'Category Image is required' }),
  status: z.boolean().default(true),
  isPopular: z.boolean().default(false)
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: any | null;
  id?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  id
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category.' : 'Add a new category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';
  const action = initialData ? 'Save changes' : 'Create';

  const [createApi] = useCategoryCreateApiMutation();
  const [updateApi] = useCategoryUpdateApiMutation();

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        image: '',
        status: true,
        isPopular: false
      };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        updateApi({ id, data: data })
          .then((res: any) => {
            if (!res?.error) {
              toast({
                description: toastMessage
              });
              router.push(`/admin/category`);
            } else {
              toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your create request.'
              });
            }
          })
          .catch((err: any) => console.error(err));
      } else {
        createApi(data)
          .then((res: any) => {
            if (!res?.error) {
              toast({
                description: toastMessage
              });
              router.push(`/admin/category`);
            } else {
              toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your create request.'
              });
            }
          })
          .catch((err: any) => console.error(err));
      }
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 rounded border border-gray-200 p-4 md:p-8"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUploadSingle
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-8 md:grid md:grid-cols-12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPopular"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-row-reverse items-end justify-end gap-2 pb-2 md:col-span-4">
                  <FormLabel>Is Popular</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="h-5 w-5"
                      disabled={loading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-row-reverse items-end justify-end gap-2 pb-2 md:col-span-4">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="h-5 w-5"
                      disabled={loading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
