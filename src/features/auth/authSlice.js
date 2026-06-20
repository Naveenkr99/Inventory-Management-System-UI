import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: 'customer',
  userType: 'customer',
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userType = action.payload.userType;
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = 'customer';
      state.userType = 'customer';
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;
