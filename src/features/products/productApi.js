import { apiClient } from '../../services/apiClient';

// const PRODUCTS_API_BASE_URL = 'http://localhost:8080';
const PRODUCTS_API_BASE_URL='https://inventory-management-system-production-67a5.up.railway.app';
const PRODUCTS_API_AUTH = 'Basic YWRtaW46Y2ZhYTA0Y2YtM2U3NS00MGIxLTgxNmQtOTlmNzE3MDM4Yjc0';

const getProductHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: PRODUCTS_API_AUTH,
});

const applyProductFilters = (products, search = '') => {
  const query = search.trim().toLowerCase();
  if (!query) return products;

  return products.filter((product) =>
    [product.name, product.sku, product.category].some((value) =>
      String(value || '').toLowerCase().includes(query)
    )
  );
};

const paginateProducts = (products, page = 1, pageSize = 5) => {
  const safePage = Number(page) || 1;
  const safePageSize = Number(pageSize) || 5;
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(safePage, 1), totalPages);
  const startIndex = (currentPage - 1) * safePageSize;

  return {
    items: products.slice(startIndex, startIndex + safePageSize),
    pagination: {
      page: currentPage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    },
  };
};

const extractProducts = (response) => {
  const payload = response?.data;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;

  return [];
};

export const getProductsApi = async (params = {}) => {
  const response = await apiClient.axiosClient.get('/api/products', {
    baseURL: PRODUCTS_API_BASE_URL,
    headers: getProductHeaders(),
  });

  const products = extractProducts(response);
  const filtered = applyProductFilters(products, params.search);
  return paginateProducts(filtered, params.page, params.pageSize);
};

export const createProductApi = (payload) =>
  apiClient.axiosClient.request({
    method: 'post',
    url: '/api/products/add',
    data: payload,
    baseURL: PRODUCTS_API_BASE_URL,
    headers: getProductHeaders(),
  });

export const updateProductApi = ({ id, payload }) =>
  apiClient.axiosClient.request({
    method: 'put',
    url: `/api/products/${id}`,
    data: payload,
    baseURL: PRODUCTS_API_BASE_URL,
    headers: getProductHeaders(),
  });

export const deleteProductApi = (id) =>
  apiClient.axiosClient.request({
    method: 'delete',
    url: `/api/products/${id}`,
    baseURL: PRODUCTS_API_BASE_URL,
    headers: getProductHeaders(),
  });
