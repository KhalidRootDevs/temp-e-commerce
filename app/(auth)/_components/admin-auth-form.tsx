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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(6, { message: 'Enter at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function AdminAuthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const defaultValues = {
    email: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      role: 'admin',
      redirect: false
    });

    console.log('result', result);

    if (!result?.error) {
      router.push('/admin/dashboard');
    } else {
      const errorMessage = extractErrorMessage(result.error);
      setError(errorMessage || 'Authentication failed');
    }

    setLoading(false);
  };

  const extractErrorMessage = (error: string): string | undefined => {
    if (error.includes('Configuration')) return 'Invalid credentials';
    if (error.includes('User not found')) return 'User not found';
    if (error.includes('Account locked')) return 'Your account is locked';

    return undefined;
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="!mt-5 ml-auto w-full"
            type="submit"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  );
}
