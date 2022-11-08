import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import db from "../../firebaseConfig";
import { destinationIds } from "../../firebaseFunction";

export const fetchDestinationId = createAsyncThunk("home/destinationIds" ,async () => {
  
  const data = await destinationIds().then((data) => data);
  
  return [...data];
});

const initialState = {
  getDestinations: {
    destinations: [],
    isLoading: true,
  },
};

export const destinationSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    getStateIds: (state, action) => {
    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinationId.pending, (state, action) => {
        state.getDestinations.isLoading = true;
      })
      .addCase(fetchDestinationId.fulfilled, (state, action) => {
        state.getDestinations.isLoading = false;
        state.getDestinations.destinations = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { getStateIds} = destinationSlice.actions;

export default destinationSlice.reducer;
