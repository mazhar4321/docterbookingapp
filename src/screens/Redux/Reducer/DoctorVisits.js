import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  upcomingData: [],
  pastData: [],
};

const visitsSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    setUpcomingData: (state, action) => {
      state.upcomingData = action.payload;
    },
    setPastData: (state, action) => {
      state.pastData = action.payload;
    },
    moveVisitToPast: (state, action) => {
      const visitIdToMove = action.payload;
      // Find the visit in upcomingData
      const visitToMove = state.upcomingData.find((visit) => visit.visit_id === visitIdToMove);
      if (visitToMove) {
        // Remove the visit from upcomingData
        state.upcomingData = state.upcomingData.filter((visit) => visit.visit_id !== visitIdToMove);
        // Add the visit to pastData
        state.pastData.push(visitToMove);
      }
    },
  },
});

export const { setUpcomingData, setPastData, moveVisitToPast } = visitsSlice.actions;

export default visitsSlice.reducer;