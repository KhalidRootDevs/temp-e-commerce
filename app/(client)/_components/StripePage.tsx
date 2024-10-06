import paymentRedirect from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

export default function StripePage() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    paymentRedirect({ stripe, elements });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <PaymentElement />
      </div>
      <Button
        variant="outline"
        className="hover:be-green-600 mt-5 w-full bg-green-500 text-lg font-medium text-white"
        disabled={!stripe}
      >
        Pay
      </Button>
    </form>
  );
}
