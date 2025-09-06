import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

const CART_STORAGE_KEY = '@quickbite_cart';
const FAVORITES_STORAGE_KEY = '@quickbite_favorites';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      const newFavorites = isFavorite
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      return { ...state, favorites: newFavorites };
    default:
      return state;
  }
};

const initialState = {
  cart: [],
  favorites: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart and favorites from AsyncStorage on app start
  useEffect(() => {
    loadStoredData();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    if (state.cart.length >= 0) {
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    }
  }, [state.cart]);

  // Save favorites to AsyncStorage whenever they change
  useEffect(() => {
    if (state.favorites.length >= 0) {
      AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favorites));
    }
  }, [state.favorites]);

  const loadStoredData = async () => {
    try {
      const [cartData, favoritesData] = await Promise.all([
        AsyncStorage.getItem(CART_STORAGE_KEY),
        AsyncStorage.getItem(FAVORITES_STORAGE_KEY)
      ]);

      if (cartData) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(cartData) });
      }
      if (favoritesData) {
        dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(favoritesData) });
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: item.quantity || 1 } });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleFavorite = (itemId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: itemId });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isFavorite = (itemId) => {
    return state.favorites.includes(itemId);
  };

  const value = {
    cart: state.cart,
    favorites: state.favorites,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleFavorite,
    getCartTotal,
    getCartItemCount,
    isFavorite,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
