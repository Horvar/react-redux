import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './features/search/searchSlice';
import { apiSlice } from './features/api/apiSlice';
import loadingSlice from './features/loading/loadingSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    loading: loadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
