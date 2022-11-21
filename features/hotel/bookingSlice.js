import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import db from "../../firebaseConfig";
import { checkAvailable } from "../../firebaseFunction";

export const fetchDateAvailableById = createAsyncThunk(
  "/reservation/booking",
  async (id) => {
    console.log("show");
    const data = await checkAvailable(id).then(
      (data) => data.booking
    );
    return [...data];
  }
);

const initialState = {
  booking: {
    dateBookings:[],
    isLoading: true,
  },
  searchBoxFilter: {
    checkIn: null,
    checkOut: null,
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reloadDateBooking: (state, action) => {
        console.log("work");
    },
    searchBoxFilterValue: (state, action) => {
      const objectValue = {
        checkIn: action.payload.checkIn,
        checkOut: action.payload.checkOut,
        adults: action.payload.adults,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDateAvailableById.pending, (state, action) => {
        state.getHotelByDestinationId.isLoading = true;
      })
      .addCase(fetchDateAvailableById.fulfilled, (state, action) => {
        state.filterHotels = action.payload;
        state.getHotelByDestinationId.hotels = action.payload;
        state.getHotelByDestinationId.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {reloadDateBooking} = bookingSlice.actions;

export default bookingSlice.reducer;

const priceConvert = (priceTemp) => {
  let temp = priceTemp.split("$");
  return parseFloat(temp[1]);
};
