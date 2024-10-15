'use client';

import { Form } from '@/components/ui/form';
import { useCreateContactMutation } from '@/features/web/contact/contactApi';
import { ContactUsSchema, ContactUsValues } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../custom/input-field';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [createContact] = useCreateContactMutation(undefined);

  const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const form = useForm<ContactUsValues>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues
  });

  const { reset } = form;

  const onSubmit = async (data: ContactUsValues) => {
    setLoading(true);

    try {
      createContact(data)
        .then((res: any) => {
          if (!res?.error) {
            toast({
              variant: 'success',
              description: 'Your message has been sent'
            });
            reset();
          } else {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your create request.'
            });
          }
        })
        .catch((err: any) => console.error(err));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" max-w-xl space-y-5"
        >
          <InputField type="text" name="name" label="Name" />
          <InputField type="text" name="email" label="Email" />
          <InputField type="text" name="subject" label="Subject" />
          <InputField type="textarea" name="message" label="Message" />

          <Button disabled={loading} className="ml-auto" type="submit">
            Send Message
          </Button>
        </form>
      </Form>
    </>
  );
}
