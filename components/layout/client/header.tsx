import AuthNav from '@/app/(auth)/_components/auth-nav';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { clientNavItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CartComponent from '../../../app/(client)/_components/cart-component';
import { UserNav } from '../user-nav';
import { ClientNav } from './client-nav';
import { MobileSidebar } from './mobile-sidebar';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 mx-auto max-w-screen-xl bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/">
          <p className="px-2 text-center text-lg font-semibold">App Title</p>
        </Link>

        <div className="flex items-center gap-2">
          <AuthNav />
          <UserNav />
          <ThemeToggle />
        </div>
      </div>
      <nav className="flex h-14 items-center justify-between px-4">
        <div className={cn('hidden lg:!block')}>
          <ClientNav items={clientNavItems} />
        </div>

        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <CartComponent />
        </div>
      </nav>
    </div>
  );
}
