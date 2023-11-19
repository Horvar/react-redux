import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  itemsPerPage: number;
}

const initialState: SearchState = {
  searchTerm: '',
  itemsPerPage: 10,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setSearchTerm, setItemsPerPage } = searchSlice.actions;

export default searchSlice.reducer;
