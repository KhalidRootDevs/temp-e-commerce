'use client';

import { useGetProductQuery } from '@/features/web/product/productApi';
import { Product } from '@/types';
import ProductCard from '../../_components/ProductCard';

export default function Products() {
  const { isLoading, data: productData } = useGetProductQuery({});

  if (isLoading)
    return (
      <div>
        <div className="my-2 h-5 w-1/4 rounded bg-gray-300"></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse space-y-2">
              <div className="h-72 rounded-md bg-gradient-to-r from-gray-200 via-transparent to-gray-400"></div>
              {/* Add more divs as needed to mimic product card structure */}
            </div>
          ))}
        </div>
      </div>
    );

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
