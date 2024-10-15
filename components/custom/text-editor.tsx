import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';

interface TextEditorProps {
  name: string;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function TextEditorInput({
  name,
  label,
  labelClassName = '',
  required = false,
  className
}: TextEditorProps) {
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={cn('mb-3', className)}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 block font-medium text-gray-700 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <JoditEditor
            value={value || ''}
            onChange={(newContent) => {
              setValue(name, newContent);
            }}
          />
        )}
      />

      {/* Error Message */}
      {errors[name] && (
        <p className="text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
