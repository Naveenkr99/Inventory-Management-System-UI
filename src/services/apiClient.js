import axios from 'axios';
import { mockServerRequest } from './mockServer';

const baseClient = axios.create({
  timeout: 5000,
});

baseClient.interceptors.request.use((config) => config);
baseClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const normalizeError = (error) => ({
  status: error?.status || error?.response?.status || 500,
  message: error?.message || 'Unexpected error occurred',
});

const withRetry = async (operation, maxRetries = 1) => {
  let attempts = 0;
  while (attempts <= maxRetries) {
    try {
      return await operation();
    } catch (error) {
      attempts += 1;
      if (attempts > maxRetries) throw error;
    }
  }
  throw new Error('Retry loop ended unexpectedly.');
};

export const apiClient = {
  request: async ({ method, url, data, params, retries = 1 }) => {
    try {
      const response = await withRetry(
        () => mockServerRequest({ method, url, data, params }),
        retries
      );
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  },
  axiosClient: baseClient,
};
