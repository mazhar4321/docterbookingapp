import { createSlice } from '@reduxjs/toolkit';

const phoneSlice = createSlice({
  name: 'phone',
  initialState: null,
  reducers: {
    setPhoneNumber: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPhoneNumber } = phoneSlice.actions;
export default phoneSlice.reducer;