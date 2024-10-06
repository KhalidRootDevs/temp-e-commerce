'use client';

import LoadingPage from '@/components/loading';
import { useGetCategoryQuery } from '@/features/web/category/categoryApi';
import { Category } from '@/types';

export default function Categories() {
  const { isLoading, data: categoryData } = useGetCategoryQuery({});

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <h4 className="p-2 text-lg font-semibold">All Category List</h4>
      <div className="flex flex-wrap items-center justify-start gap-5">
        {categoryData?.data?.map((category: Category, index: number) => (
          <div
            key={index}
            className="flex min-w-[300px] flex-col items-center justify-center rounded-md border border-gray-200 p-5"
          >
            <img
              src={category?.image}
              alt={category?.name}
              className="aspect-square h-20 w-20 rounded-md object-contain"
            />
            <p>{category?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
