'use client';
import { setCredentials } from '@/features/auth/authSlice';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ThemeProvider from './ThemeToggle/theme-provider';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(
        setCredentials({
          user: session.user,
          accessToken: session.user.accessToken
        })
      );
    }
  }, [session, dispatch]);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
