import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import StoreProvider from '@/features/context/store-provider';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E Commerce',
  description: 'Basic e-commerce for digital products'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <NextTopLoader showSpinner={false} />
        <StoreProvider>
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
