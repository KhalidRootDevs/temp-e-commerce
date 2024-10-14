'use client';

import { Form } from '@/components/ui/form';
import {
  GeneralSettingsFormSchema,
  GeneralSettingsFormValues
} from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';

interface SettingsFormProps {
  initialData?: GeneralSettingsFormValues | null;
}

export const GeneralSettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  const [loading, setLoading] = useState(false);
  const title = initialData
    ? 'Edit General Settings'
    : 'Create General Settings';
  const description = initialData
    ? 'Edit general settings.'
    : 'Add new general settings.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData || {
    app_name: '',
    app_logo: '',
    app_title: '',
    terms: '',
    privacy: '',
    stripe_secret: ''
  };

  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(GeneralSettingsFormSchema),
    defaultValues
  });

  const onSubmit = async (data: GeneralSettingsFormValues) => {
    setLoading(true);
    try {
      console.log('User Data', data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-5">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 rounded border border-gray-200 p-4 md:p-8"
        >
          <InputField label="App Name" name="app_name" />
          <InputField label="App Logo URL" name="app_logo" />

          <TextareaField label="Terms and Conditions" name="terms" />
          <TextareaField label="Privacy Policy" name="privacy" />
          <InputField label="Stripe Secret Key" name="stripe_secret" />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const InputField = ({ label, name }: { label: string; name: string }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<GeneralSettingsFormValues>();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name)}
        type="text"
        id={name}
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
          errors[name] ? 'border-red-500 ring-red-500' : ''
        }`}
      />
      {errors[name] && (
        <span className="mt-1 text-sm text-red-600">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

const TextareaField = ({ label, name }: { label: string; name: string }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<GeneralSettingsFormValues>();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        {...register(name)}
        type="text"
        id={name}
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
          errors[name] ? 'border-red-500 ring-red-500' : ''
        }`}
      />
      {errors[name] && (
        <span className="mt-1 text-sm text-red-600">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};
