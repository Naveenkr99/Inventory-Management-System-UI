import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../../features/auth/authSlice';
import styles from './AppLayout.module.css';

function AppLayout() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>{t('appName')}</h1>
        <nav className={styles.nav}>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {t('nav.products')}
          </NavLink>
          {role === 'admin' && (
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {t('nav.inventory')}
            </NavLink>
          )}
          {role === 'customer' && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {t('nav.cart')}
            </NavLink>
          )}
        </nav>
      </aside>
      
      <div className={styles.contentPanel}>
        <header className={styles.header}>
          <div>
            <h2>{t('header.title')}</h2>
            <p>{t('header.subtitle')}</p>
          </div>
          <div className={styles.headerControls}>
            <div className={styles.languageControl}>
              <label htmlFor="language">{t('language.label')}</label>
              <select
                id="language"
                value={i18n.language}
                onChange={(event) => i18n.changeLanguage(event.target.value)}
              >
                <option value="en">{t('language.english')}</option>
                <option value="hi">{t('language.hindi')}</option>
                <option value="de">{t('language.german')}</option>
                <option value="fr">{t('language.french')}</option>
              </select>
            </div>
            <button type="button" className={styles.logoutButton} onClick={() => dispatch(logout())}>
              {t('auth.logout')}
            </button>
          </div>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
