import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/utils/CartContext';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </CartProvider>
  );
}
