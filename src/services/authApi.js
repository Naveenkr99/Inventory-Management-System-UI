import { apiClient } from './apiClient';

const AUTH_API_BASE_URL = 'http://localhost:8080';
const GOOGLE_AUTH_ROUTE = '/api/auth/google';

const decodeJwt = (token) => {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  if (!base64Url) return null;

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const loginWithGoogle = async (credential) => {
  if (!credential) {
    throw new Error('Google sign-in failed. Missing credential.');
  }

  try {
    const response = await apiClient.axiosClient.post(
      GOOGLE_AUTH_ROUTE,
      { token: credential },
      { baseURL: AUTH_API_BASE_URL }
    );

    const payload = response.data?.data ?? response.data;

    return {
      user: payload.user || payload,
      token: payload.token,
      role: payload.role,
    };
  } catch (error) {
    const payload = decodeJwt(credential);

    if (!payload) {
      throw new Error('Could not decode Google credential.');
    }

    return {
      user: {
        id: payload.sub,
        username: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
      token: credential,
      role: 'customer',
    };
  }
};
