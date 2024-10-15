'use client';

import { Form } from '@/components/ui/form';
import { useUpdateSettingsMutation } from '@/features/admin/settings/settingsApi';
import {
  GeneralSettingsFormSchema,
  GeneralSettingsFormValues
} from '@/lib/form-schema';
import { uploadImage } from '@/lib/uploadImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../custom/input-field';
import RadioInputField from '../custom/radio-input-field';
import TextEditorInput from '../custom/text-editor';
import ImageDropSingle from '../ImageDropSingle';
import { Button } from '../ui/button';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';

interface SettingsFormProps {
  initialData?: GeneralSettingsFormValues | null;
}

export const GeneralSettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const title = initialData
    ? 'Edit General Settings'
    : 'Create General Settings';
  const description = initialData
    ? 'Edit general settings.'
    : 'Add new general settings.';
  const action = initialData ? 'Save changes' : 'Create';
  const toastMessage = initialData ? 'Settings updated.' : 'Settings created.';

  const [updateSettings] = useUpdateSettingsMutation();

  const defaultValues = {
    app_name: '',
    app_title: '',
    app_logo: '',
    app_logo_type: 'url',
    supportEmail: '',
    terms: '',
    privacy: '',
    stripe_secret: '',
    stripe_encryption_key: '',
    redirect: false,
    redirect_url: '',
    payment_allowed: false,
    checkout_allowed: false,
    paymentSuccessMessage: ''
  };

  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(GeneralSettingsFormSchema),
    // @ts-ignore
    defaultValues: initialData
      ? { ...initialData, app_logo_type: 'url' }
      : defaultValues
  });

  const isRedirect: boolean = form.watch('redirect') ?? false;
  const appLogoType: string = form.watch('app_logo_type') ?? '';
  const appLogo: string = form.watch('app_logo') ?? '';

  const onSubmit = async (data: GeneralSettingsFormValues) => {
    setLoading(true);

    delete data.app_logo_type;

    try {
      if (image) {
        data.app_logo = await uploadImage(image);
      }

      setLoading(true);

      updateSettings(data)
        .then((res: any) => {
          if (!res?.error) {
            toast({
              variant: 'success',
              description: toastMessage
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your create request.'
            });
          }
        })
        .catch((err: any) => console.error(err));
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
    <div className="space-y-8 p-5">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full rounded border border-gray-200 p-3"
        >
          <div className="mb-5 rounded-lg border border-gray-300 p-4">
            <h4 className="py-2 font-medium">General Settings</h4>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {' '}
              <InputField type="text" name="app_name" label="App Name" />
              <InputField type="text" name="app_title" label="App Title" />
              <InputField
                type="text"
                name="supportEmail"
                label="Support Email"
              />
              <InputField
                name="app_logo_type"
                type="select"
                label="App Logo Type"
                defaultValue={'url'}
                options={[
                  { value: '', label: 'Select One' },
                  { value: 'url', label: 'Url' },
                  { value: 'image', label: 'Image' }
                ]}
                loading={loading}
              />
              {appLogoType === 'url' ? (
                <>
                  {' '}
                  <InputField
                    className="col-span-2"
                    type="text"
                    name="app_logo"
                    label="App Logo Url"
                  />
                </>
              ) : (
                <div className="col-span-2">
                  <ImageDropSingle
                    value={image}
                    onChange={(image: any) => setImage(image)}
                  />
                </div>
              )}
              {appLogo && appLogoType === 'url' && (
                <>
                  <img
                    src={appLogo}
                    alt="app logo"
                    className="h-20 rounded-lg"
                  />
                </>
              )}
            </div>
          </div>

          <div className="mb-5 rounded-lg border border-gray-300 p-4">
            <h4 className="py-2 font-medium">Stripe</h4>
            <div className="grid grid-cols-1 gap-5  lg:grid-cols-2">
              {' '}
              <InputField type="text" label="Secret Key" name="stripe_secret" />
              <InputField
                type="text"
                label="Encryption Key"
                name="stripe_encryption_key"
              />{' '}
            </div>
          </div>

          <div className="mb-5 rounded-lg border border-gray-300 p-4">
            <h4 className="py-2 font-medium">Payment Settings</h4>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <RadioInputField
                form={form}
                name="checkout_allowed"
                label="Allow checkout"
                yesLabel="Yes"
                noLabel="No"
              />
              <RadioInputField
                form={form}
                name="payment_allowed"
                label="Allow payment"
                yesLabel="Yes"
                noLabel="No"
              />
              <RadioInputField
                form={form}
                name="redirect"
                label="Redirect after payment"
                yesLabel="Yes"
                noLabel="No"
              />
              {isRedirect && (
                <>
                  {' '}
                  <InputField
                    className="col-span-3"
                    type="text"
                    label="Redirect Url"
                    name="redirect_url"
                  />
                </>
              )}
            </div>
          </div>

          <TextEditorInput
            className="rounded-lg border border-gray-300 p-4"
            name="terms"
            label="Terms and Conditions"
          />
          <TextEditorInput
            className="rounded-lg border border-gray-300 p-4"
            name="privacy"
            label="Privacy and Policy"
          />

          <div className="flex items-center justify-end">
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
