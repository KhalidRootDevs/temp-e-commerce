import { Button } from '@/components/ui/button';
import { addToCart, removeFromCart } from '@/features/cart/cartSlice';
import { RootState } from '@/features/store';

import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [isInCart, setIsInCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    const itemInCart = cart.find((item) => item.id === product.id);
    setIsInCart(!!itemInCart);
    if (itemInCart) {
      setItemQuantity(itemInCart.quantity);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    if (!product.id) return;

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: itemQuantity
      })
    );
  };

  const handleIncreaseQuantity = () => {
    if (!product.id) return;

    setItemQuantity(itemQuantity + 1);
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    );
  };

  const handleDecreaseQuantity = () => {
    if (!product.id) return;

    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: -1
        })
      );
    } else {
      dispatch(removeFromCart(product.id));
      setItemQuantity(1);
    }
  };

  return (
    <div className="rounded-lg border border-gray-100 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full rounded-t-lg object-cover"
      />
      <div className="rounded-b-lg p-2">
        <h3 className="mt-2 text-sm font-medium text-gray-700">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">
          {product.description.substring(0, 100)}...
        </p>
        <div className="flex items-center justify-between space-x-2 border-t pt-2">
          <span className="text-base font-medium text-gray-800">
            $ {product.price}
          </span>
          {!isInCart ? (
            <Button variant="outline" size="sm" onClick={handleAddToCart}>
              Add to cart
            </Button>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              <Button
                variant="default"
                size="sm"
                onClick={handleDecreaseQuantity}
              >
                -
              </Button>
              <span className="w-10 p-1 text-center text-sm">{`${itemQuantity}`}</span>
              <Button
                variant="default"
                size="sm"
                onClick={handleIncreaseQuantity}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
