import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarVisible: true
};

export const toggleSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible;
    }
  }
});

export const selectSidebarState = (state: any) =>
  state.sidebar.isSidebarVisible;

export const sidebarReducer = toggleSlice.reducer;
export const { toggleSidebar } = toggleSlice.actions;
