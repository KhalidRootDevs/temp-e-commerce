import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isMinimized: boolean;
}

const initialState: SidebarState = {
  isMinimized: false
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isMinimized = !state.isMinimized;
    },
    setMinimized: (state, action: PayloadAction<boolean>) => {
      state.isMinimized = action.payload;
    }
  }
});

export const { toggle, setMinimized } = sidebarSlice.actions;
export default sidebarSlice.reducer;
