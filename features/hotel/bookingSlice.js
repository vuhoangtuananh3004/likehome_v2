import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import db from "../../firebaseConfig";
import {
  checkAvailable,
} from "../../firebaseFunction";

export const fetchDataBooking = createAsyncThunk(
  "/hotels/destinationID/hotelList",
  async (id) => {
    const data = await checkAvailable(id).then(
        (data) => data
      );  
      return [...data];
  }
);

const initialState = {
  booking: {
    dateBooking: [],
    isLoading: true,
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  dateAvailable: [],
  reducers: {
    loading: (state, action) => {
      state.booking.isLoading = action.payload;
    },
    checkDate: (state, action) => {
        const dateBooking = state.booking.dateBooking;
        const checkIn = action.payload.in
        const checkOut = action.payload.out
        let indexIn = dateBooking.map(obj => obj.month).indexOf(parseInt(checkIn.month))
        let indexOut = dateBooking.map(obj => obj.month).indexOf(parseInt(checkOut.month))
        let dateInAvailable = [];
        console.log(checkIn);

        for (let i = indexIn; i < indexOut; i++){
          for (let j = 0; j < dateBooking[i].days.length; j++){
            if (dateBooking[i].month == parseInt(checkIn.month)){
                dateInAvailable.push(dateBooking[i].days[j].day)
                if (dateBooking[i].days[j].day == (checkIn.date - 1)){
                }
            }
          }
        }

        return {
            ...state,
            dateAvailable: dateInAvailable,
          };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataBooking.pending, (state, action) => {
      })
      .addCase(fetchDataBooking.fulfilled, (state, action) => {
        state.booking.dateBooking = action.payload
        state.booking.isLoading = false
      });
  },
});

// Action creators are generated for each case reducer function
export const {
loading,
checkDate
} = bookingSlice.actions;

export default bookingSlice.reducer;

const priceConvert = (priceTemp) => {
  let temp = priceTemp.split("$");
  return parseFloat(temp[1]);
};
