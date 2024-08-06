'use client';

import LoadingPage from '@/components/loading';
import { useGetAllApiQuery } from '@/features/admin/product/productApi';
import { Product } from '@/types';

export default function AllProducts() {
  const { isLoading, data: productData } = useGetAllApiQuery({});

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <div>
        {productData?.data?.map((product: Product, index: number) => (
          <div key={index}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
