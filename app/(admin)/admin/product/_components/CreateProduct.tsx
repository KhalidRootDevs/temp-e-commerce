'use client';

import { ProductForm } from '@/components/forms/product-form';
import LoadingPage from '@/components/loading';
import { useCategoryGetAllApiQuery } from '@/features/admin/category/categoryApi';
import { useEffect, useState } from 'react';

export default function CreateProduct() {
  const { isLoading, data: categoryData } = useCategoryGetAllApiQuery({});
  const [categories, setCategories] = useState<any[]>(categoryData?.data || []);

  useEffect(() => {
    setCategories(categoryData?.data || []);
  }, [categoryData?.data]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <ProductForm initialData={null} categories={categories} />
    </>
  );
}
