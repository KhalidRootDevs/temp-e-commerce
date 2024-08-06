'use client';

import { useGetProductQuery } from '@/features/web/product/productApi';
import { Product } from '@/types';
import ProductCard from '../../_components/ProductCard';

export default function Products() {
  const { isLoading, data: productData } = useGetProductQuery({});

  if (isLoading) return <div>Loading...</div>;

  console.log('Product here: ', productData);

  return (
    <div>
      <h4 className="p-2 text-lg font-semibold">Latest products for you</h4>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {productData?.data?.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
