import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Auth Layout',
  description: 'Basic auth layout for user or admin with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
