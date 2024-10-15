'use client';

import ProductCard from '@/app/(client)/_components/ProductCard';
import LoadingPage from '@/components/loading';
import { useCategorySingleQuery } from '@/features/web/category/categoryApi';
import { useGetProductQuery } from '@/features/web/product/productApi';
import { Product } from '@/types';

type paramsProps = {
  searchParams: {
    category?: string;
  };
};

export default function AllProducts({ searchParams }: paramsProps) {
  const category = searchParams.category || null;

  const { data: productData, isLoading: isLoadingProducts } =
    useGetProductQuery({
      ...(category && { category })
    });

  const { data: categoryData, isLoading: isLoadingCategory } =
    useCategorySingleQuery(category);

  if (isLoadingProducts || isLoadingCategory) return <LoadingPage />;

  const selectedCategory = categoryData?.data;

  return (
    <div>
      {selectedCategory ? (
        <>
          {category && (
            <div className="flex items-center gap-5 py-4">
              <img
                src={selectedCategory?.image}
                alt=""
                className="h-10 rounded-lg "
              />
              <p className="font-bold">{selectedCategory?.name}</p>
            </div>
          )}
        </>
      ) : (
        <> </>
      )}

      {!category && <h4 className="p-2 text-lg font-semibold">All Products</h4>}

      {!productData?.data?.length ? (
        <p className="p-4 text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {productData?.data?.map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
