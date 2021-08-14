import { createSlice } from '@reduxjs/toolkit';

const initialUIState = { willDelete: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    showModal(state) {
      state.willDelete = true;
    },

    closeModal(state) {
      state.willDelete = false;
    },
  },
});

export default uiSlice.reducer;
export const { showModal, closeModal } = uiSlice.actions;
