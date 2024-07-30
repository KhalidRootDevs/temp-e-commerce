'use client';

import LoadingPage from '@/components/loading';
import { CategoryTable } from '@/components/tables/category-tables/category-tables';
import { columns } from '@/components/tables/category-tables/columns';
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
  const offset = (page - 1) * pageLimit;

  const { isLoading, data: categoryData } = useCategoryGetAllApiQuery({
    page: page,
    limit: pageLimit,
    ...(query && { name: query })
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  console.log('Categories', categoryData);

  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Separator />

      <CategoryTable
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
