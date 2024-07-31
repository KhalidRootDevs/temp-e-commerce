'use client';

import { CategoryForm } from '@/components/forms/category-form';
import LoadingPage from '@/components/loading';
import { useCategoryGetByIdApiQuery } from '@/features/admin/category/categoryApi';

export default function UpdateCategory({ id }: { id: string }) {
  const { isLoading, data: category } = useCategoryGetByIdApiQuery(id);

  if (isLoading) return <LoadingPage />;

  if (!category || !category.status)
    return <p className="text-lg font-medium">Category Not Found</p>;

  return (
    <>
      <CategoryForm initialData={category.data} id={id} />
    </>
  );
}
