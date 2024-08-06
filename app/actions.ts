'use server';

import { cookies } from 'next/headers';

export async function setAccessToken(token: any) {
  cookies().set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    path: '/'
  });
}

export async function deleteAccessToken() {
  cookies().delete('accessToken');
}
