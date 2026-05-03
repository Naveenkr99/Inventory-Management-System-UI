import { inventorySeed, productSeed } from '../utils/mockData';

const db = {
  products: [...productSeed],
  inventory: [...inventorySeed],
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldFail = () => false;

const makeResponse = (status, data) => ({
  status,
  data,
  headers: { 'x-mock': 'true' },
});

const applyProductFilters = (products, search = '') => {
  if (!search) return products;
  const normalized = search.toLowerCase();
  return products.filter(
    (item) =>
      item.name.toLowerCase().includes(normalized) ||
      item.sku.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized)
  );
};

const buildProductPage = (products, page = 1, pageSize = 5) => {
  const start = (page - 1) * pageSize;
  const paged = products.slice(start, start + pageSize);
  return {
    items: paged,
    pagination: {
      page,
      pageSize,
      totalItems: products.length,
      totalPages: Math.ceil(products.length / pageSize),
    },
  };
};

const resolveProductName = (productId) =>
  db.products.find((item) => item.id === productId)?.name || 'Unknown Product';

const applyInventoryFilters = (inventory, search = '') => {
  if (!search) return inventory;
  const normalized = search.toLowerCase();
  return inventory.filter((item) => {
    const productName = resolveProductName(item.productId).toLowerCase();
    return (
      productName.includes(normalized) ||
      item.warehouseLocation.toLowerCase().includes(normalized)
    );
  });
};

const withInventoryProductName = (items) =>
  items.map((item) => ({
    ...item,
    productName: resolveProductName(item.productId),
  }));

export const mockServerRequest = async (config) => {
  await wait(350);

  if (shouldFail()) {
    const error = new Error('Mock API temporary failure.');
    error.status = 503;
    throw error;
  }

  const method = (config.method || 'get').toLowerCase();
  const url = config.url || '';
  const params = config.params || {};
  const payload = config.data || {};

  if (method === 'get' && url === '/api/products') {
    const filtered = applyProductFilters(db.products, params.search);
    return makeResponse(200, buildProductPage(filtered, Number(params.page) || 1, Number(params.pageSize) || 5));
  }

  if (method === 'post' && url === '/api/products') {
    const created = {
      ...payload,
      id: payload.id || `P-${Math.floor(1000 + Math.random() * 9000)}`,
      createdDate: new Date().toISOString(),
    };
    db.products.unshift(created);
    return makeResponse(201, created);
  }

  if (method === 'put' && url.startsWith('/api/products/')) {
    const id = url.split('/').pop();
    const index = db.products.findIndex((item) => item.id === id);
    if (index === -1) throw Object.assign(new Error('Product not found'), { status: 404 });
    db.products[index] = { ...db.products[index], ...payload };
    return makeResponse(200, db.products[index]);
  }

  if (method === 'delete' && url.startsWith('/api/products/')) {
    const id = url.split('/').pop();
    db.products = db.products.filter((item) => item.id !== id);
    db.inventory = db.inventory.filter((item) => item.productId !== id);
    return makeResponse(204, { id });
  }

  if (method === 'get' && url === '/api/inventory') {
    const filtered = applyInventoryFilters(db.inventory, params.search);
    return makeResponse(200, withInventoryProductName(filtered));
  }

  if (method === 'put' && url.startsWith('/api/inventory/')) {
    const id = url.split('/').pop();
    const index = db.inventory.findIndex((item) => item.id === id);
    if (index === -1) throw Object.assign(new Error('Inventory item not found'), { status: 404 });
    db.inventory[index] = {
      ...db.inventory[index],
      ...payload,
      lastUpdated: new Date().toISOString(),
    };
    return makeResponse(200, {
      ...db.inventory[index],
      productName: resolveProductName(db.inventory[index].productId),
    });
  }

  throw Object.assign(new Error(`Route not implemented: ${method.toUpperCase()} ${url}`), {
    status: 404,
  });
};
