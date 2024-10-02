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

export async function getNewAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/admin/auth/refresh-token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.BACKEND_TOKEN || '',
          Authorization: `Bearer ${token.refreshToken}`
        }
      }
    );

    const data = await response.json();

    if (data.status) {
      // cookies().set({
      //   name: 'accessToken',
      //   value: data.data.accessToken,
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV !== 'development',
      //   path: '/'
      // });

      return {
        ...token,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken ?? token.refreshToken
      };
    } else {
      cookies().delete('accessToken');
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
}
