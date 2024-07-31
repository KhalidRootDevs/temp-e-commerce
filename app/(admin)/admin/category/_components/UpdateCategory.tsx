'use client';

import { CategoryForm } from '@/components/forms/category-form';
import LoadingPage from '@/components/loading';
import { useCategoryGetByIdApiQuery } from '@/features/admin/category/categoryApi';

export default function UpdateCategory({ id }: { id: string }) {
  const { isLoading, data: category } = useCategoryGetByIdApiQuery(id);

  console.log('Single Category', category);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      {category.status ? (
        <CategoryForm initialData={category.data} id={id} />
      ) : (
        <p>Category Not Found</p>
      )}
    </>
  );
}
