import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    userDetails: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = doctorSlice.actions;
export default doctorSlice.reducer;