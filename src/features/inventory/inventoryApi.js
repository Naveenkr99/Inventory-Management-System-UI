import { apiClient } from '../../services/apiClient';

export const getInventoryApi = (params) =>
  apiClient.request({
    method: 'get',
    url: '/api/inventory',
    params,
  });

export const updateInventoryApi = ({ id, payload }) =>
  apiClient.request({
    method: 'put',
    url: `/api/inventory/${id}`,
    data: payload,
  });
