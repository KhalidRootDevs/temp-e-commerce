'use client';

import { ProductForm } from '@/components/forms/product-form';
import LoadingPage from '@/components/loading';
import { useCategoryGetAllApiQuery } from '@/features/admin/category/categoryApi';
import { useGetByIdApiQuery } from '@/features/admin/product/productApi';

export default function UpdateProduct({ id }: { id: string }) {
  const { isLoading: isProductLoading, data: productData } =
    useGetByIdApiQuery(id);
  const { isLoading: isCategoryLoading, data: categoryData } =
    useCategoryGetAllApiQuery({});

  if (isProductLoading || isCategoryLoading) return <LoadingPage />;

  if (!productData || !productData.status)
    return <p className="text-lg font-medium">Product Not Found</p>;

  return (
    <ProductForm
      initialData={productData.data}
      id={id}
      categories={categoryData.data}
    />
  );
}
