import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../firebaseConfig";
import { getPropertiesByDestinationId } from "../../firebaseFunction";

export const fetchHotelsByDestinationId = createAsyncThunk(
  "/hotels/destinationID/hotelList",async (id) => {
    const data = await getPropertiesByDestinationId(id).then((data) => data.listHotels);
    return [...data];
  });
const initialState = {
  getHotelByDestinationId: {
    hotels: [],
    isLoading: true,
  },
  getHotelReservationInfo: {
    checkAvailable: [],
    isLoading: true,
  },
};

export const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {test : (state,action) => console.log("test work")},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelsByDestinationId.pending, (state, action) => {
        state.getHotelByDestinationId.isLoading = true;
 
      })
      .addCase(fetchHotelsByDestinationId.fulfilled, (state, action) => {
        state.getHotelByDestinationId.isLoading = false;
        state.getHotelByDestinationId.hotels = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { test } = hotelSlice.actions;

export default hotelSlice.reducer;
