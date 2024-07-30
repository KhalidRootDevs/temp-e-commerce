import { createSlice } from "@reduxjs/toolkit";
// Define a function to load cart state from local storage
export const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    return [];
  }
};
export const saveCartState = state => {
  try {
    const existingState = loadCartState();
    const mergedState = [...existingState, state];
    const serializedState = JSON.stringify(mergedState);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Handle errors
  }
};
export const updateItemQuantityInLocalStorage = (itemId, newQuantity) => {
  try {
    const cartState = loadCartState();
    const updatedCartState = cartState.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCartState));
  } catch (err) {
    // Handle errors
  }
};
export const deleteItemQuantityInLocalStorage = itemId => {
  try {
    const cartState = loadCartState();
    const updatedCartState = cartState.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCartState));
  } catch (err) {
    // Handle errors
  }
};
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartState(), // Load initial state from local storage
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find(item => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
        const localStorageExjest = loadCartState().find(item => item.id === action.payload.id);
        if (localStorageExjest) {
          localStorageExjest.quantity++;
          updateItemQuantityInLocalStorage(localStorageExjest.id, localStorageExjest.quantity); // Update quantity in local storage
        }
      } else {
        state.push({ ...action.payload, quantity: 1 });
        saveCartState({ ...action.payload, quantity: 1 }); // Save updated state to local storage
      }
    },
    CardItem: (state, action) => {
      const uniqueItems = action.payload.filter(item => !state.some(item1 => item1.id === item.id));
      state.push(...uniqueItems);
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      item.quantity++;
      const localStorageExjest = loadCartState().find(item => item.id === action.payload);
      if (localStorageExjest) {
        localStorageExjest.quantity++;
        updateItemQuantityInLocalStorage(localStorageExjest.id, localStorageExjest.quantity); // Update quantity in local storage
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex(item => item.id === action.payload);
        // state.splice(index, 1);
      } else {
        item.quantity--;
        const localStorageExjest = loadCartState().find(item => item.id === action.payload);
        if (localStorageExjest) {
          localStorageExjest.quantity--;
          updateItemQuantityInLocalStorage(localStorageExjest.id, localStorageExjest.quantity); // Update quantity in local storage
        }
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      // Filter out the item to be removed and return the new state
      const updatedState = state.filter(item => item.id !== itemId);
      // Update the local storage
      deleteItemQuantityInLocalStorage(itemId);
      // Return the updated state
      return updatedState;
    }
  }
});

// Export selectors and reducer
export const selectCartItems = state => state.cart;

export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, CardItem, decrementQuantity, removeFromCart } = cartSlice.actions;
