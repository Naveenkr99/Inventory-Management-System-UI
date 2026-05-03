import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/Table/DataTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import SkeletonTable from '../../components/Loader/SkeletonTable';
import useDebounce from '../../hooks/useDebounce';
import { formatDate } from '../../utils/formatters';
import styles from './Inventory.module.css';
import { fetchInventory, setInventorySearch, updateInventory } from './inventorySlice';

function InventoryList() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { inventoryItems, loading, error, filters } = useSelector((state) => state.inventory);
  const [searchInput, setSearchInput] = useState(filters.search);
  const [editValues, setEditValues] = useState({});
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    dispatch(setInventorySearch(debouncedSearch.trim()));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch, filters.search]);

  const updateField = (id, key, value) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };

  const saveUpdate = (item) => {
    const edits = editValues[item.id] || {};
    dispatch(
      updateInventory({
        id: item.id,
        payload: {
          availableQuantity: Number(edits.availableQuantity ?? item.availableQuantity),
          reservedQuantity: Number(edits.reservedQuantity ?? item.reservedQuantity),
          warehouseLocation: edits.warehouseLocation ?? item.warehouseLocation,
        },
      })
    );
  };

  const currentLocale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';

  const columns = [
    { key: 'id', label: t('inventory.fields.id') },
    { key: 'productName', label: t('inventory.fields.productName') },
    {
      key: 'availableQuantity',
      label: t('inventory.fields.availableQuantity'),
      render: (row) => (
        <input
          className={styles.inlineInput}
          type="number"
          defaultValue={row.availableQuantity}
          onChange={(e) => updateField(row.id, 'availableQuantity', e.target.value)}
        />
      ),
    },
    {
      key: 'reservedQuantity',
      label: t('inventory.fields.reservedQuantity'),
      render: (row) => (
        <input
          className={styles.inlineInput}
          type="number"
          defaultValue={row.reservedQuantity}
          onChange={(e) => updateField(row.id, 'reservedQuantity', e.target.value)}
        />
      ),
    },
    {
      key: 'warehouseLocation',
      label: t('inventory.fields.warehouseLocation'),
      render: (row) => (
        <input
          className={styles.inlineInput}
          defaultValue={row.warehouseLocation}
          onChange={(e) => updateField(row.id, 'warehouseLocation', e.target.value)}
        />
      ),
    },
    {
      key: 'lastUpdated',
      label: t('inventory.fields.lastUpdated'),
      render: (row) => formatDate(row.lastUpdated, currentLocale),
    },
    {
      key: 'actions',
      label: t('common.actions'),
      render: (row) => (
        <button type="button" className={styles.saveButton} onClick={() => saveUpdate(row)}>
          {t('common.save')}
        </button>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder={t('inventory.searchPlaceholder')}
        />
      </div>
      <p className={styles.note}>
        {t('inventory.note')}
      </p>
      {error && <p className={styles.error}>{t('common.errorPrefix')}: {error}</p>}
      {loading ? (
        <SkeletonTable />
      ) : (
        <DataTable columns={columns} rows={inventoryItems} emptyMessage={t('inventory.emptyState')} />
      )}
    </section>
  );
}

export default InventoryList;
