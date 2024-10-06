import { addToCart, removeFromCart } from '@/features/cart/cartSlice';
import { RootState } from '@/features/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartDetailsItemProps {
  item: CartItem;
}

export default function CartDetailsItem({ item }: CartDetailsItemProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      setItemQuantity(cartItem.quantity);
    }
  }, [cart, item.id]);

  const handleIncreaseQuantity = () => {
    if (!item.id) return;

    setItemQuantity(itemQuantity + 1);
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      })
    );
  };

  const handleDecreaseQuantity = () => {
    if (!item.id) return;

    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: -1
        })
      );
    } else {
      dispatch(removeFromCart(item.id));
      setItemQuantity(1);
    }
  };

  return (
    <li key={item.id} className="grid grid-cols-6 gap-5 space-y-2 py-4">
      <div className="col-span-3">{item.name}</div>
      <div className="col-span-1">${item.price}</div>
      <div className="grid w-20 grid-cols-3 items-center gap-2 rounded-full border px-2 py-1">
        <button onClick={handleDecreaseQuantity}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncreaseQuantity}>+</button>
      </div>
      <div className="col-span-1 text-end">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </li>
  );
}
