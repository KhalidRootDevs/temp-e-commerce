import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { cn } from '@/lib/utils';

interface InputFieldProps {
  name: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  label?: string;
  defaultValue?: string | number;
  placeholder?: string;
  loading?: boolean;
  options?: { value: string | number; label: string }[];
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  loading,
  options,
  className
}) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
        </Label>
      )}

      {/* Text, Number, and Textarea Input */}
      {['text', 'number', 'textarea'].includes(type) && (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || ''}
          render={({ field }) =>
            type === 'textarea' ? (
              <Textarea
                {...field}
                id={name}
                placeholder={placeholder}
                rows={4}
              />
            ) : (
              <Input
                type={type}
                {...field}
                id={name}
                placeholder={placeholder}
              />
            )
          }
        />
      )}

      {/* Select Input */}
      {type === 'select' && options && (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || ''}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value?.toString() || ''}
            >
              <SelectTrigger className={cn(errors[name] && 'border-red-500')}>
                <SelectValue placeholder={placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}

      {/* Error Message */}
      {errors[name] && (
        <p className="text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;
