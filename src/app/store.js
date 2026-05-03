import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import inventoryReducer from '../features/inventory/inventorySlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    inventory: inventoryReducer,
  },
});
