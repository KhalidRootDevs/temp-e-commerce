'use client';

import {
  selectCurrentToken,
  selectCurrentUser
} from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';

export default function Banner() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  console.log('user: ', user);
  console.log('token: ', token);

  return (
    <div className="mt-5">
      <div className="h-40 w-full animate-pulse rounded-lg bg-gray-400"></div>
    </div>
  );
}
