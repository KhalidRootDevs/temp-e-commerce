'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useCreatePaymentMutation } from '@/features/web/stripePay/stripePayApi';
import useCartStore from '@/store/cartStore';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { useState } from 'react';
import CartDetailsItem from './CartDetailsItem';
import StripePage from './StripePage';
const stripePromise = loadStripe(
  'pk_test_51PN5XfI0LFM6TJvPUYcTs8yu8R989SUrmoZ4qL2x3kx8uEqvj6PJfRKZVLRGy8ZtGk524vfEPtKzMWt3Re4u957u00m5DxsPMm'
);

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice } = useCartStore();

  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState({
    clientSecret: null
  });
  const [stripePayment, setStripePayment] = useState(false);

  const [createPayment] = useCreatePaymentMutation();

  const makeEComPayment = async () => {
    try {
      const { data } = await createPayment({
        userName: 'Kbin',
        amount: totalPrice.toFixed(2),
        currency: 'USD',
        paymentId: 12345
      });

      console.log('Response: ==>', data);

      if (data.status) {
        setOpen(true);
        setOptions({
          ...options,
          clientSecret: data?.data?.clientSecret
        });
        setStripePayment(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (totalItems < 1) {
    return (
      <div className="flex flex-col items-center justify-center space-y-5 p-10">
        <h4>Your cart is empty</h4>
        <Link href="/">
          <Button variant="outline">Return to Shop</Button>
        </Link>
      </div>
    );
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
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>{' '}
          </p>
        </div>
      ) : null}

      <div className="flex items-center justify-end">
        <Button variant="default" onClick={makeEComPayment}>
          Pay Now
        </Button>
      </div>

      <Modal
        title="Are you sure?"
        description="This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {stripePayment && (
          <>
            {options ? (
              <>
                {' '}
                <Elements stripe={stripePromise} options={options}>
                  <StripePage />
                </Elements>{' '}
              </>
            ) : (
              <>Loading...</>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
