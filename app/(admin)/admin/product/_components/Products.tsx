'use client';

import LoadingPage from '@/components/loading';
import { DataTableLarge } from '@/components/tables/data-table-large';
import { columns } from '@/components/tables/product-tables/columns';

import { Separator } from '@/components/ui/separator';
import { useGetAllApiQuery } from '@/features/admin/product/productApi';

export default function Products({ searchParams }: any) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const query = searchParams.search || null;

  const { isLoading, data: productData } = useGetAllApiQuery({
    page: page,
    limit: pageLimit,
    ...(query && { name: query })
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Separator />

      <DataTableLarge
        searchKey="name"
        pageNo={page}
        columns={columns}
        totalItems={productData?.data?.totalDocs}
        data={productData?.data?.docs}
        pageCount={productData?.data?.totalPages}
      />
    </div>
  );
}
