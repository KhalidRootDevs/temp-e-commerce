'use client';
import StoreProvider from '@/features/context/store-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <StoreProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}
