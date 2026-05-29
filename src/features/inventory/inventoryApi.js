import { apiClient } from '../../services/apiClient';

const PRODUCTS_API_BASE_URL='https://inventory-management-system-production-67a5.up.railway.app';
const PRODUCTS_API_AUTH = 'Basic YWRtaW46Y2ZhYTA0Y2YtM2U3NS00MGIxLTgxNmQtOTlmNzE3MDM4Yjc0';

const getProductHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: PRODUCTS_API_AUTH,
});

// Transform API response to match table structure
const transformInventoryData = (items) => {
  return items.map((item) => ({
    id: item.id,
    productId: item.product?.id,
    productName: item.product?.name || 'N/A',
    productSku: item.product?.sku,
    productCategory: item.product?.category,
    productPrice: item.product?.price,
    location: item.location?.name || 'N/A',
    address: item.location?.address,
    city: item.location?.city,
    state: item.location?.state,
    zipCode: item.location?.zipCode,
    country: item.location?.country,
    quantity: item.quantity || 0,
    minStockLevel: item.minStockLevel || 0,
    maxStockLevel: item.maxStockLevel || 0,
    availableQuantity: item.quantity || 0,
    reservedQuantity: 0,
    warehouseLocation: item.location?.name || '',
    lastUpdated: new Date().toISOString(),
  }));
};

export const getInventoryApi = async (params = {}) => {
  try {
    const response = await apiClient.axiosClient.get('/api/inventory', {
      baseURL: PRODUCTS_API_BASE_URL,
      headers: getProductHeaders(),
    });

    // Extract data array and transform it
    if (response.data?.data && Array.isArray(response.data.data)) {
      return transformInventoryData(response.data.data);
    }
    return [];
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};  


// export const getInventoryApi = (params) =>
//   apiClient.request({
//     method: 'get',
//     url: '/api/inventory',
//     params,
//   });

export const updateInventoryApi = ({ id, payload }) =>
  apiClient.request({
    method: 'put',
    url: `/api/inventory/${id}`,
    data: payload,
  });
