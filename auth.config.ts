import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { getNewAccessToken, setAccessToken } from './app/actions';

import { jwtDecode } from 'jwt-decode';

declare module '@auth/core/types' {
  interface User {
    id?: string;
    _id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    name: string;
    image: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'text'
        },
        role: {
          type: 'text'
        }
      },

      async authorize(credentials, req) {
        const user = {
          name: 'John',
          email: credentials?.email as string,
          password: credentials?.password as string,
          role: credentials?.role as string
        };

        if (user.role === 'user') {
          return user;
        } else {
          const response = await fetch(
            `${process.env.BACKEND_URL}/admin/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.BACKEND_TOKEN || ''
              },
              body: JSON.stringify({
                email: user.email,
                password: user.password
              })
            }
          );

          const data = await response.json();

          if (data.status) {
            setAccessToken(data.data.accessToken);
            return data.data;
          } else {
            // Invalid credentials
            return null;
          }
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?._id ?? '';
        token.role = user.role ?? '';
        token.image = user.image ?? '';
        token.accessToken = user.accessToken ?? '';
        token.refreshToken = user.refreshToken ?? '';
      }
      if (token?.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        token.accessTokenExpires = decodedToken?.exp! * 1000;
      }

      if (Date.now() < token?.accessTokenExpires!) {
        console.log('Token is valid');
        return token;
      }

      console.log('Token is invalid:', token);

      return getNewAccessToken(token);
    },
    async session({ session, token }) {
      session.user.id = token.id ?? '';
      session.user.role = token.role ?? '';
      session.user.image = token.image ?? '';
      session.user.accessToken = token.accessToken ?? '';
      session.user.refreshToken = token.refreshToken ?? '';
      return session;
    }
  },
  session: { strategy: 'jwt' },

  pages: {
    signIn: '/' // Sign-in page
  }
} satisfies NextAuthConfig;

export default authConfig;
