// import NextAuth from 'next-auth';
// import authConfig from './auth.config';

// export const { auth, handlers, signOut, signIn } = NextAuth({
//   ...authConfig
// });

import NextAuth from 'next-auth';
import authConfig from './auth.config';

async function signIn({ user }: any) {
  console.log(user);
  if (user?.error) {
    throw new Error(user?.error);
  }
  return true;
}

export const { auth, handlers, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    signIn: signIn
  }
});
