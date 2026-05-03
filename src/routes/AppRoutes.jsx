import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductList from '../features/products/ProductList';
import InventoryList from '../features/inventory/InventoryList';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/inventory" element={<InventoryList />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}

export default AppRoutes;
