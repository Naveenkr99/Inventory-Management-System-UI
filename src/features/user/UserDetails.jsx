import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUserById } from '../../services/userApi';
import { formatCurrency, formatDate } from '../../utils/formatters';
import styles from './UserDetails.module.css';

function UserDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentLocale = i18n.language === 'hi' ? 'hi-IN' : i18n.language === 'de' ? 'de-DE' : i18n.language === 'fr' ? 'fr-FR' : 'en-US';

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedUser = await getUserById(id);
        setUser(fetchedUser);
      } catch (fetchError) {
        setError(fetchError?.message || t('common.loadingError'));
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, t]);

  if (loading) {
    return <div className={styles.loading}>{t('common.loading')}</div>;
  }

  if (error) {
    return <div className={styles.error}>{`${t('common.errorPrefix')}: ${error}`}</div>;
  }

  if (!user) {
    return <div className={styles.emptyState}>{t('user.noData')}</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.userCard}>
        <div className={styles.headerRow}>
          <h1>{t('user.profileTitle')}</h1>
          <span className={styles.subTitle}>{t('user.userInfo')}</span>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userField}>
            <span>{t('user.id')}</span>
            <strong>{user.id}</strong>
          </div>
          <div className={styles.userField}>
            <span>{t('user.username')}</span>
            <strong>{user.username}</strong>
          </div>
          <div className={styles.userField}>
            <span>{t('user.email')}</span>
            <strong>{user.email}</strong>
          </div>
          <div className={styles.userField}>
            <span>{t('user.phone')}</span>
            <strong>{user.phoneNumber || t('user.noPhone')}</strong>
          </div>
        </div>
      </div>

      <div className={styles.ordersSection}>
        <div className={styles.sectionHeader}>
          <h2>{t('user.ordersTitle')}</h2>
          <span>{user.orders?.length || 0} {t('user.ordersLabel')}</span>
        </div>

        {Array.isArray(user.orders) && user.orders.length > 0 ? (
          user.orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <strong>{t('user.orderId')}:</strong> {order.id}
                </div>
                <div>
                  <strong>{t('user.orderStatus')}:</strong> {order.status}
                </div>
              </div>
              <div className={styles.orderMeta}>
                <span>
                  <strong>{t('user.orderedAt')}:</strong> {formatDate(order.orderedAt, currentLocale)}
                </span>
              </div>

              <div className={styles.itemsTable}>
                <div className={styles.itemsHeader}>
                  <span>{t('user.product')}</span>
                  <span>{t('user.sku')}</span>
                  <span>{t('user.price')}</span>
                  <span>{t('user.quantity')}</span>
                  <span>{t('user.location')}</span>
                </div>
                {order.orderItems.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <span>{item.product?.name || '-'}</span>
                    <span>{item.product?.sku || '-'}</span>
                    <span>{formatCurrency(item.product?.price || 0, currentLocale)}</span>
                    <span>{item.quantity}</span>
                    <span>{item.location?.name || item.location?.city || '-'}</span>
                  </div>
                ))}
              </div>

              {order.orderItems.map((item) => (
                <div key={`location-${item.id}`} className={styles.itemLocation}>
                  <p className={styles.locationTitle}>{t('user.location')}:</p>
                  <div>
                    <span>{item.location?.address || '-'}</span>
                    <span>
                      {item.location?.city}, {item.location?.state} {item.location?.zipCode}
                    </span>
                    <span>{item.location?.country}</span>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>{t('user.noOrders')}</div>
        )}
      </div>
    </section>
  );
}

export default UserDetails;
