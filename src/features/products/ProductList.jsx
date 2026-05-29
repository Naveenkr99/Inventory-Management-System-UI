import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/Table/DataTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import SkeletonTable from '../../components/Loader/SkeletonTable';
import useDebounce from '../../hooks/useDebounce';
import { formatCurrency } from '../../utils/formatters';
import styles from './Product.module.css';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  setProductPage,
  setProductSearch,
  updateProduct,
} from './productSlice';
import { addToCart, updateCartQuantity } from '../cart/cartSlice';

const emptyForm = {
  name: '',
  sku: '',
  category: '',
  price: '',
  status: 'Active',
};

function ProductList() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { products, loading, error, pagination, filters } = useSelector((state) => state.products);
  const role = useSelector((state) => state.auth.role);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(filters.search);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, filters.search, pagination.page]);

  useEffect(() => {
    dispatch(setProductSearch(debouncedSearch.trim()));
  }, [debouncedSearch, dispatch]);

  const currentLocale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
  const visibleProducts = products;

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartLabel = cartCount > 0 ? `${t('cart.title')} (${cartCount})` : t('cart.title');

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const handleQuantityChange = useCallback(
    (productId, quantity) => {
      dispatch(updateCartQuantity({ id: productId, quantity }));
    },
    [dispatch]
  );

  const adminColumns = useMemo(
    () => [
      { key: 'id', label: t('products.fields.id') },
      { key: 'name', label: t('products.fields.name') },
      { key: 'description', label: t('products.fields.description') },
      { key: 'category', label: t('products.fields.category') },
      { key: 'price', label: t('products.fields.price'), render: (row) => formatCurrency(row.price, currentLocale) },
      {
        key: 'actions',
        label: t('common.actions'),
        render: (row) => (
          <div className={styles.actionGroup}>
            <button type="button" onClick={() => beginEdit(row)}>
              {t('common.edit')}
            </button>
            <button type="button" className={styles.danger} onClick={() => dispatch(deleteProduct(row.id))}>
              {t('common.delete')}
            </button>
          </div>
        ),
      },
    ],
    [currentLocale, dispatch, t]
  );

  const customerColumns = useMemo(
    () => [
      { key: 'id', label: t('products.fields.id') },
      { key: 'name', label: t('products.fields.name') },
      { key: 'description', label: t('products.fields.description') },
      { key: 'category', label: t('products.fields.category') },
      { key: 'price', label: t('products.fields.price'), render: (row) => formatCurrency(row.price, currentLocale) },
      {
        key: 'actions',
        label: t('common.actions'),
        render: (row) => {
          const cartItem = cartItems.find((item) => item.id === row.id);
          if (cartItem) {
            return (
              <div className={styles.quantityControl}>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(row.id, cartItem.quantity - 1)}
                >
                  -
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(row.id, cartItem.quantity + 1)}
                >
                  +
                </button>
              </div>
            );
          }

          return (
            <button
              type="button"
              className={styles.cartButton}
              onClick={() => handleAddToCart(row)}
            >
              {t('cart.addToCart')}
            </button>
          );
        },
      },
    ],
    [cartItems, currentLocale, handleAddToCart, t]
  );

  const columns = role === 'admin' ? adminColumns : customerColumns;

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const beginEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: String(product.price),
      status: product.status,
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
    };
    if (editingId) {
      dispatch(updateProduct({ id: editingId, payload }));
    } else {
      dispatch(createProduct(payload));
    }
    resetForm();
  };

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder={t('products.searchPlaceholder')}
        />
        {role === 'customer' && (
          <button type="button" className={styles.cartTopButton} onClick={() => navigate('/cart')}>
            {cartLabel}
          </button>
        )}
      </div>

      {role === 'admin' ? (
        <form className={styles.formGrid} onSubmit={submitForm}>
          <input value={form.name} onChange={(e) => handleFormChange('name', e.target.value)} placeholder={t('products.fields.name')} required />
          <input value={form.sku} onChange={(e) => handleFormChange('sku', e.target.value)} placeholder={t('products.fields.sku')} required />
          <input value={form.category} onChange={(e) => handleFormChange('category', e.target.value)} placeholder={t('products.fields.category')} required />
          <input type="number" step="0.01" value={form.price} onChange={(e) => handleFormChange('price', e.target.value)} placeholder={t('products.fields.price')} required />
          <select value={form.status} onChange={(e) => handleFormChange('status', e.target.value)}>
            <option value="Active">{t('products.status.active')}</option>
            <option value="Inactive">{t('products.status.inactive')}</option>
          </select>
          <div className={styles.formActions}>
            <button type="submit">{editingId ? t('products.updateProduct') : t('products.addProduct')}</button>
            {editingId && (
              <button type="button" onClick={resetForm}>
                {t('common.cancel')}
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className={styles.customerMessage}>{t('products.customerNote')}</div>
      )}


      {error && <p className={styles.error}>{t('common.errorPrefix')}: {error}</p>}
      {loading ? (
        <SkeletonTable />
      ) : (
        <DataTable
          columns={columns}
          rows={visibleProducts}
          emptyMessage={t('products.emptyState')}
        />
      )}

      {role === 'admin' && (
        <div className={styles.pagination}>
          <button type="button" disabled={pagination.page <= 1} onClick={() => dispatch(setProductPage(pagination.page - 1))}>
            {t('common.previous')}
          </button>
          <span>
            {t('products.pageStatus', {
              page: pagination.page,
              total: pagination.totalPages || 1,
            })}
          </span>
          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => dispatch(setProductPage(pagination.page + 1))}
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductList;
