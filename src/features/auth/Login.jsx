import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loginSuccess } from './authSlice';
import styles from './Login.module.css';

const adminCredentials = {
  id: 'admin',
  password: 'admin123',
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userType, setUserType] = useState('customer');
  const [customerMethod, setCustomerMethod] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const validateCustomer = () => {
    if (customerMethod === 'mobile') {
      return /^\d{10}$/.test(mobile.trim());
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (userType === 'customer') {
      if (!validateCustomer()) {
        setError(t('auth.loginError'));
        return;
      }
      dispatch(loginSuccess({ role: 'customer', userType: 'customer' }));
      navigate('/products');
      return;
    }

    if (adminId.trim() === adminCredentials.id && adminPassword === adminCredentials.password) {
      dispatch(loginSuccess({ role: 'admin', userType: 'admin' }));
      navigate('/products');
      return;
    }

    setError(t('auth.loginError'));
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>{t('auth.loginTitle')}</h1>
        <p>{t('auth.loginPrompt')}</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="customer"
              checked={userType === 'customer'}
              onChange={() => setUserType('customer')}
            />
            {t('auth.customer')}
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="admin"
              checked={userType === 'admin'}
              onChange={() => setUserType('admin')}
            />
            {t('auth.admin')}
          </label>

          {userType === 'customer' ? (
            <>
              <div className={styles.switchRow}>
                <label className={styles.radioLabelSmall}>
                  <input
                    type="radio"
                    value="mobile"
                    checked={customerMethod === 'mobile'}
                    onChange={() => setCustomerMethod('mobile')}
                  />
                  {t('auth.mobile')}
                </label>
                <label className={styles.radioLabelSmall}>
                  <input
                    type="radio"
                    value="gmail"
                    checked={customerMethod === 'gmail'}
                    onChange={() => setCustomerMethod('gmail')}
                  />
                  {t('auth.gmail')}
                </label>
              </div>
              {customerMethod === 'mobile' ? (
                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  placeholder={t('auth.mobilePlaceholder')}
                />
              ) : (
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('auth.gmailPlaceholder')}
                />
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                value={adminId}
                onChange={(event) => setAdminId(event.target.value)}
                placeholder={t('auth.adminIdPlaceholder')}
              />
              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                placeholder={t('auth.adminPasswordPlaceholder')}
              />
            </>
          )}

          {error && <p className={styles.loginError}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            {t('auth.login')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
