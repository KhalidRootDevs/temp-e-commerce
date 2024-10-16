import paymentRedirect from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useState } from 'react';

interface StripeFormProps {
  email: string;
  onClose: () => void;
}

export default function StripeForm({ email, onClose }: StripeFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      setIsProcessing(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment/success`
        }
      });

      if (result && result?.error) {
        console.log('Error', result.error);
      }

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      setIsProcessing(false);
    }
    paymentRedirect({ stripe, elements });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <PaymentElement />
      </div>
      <Button
        type="submit"
        className="mt-4 w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700"
        disabled={isProcessing || !stripe}
      >
        {isProcessing ? 'Processing...' : 'Confirm and Pay'}
      </Button>
    </form>
  );
}
