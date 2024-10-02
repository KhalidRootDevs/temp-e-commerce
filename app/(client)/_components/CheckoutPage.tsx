'use client';

import useCartStore from '@/store/cartStore';
import CartDetailsItem from './CartDetailsItem';

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice } = useCartStore();

  return (
    <div>
      <h4 className="border-b pb-5 text-center text-lg font-medium lg:text-2xl">
        Shopping cart
      </h4>

      {cart.length > 0 && (
        <>
          <div className="mt-4 grid grid-cols-6 gap-5">
            <div className="col-span-3">Product</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-1">Quantity</div>
            <div className="col-span-1 text-end">Total</div>
          </div>

          <ul className="divide-y py-5 ">
            {cart.map((item) => (
              <CartDetailsItem key={item.id} item={item} />
            ))}
          </ul>
        </>
      )}

      {totalPrice ? (
        <div className="flex items-center justify-between border-t py-5">
          <p>You have added {totalItems} items</p>
          <p className="font-medium">
            SubTotal:{' '}
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>{' '}
          </p>
        </div>
      ) : null}
    </div>
  );
}
