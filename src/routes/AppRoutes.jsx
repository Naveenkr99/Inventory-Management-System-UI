import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from '../features/products/ProductList';
import InventoryList from '../features/inventory/InventoryList';
import CartPage from '../features/cart/CartPage';
import PaymentPage from '../features/payment/PaymentPage';
import UserDetails from '../features/user/UserDetails';
import Login from '../features/auth/Login';
import AppLayout from '../components/Layout/AppLayout';

function AppRoutes() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/products" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/products"
          element={isAuthenticated ? <ProductList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/inventory"
          element={
            isAuthenticated ? (
              role === 'admin' ? <InventoryList /> : <Navigate to="/products" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              role === 'customer' ? <CartPage /> : <Navigate to="/products" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated ? (
              role === 'customer' ? <PaymentPage /> : <Navigate to="/products" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/users/:id"
          element={isAuthenticated ? <UserDetails /> : <Navigate to="/login" replace />}
        />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? '/products' : '/login'} replace />} />
    </Routes>
  );
}

export default AppRoutes;
