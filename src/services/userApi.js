import { apiClient } from './apiClient';

const USERS_API_BASE_URL = 'http://localhost:8080';
const API_AUTH = 'Basic YWRtaW46Y2ZhYTA0Y2YtM2U3NS00MGIxLTgxNmQtOTlmNzE3MDM4Yjc0';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: API_AUTH,
});

const extractUserPayload = (response) => {
  if (!response) return null;
  const data = response.data;
  if (data?.data) return data.data;
  return data;
};

export const getUserById = async (id) => {
  const response = await apiClient.axiosClient.get(`/api/users/${id}`, {
    baseURL: USERS_API_BASE_URL,
    headers: getHeaders(),
  });
  return extractUserPayload(response);
};
