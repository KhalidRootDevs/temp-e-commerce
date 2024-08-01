import Footer from '@/components/layout/client/footer';
import Header from '@/components/layout/client/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Client Layout',
  description: 'Basic client layout with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mt-28 flex-grow p-2">{children}</main>
      <Footer />
    </div>
  );
}
