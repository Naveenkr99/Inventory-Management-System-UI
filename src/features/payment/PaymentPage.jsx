import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/formatters';
import { clearCart } from '../cart/cartSlice';
import { createOrder } from '../../services/orderApi';
import styles from './PaymentPage.module.css';

function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const cartItems = useSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentLocale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
  const cartTotal = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

  const handleConfirmPayment = async () => {
    if (!cartItems.length) return;

    if (paymentMethod === 'upi' && !upiId.trim()) {
      setStatusMessage(t('payment.enterUpiId'));
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        locationId: 111,
      }));

      const order = await createOrder(orderItems);
      dispatch(clearCart());
      setStatusMessage(
        paymentMethod === 'cod'
          ? `${t('payment.codSuccess')} (${order.id})`
          : `${t('payment.upiSuccess', { upiId })} (${order.id})`
      );
    } catch (error) {
      setStatusMessage(error.message || t('payment.orderError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>{t('payment.title')}</h1>
          <p>{t('payment.subtitle')}</p>
        </div>
        <div className={styles.summary}>
          <span>{t('cart.total')}: {formatCurrency(cartTotal, currentLocale)}</span>
        </div>
      </header>

      {!cartItems.length ? (
        <div className={styles.emptyState}>
          <p>{t('payment.emptyCart')}</p>
          <button type="button" onClick={handleContinueShopping} className={styles.backButton}>
            {t('payment.backToProducts')}
          </button>
        </div>
      ) : (
        <div className={styles.paymentContainer}>
          <div className={styles.methodSection}>
            <h2>{t('payment.chooseMethod')}</h2>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              {t('payment.cod')}
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              {t('payment.upi')}
            </label>

            {paymentMethod === 'upi' && (
              <div className={styles.inputGroup}>
                <label htmlFor="upiId">{t('payment.upiIdLabel')}</label>
                <input
                  id="upiId"
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder={t('payment.upiPlaceholder')}
                />
              </div>
            )}
          </div>

          <div className={styles.orderSummary}>
            <h2>{t('payment.orderSummary')}</h2>
            <ul className={styles.orderList}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.orderItem}>
                  <span>{item.name} x {item.quantity}</span>
                  <strong>{formatCurrency((item.price || 0) * item.quantity, currentLocale)}</strong>
                </li>
              ))}
            </ul>
            <div className={styles.totalAmount}>
              <span>{t('cart.total')}</span>
              <strong>{formatCurrency(cartTotal, currentLocale)}</strong>
            </div>
            <button type="button" className={styles.confirmButton} onClick={handleConfirmPayment} disabled={isSubmitting}>
              {isSubmitting ? t('payment.processing') : t('payment.confirmPayment')}
            </button>
            {statusMessage && <div className={styles.statusMessage}>{statusMessage}</div>}
          </div>
        </div>
      )}
    </section>
  );
}

export default PaymentPage;
