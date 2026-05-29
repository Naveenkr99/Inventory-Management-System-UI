import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: 'customer',
  userType: 'customer',
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
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = 'customer';
      state.userType = 'customer';
      state.error = null;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;
