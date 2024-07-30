'use client';

import LoadingPage from '@/components/loading';
import { columns } from '@/components/tables/product-tables/columns';
import { ProductTable } from '@/components/tables/product-tables/product-table';
import { Separator } from '@/components/ui/separator';
import { useGetAllApiQuery } from '@/features/admin/product/productApi';

export default function Products({ searchParams }: any) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const query = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const { isLoading, data: productData } = useGetAllApiQuery({
    page: page,
    limit: pageLimit,
    ...(query && { name: query })
  });

  if (isLoading) return <LoadingPage />;

  console.log('searchParams ==>', searchParams);

  //   const totalProducts = employeeRes.total_users; //1000
  //   const pageCount = Math.ceil(totalUsers / pageLimit);
  //   const employee: Employee[] = employeeRes.users;

  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Separator />

      <ProductTable
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
