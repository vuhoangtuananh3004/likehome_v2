import React from "react";

const getDateAvailable = (dateBooking, indexInMonth, indexOutMonth) => {
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

  const countDaysBooking = [...dateAvailable];

  let filter = dateAvailable.filter((t) => {
    if (t.startDay == 1 || t.endDay == t.totalDays) return true;
    return false;
  });
  let combind = [];
  for (let i = 0; i < filter.length; i++) {
    if (i + 1 < filter.length) {
      let currentMonth = filter[i].endMonth;
      let nextMonth = filter[i + 1].startMonth;
      let isNextMonth =
        nextMonth < currentMonth
          ? nextMonth + 12 - currentMonth
          : nextMonth - currentMonth;
      if (isNextMonth == 1 && filter[i + 1].startDay == 1) {
        filter[i].endDay = filter[i + 1].endDay;
        filter[i].endMonth = filter[i + 1].endMonth;
        filter[i].endYear = filter[i + 1].endYear;
      }
      if (filter[i].startMonth != filter[i].endMonth) combind.push(filter[i]);
    }
  }

  let getRemoveIndex = [];
  for (let k = 0; k < dateAvailable.length; k++) {
    if (k + 1 < dateAvailable.length) {
      let currentEndDay = dateAvailable[k].endDay;
      let currentEndMonth = dateAvailable[k].endMonth;
      let nextEndDay = dateAvailable[k + 1].endDay;
      let nextEndMonth = dateAvailable[k + 1].endMonth;
      if (currentEndDay == nextEndDay && currentEndMonth == nextEndMonth) {
        getRemoveIndex.push(k + 1);
      }
    }
  }
  for (let i = getRemoveIndex.length - 1; i >= 0; i--) {
    dateAvailable.splice(getRemoveIndex[i], 1);
  }
  return [dateAvailable, countDaysBooking]
};

function Test() {
  let days = [];
  for (let i = 1; i <= 29; i++) {
    let temp = { day: i, isAvailable: true };
    if (i == 1 || i == 28 || i == 15) {
      temp = { day: i, isAvailable: false };
    }
    days.push(temp);
  }

  let day2 = [];
  for (let i = 1; i <= 31; i++) {
    let temp = { day: i, isAvailable: true };
    day2.push(temp);
  }
  let day1 = [];
  for (let i = 1; i <= 27; i++) {
    let temp = { day: i, isAvailable: true };
    if (i == 3 || i == 26 || i == 15) {
      temp = { day: i, isAvailable: false };
    }
    day1.push(temp);
  }
  // console.log(days);
  const dateBooking = [
    { month: 11, year: 2022, days: days },
    { month: 12, year: 2022, days: days },
    { month: 1, year: 2023, days: day1 },
    { month: 2, year: 2023, days: day2 },
    { month: 3, year: 2023, days: days },
  ];

  let indexInMonth = 1;
  let indexOutMonth = 3;
  let inDay = 29;
  let dayOut = 1;

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

  const countDaysBooking = [...dateAvailable];

  let filter = dateAvailable.filter((t) => {
    if (t.startDay == 1 || t.endDay == t.totalDays) return true;
    return false;
  });
  let combind = [];
  for (let i = 0; i < filter.length; i++) {
    if (i + 1 < filter.length) {
      let currentMonth = filter[i].endMonth;
      let nextMonth = filter[i + 1].startMonth;
      let isNextMonth =
        nextMonth < currentMonth
          ? nextMonth + 12 - currentMonth
          : nextMonth - currentMonth;
      if (isNextMonth == 1 && filter[i + 1].startDay == 1) {
        filter[i].endDay = filter[i + 1].endDay;
        filter[i].endMonth = filter[i + 1].endMonth;
        filter[i].endYear = filter[i + 1].endYear;
      }
      if (filter[i].startMonth != filter[i].endMonth) combind.push(filter[i]);
    }
  }

  let getRemoveIndex = [];
  for (let k = 0; k < dateAvailable.length; k++) {
    if (k + 1 < dateAvailable.length) {
      let currentEndDay = dateAvailable[k].endDay;
      let currentEndMonth = dateAvailable[k].endMonth;
      let nextEndDay = dateAvailable[k + 1].endDay;
      let nextEndMonth = dateAvailable[k + 1].endMonth;
      if (currentEndDay == nextEndDay && currentEndMonth == nextEndMonth) {
        getRemoveIndex.push(k + 1);
      }
    }
  }
  for (let i = getRemoveIndex.length - 1; i >= 0; i--) {
    dateAvailable.splice(getRemoveIndex[i], 1);
  }

  return <div>Test</div>;
}

export default Test;

// const checkDateAvailableInMonth = (data, key, t, dayReservation) => {
//   let dayRes = dayReservation;
//   let subtemp = {
//     startDay: null,
//     endDay: null,
//     monthStart: null,
//     monthEnd: null,
//   };
//   let temp1 = [];
//   let count = 0;
//   switch (key) {
//     case "SAME_MONTH":
//       for (let i = t.inDay - 1; i < data.days.length; i++) {
//         if (data.days[i].isAvailable) {
//           if (count == 0) {
//             subtemp.startDay = i;
//             subtemp.monthStart = data.month;
//             count++;
//           }
//           if (count == 1 && i == data.days.length - 1) {
//             subtemp.monthStart = data.month;
//             temp1.push(subtemp);
//           }
//         }
//         if (!data.days[i].isAvailable && count == 1) {
//           if (subtemp.startDay != null) {
//             subtemp.endDay = i;
//             subtemp.monthEnd = data.month;
//           } else {
//             subtemp.startDay = i;
//             subtemp.monthEnd = data.month;
//           }
//           temp1.push(subtemp);
//           subtemp = {
//             startDay: null,
//             endDay: null,
//             monthStart: null,
//             monthEnd: null,
//           };
//           count = 0;
//         }
//       }
//       return temp1;
//     case "DIFF_MONTH":
//       let lastIndexOfDayReservation = dayRes.length - 1;
//       for (let i = 0; i < data.days.length; i++) {

//         if (dayRes[lastIndexOfDayReservation].endDay == null) {
//           if (data.days[i].isAvailable) continue;
//           dayRes[lastIndexOfDayReservation].endDay = i;
//           dayRes[lastIndexOfDayReservation].monthEnd = data.month;
//         }

//         if (dayRes[lastIndexOfDayReservation].endDay != null){
//             if (data.days[i].isAvailable) {
//                 if (count == 0) {
//                   subtemp.startDay = i;
//                   subtemp.monthStart = data.month;
//                   count++;
//                 }
//                 if (count == 1 && i == data.days.length - 1) {
//                   subtemp.monthStart = data.month;
//                   dayRes.push(subtemp);
//                 }
//               }
//               if (!data.days[i].isAvailable && count == 1) {
//                 if (subtemp.startDay) {
//                   subtemp.endDay = i;
//                   subtemp.monthEnd = data.month;
//                 } else {
//                   subtemp.startDay = i;
//                   subtemp.monthEnd = data.month;
//                 }
//                 dayRes.push(subtemp);
//                 subtemp = {
//                   startDay: null,
//                   endDay: null,
//                   monthStart: null,
//                   monthEnd: null,
//                 };
//                 count = 0;
//               }
//         }

//       }

//       return dayRes
//       break;

//     default:
//       break;
//   }
// };

// let temp1 = []
// let subTemp = []
// for (let i = (t.inDay - 1); i < data.days.length; i++){
//     if (temp1.length == 0){
//         if (!data.days[i].isAvailable) continue;
//         temp1.push(i)
//     }else{

//         if (!data.days[i].isAvailable) break;
//         temp1.push(i)

//     }
// }
// console.log(temp1);
// return {...data, days: data.days.slice(temp1[0], temp1[temp1.length-1] + 1)};
