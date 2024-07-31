'use client';

import LoadingPage from '@/components/loading';
import { columns } from '@/components/tables/category-tables/columns';
import { DataTableLarge } from '@/components/tables/data-table-large';
import { Separator } from '@/components/ui/separator';
import { useCategoryGetAllApiQuery } from '@/features/admin/category/categoryApi';

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Categories({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const query = searchParams.search || null;

  const { isLoading, data: categoryData } = useCategoryGetAllApiQuery({
    page: page,
    limit: pageLimit,
    ...(query && { name: query })
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Separator />

      <DataTableLarge
        searchKey="name"
        pageNo={page}
        columns={columns}
        totalItems={categoryData?.data?.totalDocs}
        data={categoryData?.data?.docs}
        pageCount={categoryData?.data?.totalPages}
      />
    </div>
  );
}
