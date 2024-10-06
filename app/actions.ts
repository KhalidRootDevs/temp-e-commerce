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
      await setAccessToken(data.data.accessToken);

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

export default async function paymentRedirect({ stripe, elements }: any) {
  try {
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payments/success`
      }
    });
    if (result && result?.error) {
      window.location.href = '/payments/fail';
    }
  } catch (error) {
    console.error('Payment failed:', error);
  }
}
