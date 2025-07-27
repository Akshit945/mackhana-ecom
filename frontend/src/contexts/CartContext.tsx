import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
  _id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  uniqueItems: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { _id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Load initial state from localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    uniqueItems: 0,
  };
};

const initialState: CartState = loadCartFromStorage();

// Save cart state to localStorage
const saveCartToStorage = (state: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      const quantityToAdd = action.payload.quantity || 1;
      
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: quantityToAdd }];
      }

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const uniqueItems = updatedItems.length;

      newState = { items: updatedItems, totalItems, totalPrice, uniqueItems };
      break;
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item._id !== action.payload);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const uniqueItems = updatedItems.length;

      newState = { items: updatedItems, totalItems, totalPrice, uniqueItems };
      break;
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity === 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload._id });
      }

      const updatedItems = state.items.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const uniqueItems = updatedItems.length;

      newState = { items: updatedItems, totalItems, totalPrice, uniqueItems };
      break;
    }

    case 'CLEAR_CART':
      newState = {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        uniqueItems: 0,
      };
      break;

    default:
      return state;
  }
  
  // Save to localStorage
  saveCartToStorage(newState);
  return newState;
};

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (_id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: _id });
  };

  const updateQuantity = (_id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { _id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider ');
  }
  return context;
};