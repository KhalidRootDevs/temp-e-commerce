import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 p-10">
      <h4>Your cart is empty</h4>
      <Link href="/">
        <Button variant="outline">Return to Shop</Button>
      </Link>
    </div>
  );
}
