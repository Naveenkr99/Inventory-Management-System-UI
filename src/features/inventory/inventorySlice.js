import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getInventoryApi, updateInventoryApi } from './inventoryApi';

const initialState = {
  inventoryItems: [],
  loading: false,
  error: null,
  filters: {
    search: '',
  },
};

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { search } = getState().inventory.filters;
      return await getInventoryApi({ search });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInventory = createAsyncThunk(
  'inventory/updateInventory',
  async ({ id, payload }, { dispatch, rejectWithValue }) => {
    try {
      await updateInventoryApi({ id, payload });
      dispatch(fetchInventory());
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventorySearch(state, action) {
      state.filters.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventoryItems = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInventory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setInventorySearch } = inventorySlice.actions;
export default inventorySlice.reducer;
