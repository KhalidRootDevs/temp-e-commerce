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
import useCartStore from '@/store/cartStore';
import { Icons } from '../../../components/icons';

export default function CartComponent() {
  const { cart, totalItems, totalPrice } = useCartStore();

  console.log(cart, totalItems, totalPrice);

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
              : `You have not added any item to cart, Please add some items to your cart. Please!`}
          </SheetDescription>
        </SheetHeader>
        {/* Render cart items */}
        {cart.length > 0 && (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div className="space-x-2">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <span>x{item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex-1 flex-grow"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" disabled={cart.length === 0}>
              Check Out
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
