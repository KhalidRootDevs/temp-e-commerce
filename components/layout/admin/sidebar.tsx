'use client';
import AdminNav from '@/components/layout/admin/admin-nav';
import { sideLinks } from '@/constants/data';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none border-r pt-20 md:block`,
        status && 'duration-500',
        !isMinimized ? 'w-60' : 'w-[72px]',
        className
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-16 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-0 py-0">
        <div className="px-3 py-0">
          <div className="mt-0 space-y-1">
            <AdminNav
              id="sidebar-menu"
              className={`z-40 h-full flex-1 ${
                isMinimized
                  ? 'max-h-screen'
                  : 'max-h-0 py-0 md:max-h-screen md:py-2'
              }`}
              closeNav={() => handleToggle}
              links={sideLinks}
              isCollapsed={isMinimized}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
