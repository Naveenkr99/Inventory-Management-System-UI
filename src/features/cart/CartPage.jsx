import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/formatters';
import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from './cartSlice';
import styles from './CartPage.module.css';

function CartPage() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const cartItems = useSelector((state) => state.cart.items);
  const [orderMessage, setOrderMessage] = useState('');

  const currentLocale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
  const cartTotal = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  const handlePlaceOrder = () => {
    if (!cartItems.length) return;
    dispatch(clearCart());
    setOrderMessage(t('cart.orderSuccess'));
    setTimeout(() => setOrderMessage(''), 3000);
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>{t('cart.title')}</h1>
          <p>{t('cart.cartSubtitle')}</p>
        </div>
        <div className={styles.summary}>
          <span>{t('cart.total')}: {formatCurrency(cartTotal, currentLocale)}</span>
        </div>
      </header>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>{t('cart.emptyState')}</div>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemDetails}>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <span>{formatCurrency(item.price, currentLocale)}</span>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantityControl}>
                  <button type="button" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button type="button" className={styles.removeButton} onClick={() => dispatch(removeFromCart(item.id))}>
                  {t('cart.remove')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.placeOrderButton} disabled={cartItems.length === 0} onClick={handlePlaceOrder}>
          {t('cart.placeOrder')}
        </button>
      </div>
      {orderMessage && <p className={styles.orderMessage}>{orderMessage}</p>}
    </section>
  );
}

export default CartPage;
