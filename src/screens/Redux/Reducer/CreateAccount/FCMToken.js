import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fcmToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFCMToken: (state, action) => {
      state.fcmToken = action.payload;
    },
  },
});

export const { setFCMToken } = authSlice.actions;

export const selectFCMToken = (state) => state.auth.fcmToken;

export default authSlice.reducer;