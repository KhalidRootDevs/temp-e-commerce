import { Button } from '@/components/ui/button';
import useCartStore from '@/store/cartStore';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, removeFromCart } = useCartStore();
  const [isInCart, setIsInCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    const isInCart = cart.some((item) => item.id === product.id);
    setIsInCart(isInCart);
    if (isInCart) {
      const item = cart.find((item) => item.id === product.id);
      setItemQuantity(item?.quantity || 1);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    if (!product.id) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: itemQuantity
    });
  };

  const handleIncreaseQuantity = () => {
    if (!product.id) return;
    const newQty = itemQuantity + 1;
    setItemQuantity(newQty);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  const handleDecreaseQuantity = () => {
    if (!product.id) return;
    if (itemQuantity > 1) {
      const newQty = itemQuantity - 1;
      setItemQuantity(newQty);
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: -1
      });
    } else {
      removeFromCart(product.id);
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
        <div className="flex items-center justify-between space-x-2">
          <span className="text-sm text-gray-600">$ {product.price}</span>
          {!isInCart ? (
            <Button
              variant="outline"
              size="sm"
              className=""
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          ) : (
            <>
              <span>{`${itemQuantity} x`}</span>
              <Button onClick={handleIncreaseQuantity}>+</Button>
              <Button onClick={handleDecreaseQuantity}>-</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
