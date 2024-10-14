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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  useCategoryCreateApiMutation,
  useCategoryUpdateApiMutation
} from '@/features/admin/category/categoryApi';
import { CategoryFormSchema, CategoryFormValues } from '@/lib/form-schema';
import { uploadImage } from '@/lib/uploadImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageDropSingle from '../ImageDropSingle';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';

export const IMG_MAX_LIMIT = 1;

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
  const [imageType, setImageType] = useState('url');
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');
  const [categoryImage, setCategoryImage] = useState('');
  const [isValidImage, setIsValidImage] = useState(false);

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

  const handleImageUrlChange = (event: any) => {
    const url = event.target.value;
    setImageUrl(url);

    const img = new Image();
    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);
    img.src = url;
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);

      if (categoryImage) {
        data.image = await uploadImage(categoryImage);
      }

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
              console.error('Error', res.error);
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
      console.error('error', error);
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
          <div className="flex items-center space-x-2">
            <p className="text-sm font-semibold">Image Type:</p>
            <RadioGroup
              defaultValue={imageType}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="url"
                  id="r1"
                  onClick={() => {
                    setImageType('url');
                  }}
                />
                <Label htmlFor="r1">Url</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="upload"
                  id="r2"
                  onClick={() => {
                    setImageType('upload');
                  }}
                />
                <Label htmlFor="r2">Upload</Label>
              </div>
            </RadioGroup>
          </div>

          {imageType === 'url' ? (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-4">
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter image url"
                      {...field}
                      value={imageUrl}
                      onChange={(e) => {
                        field.onChange(e);
                        handleImageUrlChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {isValidImage ||
                    (imageUrl && (
                      <div>
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="aspect-square w-40 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageDropSingle
                      value={categoryImage}
                      onChange={(image: any) => setCategoryImage(image)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
