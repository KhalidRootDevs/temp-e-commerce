import create from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,

  addToCart: (item: CartItem) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = state.cart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
        return {
          cart: updatedCart,
          totalItems: state.totalItems + item.quantity,
          totalPrice: state.totalPrice + item.price * item.quantity
        };
      } else {
        // Item doesn't exist, add it
        return {
          cart: [...state.cart, item],
          totalItems: state.totalItems + item.quantity,
          totalPrice: state.totalPrice + item.price * item.quantity
        };
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const item = state.cart.find((cartItem) => cartItem.id === id);
      if (!item) return state;
      if (item.quantity > 1) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - item.price
        };
      }
      return {
        cart: state.cart.filter((cartItem) => cartItem.id !== id),
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - item.price
      };
    }),

  clearCart: () =>
    set(() => ({
      cart: [],
      totalItems: 0,
      totalPrice: 0
    }))
}));

export default useCartStore;
