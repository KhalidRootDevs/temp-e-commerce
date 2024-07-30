import BreadCrumb from '@/components/breadcrumb';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Categories from './_components/Categories';

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const breadcrumbItems = [{ title: 'Category', link: '/admin/category' }];
export default function page({ searchParams }: paramsProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Categories`} description="Manage categories" />

          <Link
            href={'/admin/category/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Icons.add className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>

        <Categories searchParams={searchParams} />
      </div>
    </ScrollArea>
  );
}
