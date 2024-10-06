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

interface CartItemProps {
  item: CartItem;
}

export default function CartDrawerItem({ item }: CartItemProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    const isInCart = cart.some((cartItem) => cartItem.id === item.id);
    if (isInCart) {
      const filteredItem = cart.find((cartItem) => cartItem.id === item?.id);
      setItemQuantity(filteredItem?.quantity || 1);
    }
  }, [cart, item.id]);

  const handleIncreaseQuantity = () => {
    if (!item.id) return;
    const newQty = itemQuantity + 1;
    setItemQuantity(newQty);

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
      const newQty = itemQuantity - 1;
      setItemQuantity(newQty);

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
    <li key={item.id} className="space-y-1 p-1">
      <div className="flex items-center justify-between">
        <span className="col-span-2">{item.name}</span>
        <span>
          ${item.price}x{item.quantity}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="grid w-20 grid-cols-3 items-center gap-2 rounded-full border px-2 py-0.5">
          <button onClick={handleDecreaseQuantity}>-</button>
          <span>{itemQuantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
        <div>≈ ${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    </li>
  );
}
