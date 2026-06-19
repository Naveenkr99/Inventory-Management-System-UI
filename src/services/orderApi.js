import { apiClient } from './apiClient';

const API_BASE_URL = 'http://localhost:8080';
const PRODUCTS_API_AUTH = 'Basic YWRtaW46Y2ZhYTA0Y2YtM2U3NS00MGIxLTgxNmQtOTlmNzE3MDM4Yjc0';

const getProductHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: PRODUCTS_API_AUTH,
});

const DEFAULT_LOCATION_ID = 111;

export const createOrder = async (orderItems) => {
  const payload = {
    userId:1,
    items: orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      locationId: item.locationId || DEFAULT_LOCATION_ID,
    })),
  };

  try {
    const response = await apiClient.axiosClient.request({
      method: 'post',
      url: '/api/orders',
      data: payload,
      baseURL: API_BASE_URL,
      headers: getProductHeaders(),
    });
    return response.data;
  } catch (error) {
    const err = new Error(error?.response?.data?.message || error.message || 'Order request failed');
    err.status = error?.response?.status || 500;
    throw err;
  }
};
