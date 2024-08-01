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
import { Icons } from '../icons';

export default function CartComponent() {
  const cartItem = [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.cart className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Product Cart</SheetTitle>
          <SheetDescription>
            {cartItem.length
              ? `You have added ${cartItem.length} items`
              : `You have not added any item to cart, Please add some items to your cart. Please!`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex-grow"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" disabled={cartItem.length === 0}>
              Check Out
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
