'use client';

import ErrorPage from '@/components/error';

export default function Error() {
  return (
    <ErrorPage
      message="There is a error on authentication, Try again later"
      backPage="Login"
      backRoute="/user-login"
    />
  );
}
