import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import db from "../../firebaseConfig";
import { checkAvailable } from "../../firebaseFunction";

export const fetchDataBooking = createAsyncThunk(
  "/booking/id",
  async (id) => {
    const data = await checkAvailable(id).then((data) => data);
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
      const dateIn = action.payload.in;
      const dateOut = action.payload.out;
      let indexInMonth = dateBooking
        .map((obj) => obj.month)
        .indexOf(parseInt(dateIn.month));
      let indexOutMonth = dateBooking
        .map((obj) => obj.month)
        .indexOf(parseInt(dateOut.month));
      let dateAvailable = [];
      for (let k = indexInMonth; k <= indexOutMonth; k++) {
        let startDay = null;
        let endDay = null;
        let i = 0;
        if (k == indexInMonth){
          i = parseInt(dateIn.date)
        }
        for (i; i < dateBooking[k].days.length; i++) {
          if (parseInt(dateBooking[k].month) == parseInt(dateOut.month) && startDay != null && endDay == null && dateAvailable.length == 0 ){
             if (dateBooking[k].days[i].isAvailable && dateBooking[k].days[i] <= parseInt(dateOut.date)) continue
             endDay = i
          }
          if (dateAvailable.length != 0 && k != indexInMonth) {
            if (dateAvailable[dateAvailable.length - 1].endDay == null) {
              if (dateBooking[k].days[i].isAvailable) continue;
              dateAvailable[dateAvailable.length - 1].endDay = i + 1;
              dateAvailable[dateAvailable.length - 1].endMonth =
                dateBooking[k].month;
              available[available.length - 1].endYear = dateBooking[k].year;
            }
          }

          if (dateBooking[k].days[i].isAvailable && startDay == null)
            startDay = i;
          if (!dateBooking[k].days[i].isAvailable && startDay != null)
            endDay = i + 1;
          if (startDay != null && endDay != null) {
            dateAvailable.push({
              startDay: startDay,
              endDay: endDay,
              startMonth: dateBooking[k].month,
              endMonth: dateBooking[k].month,
            });
            startDay = null;
            endDay = null;
            startMonth: dateBooking[k].month;
            endMonth: dateBooking[k].month;
            startYear: dateBooking[k].year;
            endYear: dateBooking[k].year;
          }
          if (startDay != null && i == dateBooking[k].days.length - 1) {
            dateAvailable.push({
              startDay: startDay,
              endDay: endDay,
              startMonth: dateBooking[k].month,
              endMonth: dateBooking[k].month,
              startYear: dateBooking[k].year,
              endYear: dateBooking[k].year,
            });
            startDay = null;
            endDay = null;
          }
          if (k == indexOutMonth && i == dateBooking[k].days.length - 1) {
            dateAvailable[dateAvailable.length - 1].endDay = i + 1;
            dateAvailable[dateAvailable.length - 1].endMonth = dateBooking[k].month;
            dateAvailable[dateAvailable.length - 1].endYear = dateBooking[k].year;
          }
        }
      }

      return {
        ...state,
        dateAvailable: dateAvailable,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataBooking.pending, (state, action) => {})
      .addCase(fetchDataBooking.fulfilled, (state, action) => {
        state.booking.dateBooking = action.payload;
        state.booking.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { loading, checkDate } = bookingSlice.actions;

export default bookingSlice.reducer;

const priceConvert = (priceTemp) => {
  let temp = priceTemp.split("$");
  return parseFloat(temp[1]);
};

// if (dateBooking[i].month == parseInt(checkIn.month)) {
//     if (dateBooking[i].days[j].day >= checkIn.date - 1) {
//       dateInAvailable.push(dateBooking[i].days[j]);
//     }
//   } else {
//     // if (!dateBooking[i].days[j].isAvailable) break
//     dateInAvailable.push(dateBooking[i].days[j]);
//     if (dateBooking.days[j].day == (checkOut.date - 1) && (dateBooking.days[j].month == parseInt(checkOut.month))) return
//   }
