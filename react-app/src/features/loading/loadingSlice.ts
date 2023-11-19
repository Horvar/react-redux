import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainPageLoading: false,
  detailsPageLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setMainPageLoading: (state, action) => {
      state.mainPageLoading = action.payload;
    },
    setDetailsPageLoading: (state, action) => {
      state.detailsPageLoading = action.payload;
    },
  },
});

export const { setMainPageLoading, setDetailsPageLoading } =
  loadingSlice.actions;
export default loadingSlice.reducer;
