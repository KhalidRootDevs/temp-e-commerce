import { Modal } from '@/components/ui/modal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import StripeForm from './StripeForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET || '');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  stripePayment: boolean;
  options: {
    clientSecret: string;
  };
  cartDetails: {
    title: string;
    totalPrice: number;
  };
}

export default function PaymentModal({
  isOpen,
  onClose,
  stripePayment,
  options,
  cartDetails
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (stripePayment && options.clientSecret) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [stripePayment, options]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePaymentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      alert('Please provide a valid email');
      return;
    }

    console.log('User Email:', email);
    console.log('Total Price:', cartDetails.totalPrice);
  };

  return (
    <Modal
      title="Confirm Payment"
      description="Complete your payment to finalize the purchase"
      isOpen={isOpen}
      onClose={onClose}
    >
      {stripePayment ? (
        isLoading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : options.clientSecret ? (
          <div className="space-y-4">
            {/* Package title and total price */}
            <div>
              <h3 className="text-lg font-semibold">
                Package: {cartDetails.title}
              </h3>
              <p className="text-md font-medium">
                Total Price:{' '}
                <span className="font-bold">
                  ${cartDetails.totalPrice.toFixed(2)}
                </span>
              </p>
            </div>

            {/* Email input field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-medium">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Stripe Payment Form */}
            <Elements stripe={stripePromise} options={options}>
              <StripeForm email={email} onClose={onClose} />
            </Elements>
          </div>
        ) : (
          <div className="text-red-500">Failed to load payment details.</div>
        )
      ) : null}
    </Modal>
  );
}
