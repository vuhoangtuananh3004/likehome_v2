import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import db from "../../firebaseConfig";
import { checkAvailable } from "../../firebaseFunction";

export const fetchDataBooking = createAsyncThunk("/booking/id", async (id) => {
  const data = await checkAvailable(id).then((data) => data);
  return [...data];
});

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
  displayAvailableDays: [],
  dateBookingObj: {},
  countDayStay: null,
  reducers: {
    loading: (state, action) => {
      state.booking.isLoading = action.payload;
    },
    checkDate: (state, action) => {
      const dateBooking = state.booking.dateBooking;
      const dateIn = action.payload.in;
      const dateOut = action.payload.out;
      const inDay = parseInt(dateIn.date);
      const outDay = parseInt(dateOut.date);
      const inMonth = parseInt(dateIn.month);
      const outMonth = parseInt(dateOut.month);
      const inYear = parseInt(dateIn.year);
      const outYear = parseInt(dateOut.year);
      let indexInMonth = dateBooking
        .map((obj) => obj.month)
        .indexOf(parseInt(dateIn.month));
      let indexOutMonth = dateBooking
        .map((obj) => obj.month)
        .indexOf(parseInt(dateOut.month));

      const [
        dateAvailable,
        displayAvailableDays,
        dateBookingObj,
        countDayStay,
      ] = getDateAvailable(
        dateBooking,
        indexInMonth,
        indexOutMonth,
        inDay,
        inMonth,
        outDay,
        outMonth,
        inYear,
        outYear
      );

      return {
        ...state,
        dateAvailable: dateAvailable,
        displayAvailableDays: displayAvailableDays,
        dateBookingObj: dateBookingObj,
        countDayStay: countDayStay,
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

const getDateAvailable = (
  dateBooking,
  indexInMonth,
  indexOutMonth,
  inDay,
  inMonth,
  outDay,
  outMonth,
  inYear,
  outYear
) => {
  let dateAvailable = [];

  for (let k = indexInMonth; k <= indexOutMonth; k++) {
    let startDay = null;
    let endDay = null;
    let temp = dateBooking[k].days.filter((t) => t.isAvailable);
    let currentMonth = dateBooking[k].month;
    let currentYear = dateBooking[k].year;
    let lengthOfIndexDaysInMonth = dateBooking[k].days.length;
    for (let i = 0; i < temp.length; i++) {
      if (startDay == null) startDay = temp[i].day;
      if (startDay != null) {
        if (i + 1 < temp.length) {
          if (temp[i + 1].day - temp[i].day == 1) continue;
        }
        let tempAddDay = temp[i].day + 1 > temp[temp.length - 1].day ? 0 : 1;
        endDay = temp[i].day + tempAddDay;
      }
      if (startDay != null && endDay != null) {
        dateAvailable.push({
          startDay: startDay,
          endDay: endDay,
          startMonth: currentMonth,
          endMonth: currentMonth,
          startYear: currentYear,
          endYear: currentYear,
          totalDays: lengthOfIndexDaysInMonth,
        });
        startDay = null;
        endDay = null;
      }
    }
  }
  let combind = [];
  let filter = dateAvailable.filter((t) => {
    if (t.startDay == 1 || t.endDay == t.totalDays) return true;
    return false;
  });
  for (let i = 0; i < filter.length; i++) {
    const temp = filter[i];
    if (i == 0) {
      combind.push(temp);
      continue;
    }
    if (
      combind[combind.length - 1].endDay ==
        combind[combind.length - 1].totalDays &&
      temp.startDay == 1
    ) {
      let currentMonth = parseInt(combind[combind.length - 1].endMonth);
      let isNextMonth =
        currentMonth < temp.startMonth
          ? temp.startMonth - currentMonth
          : 12 + temp.startMonth - currentMonth;
      if (isNextMonth == 1) {
        combind[combind.length - 1] = {
          ...combind[combind.length - 1],
          endDay: temp.endDay,
          endMonth: temp.endMonth,
          endYear: temp.endYear,
          totalDays: temp.totalDays,
        };
        continue;
      }
    }
    combind.push(temp);
  }

  let filterInMonth = combind.filter((t) => t.startMonth == inMonth);
  let filterOutMonth = combind.filter((t) => t.endMonth == outMonth);
  let dateBookingObj = {
    inDay: null,
    outDay: null,
    inMonth: null,
    outMonth: null,
    inYear: null,
    outYear: null,
  };
  for (let i = 0; i < filterInMonth.length; i++) {
    if (
      inDay >= filterInMonth[i].startDay &&
      inDay <= filterInMonth[i].endDay
    ) {
      dateBookingObj = {
        ...dateBookingObj,
        inDay: inDay,
        inMonth: inMonth,
        inYear: filterInMonth[i].startYear,
      };
      break;
    }
  }
  for (let i = 0; i < filterOutMonth.length; i++) {
    if (
      inDay >= filterOutMonth[i].startDay &&
      inDay <= filterOutMonth[i].endDay
    ) {
      dateBookingObj = {
        ...dateBookingObj,
        outDay: outDay,
        outMonth: outMonth,
        outYear: filterOutMonth[i].endYear,
      };
      break;
    }
  }

  let countDayStay = 0;
  let monthRange = [];
  let tempMonthStart = parseInt(new Date().getMonth());
  for (let i = 0; i < 12; i++) {
    let temp = tempMonthStart + i;

    if (temp <= 12) monthRange.push(temp);
    if (temp > 12) monthRange.push(temp - 12);
  }
  monthRange = monthRange.splice(
    monthRange.indexOf(inMonth),
    monthRange.indexOf(outMonth)
  );
  console.log(monthRange);
  let countYear = 0;
  for (let i = 0; i < monthRange.length; i++) {
    if (monthRange[i] == 12) countYear += 1;
    let tempYear = countYear == 1 ? outYear : inYear;
    countDayStay += daysInMonth(monthRange[i], tempYear);
    if (i == 0) countDayStay -= inDay;
    if (i == monthRange.length - 1)
      countDayStay -= daysInMonth(monthRange[i], tempYear) - outDay;
  }
  if (inDay == outDay && inMonth == outMonth && inYear == outYear)
    countDayStay = 1;

  return [dateAvailable, combind, dateBookingObj, countDayStay];
};

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
