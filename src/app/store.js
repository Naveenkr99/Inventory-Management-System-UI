import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    inventory: inventoryReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
