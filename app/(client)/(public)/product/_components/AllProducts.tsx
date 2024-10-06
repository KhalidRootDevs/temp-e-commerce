'use client';

import ProductCard from '@/app/(client)/_components/ProductCard';
import LoadingPage from '@/components/loading';
import { useGetProductQuery } from '@/features/web/product/productApi';
import { Product } from '@/types';

export default function AllProducts() {
  const { data: productData, isLoading } = useGetProductQuery({});

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <h4 className="p-2 text-lg font-semibold">All Products List</h4>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {productData?.data?.map((product: Product, index: number) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
