'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { RootState } from '@/features/store';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Icons } from '../../../components/icons';
import CartDrawerItem from './CartDrawerItem';

export default function CartComponent() {
  // Use Redux to select cart, totalItems, and totalPrice from the state
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const router = useRouter();

  const handleRedirect = () => {
    router.push('/checkout');
  };

  return (
    <Sheet>
      <>
        {totalPrice ? (
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        ) : null}
      </>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Icons.cart className="h-[1.2rem] w-[1.2rem]" />
          {totalItems ? (
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-gray-500 px-1 text-[0.6rem] text-white">
              {totalItems}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Product Cart</SheetTitle>
          <SheetDescription>
            {cart.length
              ? `You have added ${cart.length} items`
              : `You have not added any item to the cart.`}
          </SheetDescription>
        </SheetHeader>

        {/* Render cart items */}
        {cart.length > 0 && (
          <ul className="divide-y py-5">
            {cart.map((item) => (
              <CartDrawerItem key={item.id} item={item} />
            ))}
          </ul>
        )}

        {totalPrice ? (
          <div className="flex items-center justify-between border-t py-2">
            <p>Total Price: </p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        ) : null}

        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={handleRedirect}
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
