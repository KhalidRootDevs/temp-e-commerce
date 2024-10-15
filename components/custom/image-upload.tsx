import { cn } from '@/lib/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ImageDropSingle from '../ImageDropSingle';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';

interface ImageUploadInputProps {
  name: string;
  label?: string;
  defaultValue?: string | File;
  className?: string;
  loading?: boolean;
  image: any;
  setImage: any;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  name,
  label,
  defaultValue,
  className,
  loading,
  image,
  setImage
}) => {
  const { control } = useFormContext();

  return (
    <div className={cn('flex flex-col', className)}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              <ImageDropSingle
                value={image}
                onChange={(image: any) => setImage(image)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ImageUploadInput;
