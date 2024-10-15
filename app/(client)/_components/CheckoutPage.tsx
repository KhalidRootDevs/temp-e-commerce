'use client';

import { Button } from '@/components/ui/button';
import { RootState } from '@/features/store';
import { useCreatePaymentMutation } from '@/features/web/stripePay/stripePayApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartDetailsItem from './CartDetailsItem';
import EmptyCart from './EmptyCart';
import PaymentModal from './PaymentModal';

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({ clientSecret: '' });
  const [stripePayment, setStripePayment] = useState(false);
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const makeEComPayment = async () => {
    try {
      const data: any = await createPayment({
        userName: 'Kbin',
        amount: totalPrice.toFixed(2),
        currency: 'USD',
        paymentId: 12345
      });

      console.log('DATA HERE', data);

      if (data?.data?.status) {
        setOpen(true);
        setOptions({ clientSecret: data?.data?.data?.clientSecret });
        setStripePayment(true);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  if (totalItems < 1) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="flex items-center justify-between border-b pb-2">
        <h4 className="text-center text-lg font-medium lg:text-2xl">
          Shopping cart
        </h4>
        <p>Total Items: {totalItems}</p>
      </div>

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
        <div className="flex items-center justify-end border-t py-5">
          <p className="font-medium">
            SubTotal:{' '}
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </p>
        </div>
      ) : null}

      <div className="flex items-center justify-end">
        <Button
          variant="default"
          onClick={makeEComPayment}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>

      <PaymentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        stripePayment={stripePayment}
        options={options}
        cartDetails={{ title: '', totalPrice: +totalPrice.toFixed(2) }}
      />
    </div>
  );
}
