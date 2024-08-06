'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetOwnProfileMutation } from './authApi';
import { setCredentials, userLogOut } from './authSlice';

export default function AuthProvider({ children }: any) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [getOwnProfile] = useGetOwnProfileMutation();
  const { replace } = useRouter();
  const path = usePathname();

  useEffect(() => {
    setIsLoading(true);
    // @ts-ignore
    getOwnProfile()
      .then((res) => {
        setIsLoading(false);
        dispatch(setCredentials({ target: 'user', value: res.data.data }));
        if (path.includes('/admin-login')) replace('/admin/dashboard');
      })
      .catch((_err) => {
        setIsLoading(false);
        dispatch(userLogOut(undefined));
        replace('/admin-login');
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <>{children}</>;
}
