import React from "react";

function Test() {
  let days = [];
  for (let i = 1; i <= 29; i++) {
    let temp = { day: i, isAvailable: true };
    if (i == 1 || i == 28 || i == 3) {
      temp = { day: i, isAvailable: false };
    }
    days.push(temp);
  }

  let day1 = [];
  for (let i = 1; i <= 29; i++) {
    let temp = { day: i, isAvailable: true};
    day1.push(temp);
  }

  const checkBooking = [
    { month: 11, year: 2022, days: days },
    { month:12, year: 2022, days: days },
    { month: 1, year: 2023, days: days },
    { month: 2, year: 2023, days: day1 },
    { month: 3, year: 2023, days: days },
  ];
  const t = {
    monthCheckInIndex: 1,
    monthCheckOutIndex: 3,
    dayIn: 29,
    dayOut: 1,
    monthIn: 12,
    monthOut: 2,
  };
  //   console.log(checkBooking);
  let dayReservation = [];
  //   console.log(checkBooking[0]);
  //   for (let i = t.monthCheckInIndex; i < t.monthCheckOutIndex; i++){
  // let temp = checkBooking[i].days.filter(t => t.isAvailable == false)
  //   }

  let available = [];
  for (let k = t.monthCheckInIndex; k <= t.monthCheckOutIndex; k++) {
    let startDay = null;
    let endDay = null;
    let i = 0;
    if (k == t.monthCheckInIndex){
        i = t.dayIn - 1
    }
    for (i ; i < checkBooking[k].days.length; i++) {
      if ( k != t.monthCheckInIndex) {
        if (available[available.length - 1].endDay == null) {
          if (i < checkBooking[k].days.length - 1 ){
            if (checkBooking[k].days[i].isAvailable) continue;   
          }
          available[available.length - 1].endDay = i + 1;
          available[available.length - 1].endMonth = checkBooking[k].month;
          available[available.length - 1].endYear = checkBooking[k].year;
        }
      }
      if (checkBooking[k].days[i].isAvailable && startDay == null)
        startDay = i + 1;
      if (!checkBooking[k].days[i].isAvailable && startDay != null)
        endDay = i + 1;
      if (startDay != null && endDay != null) {
        available.push({
          startDay: startDay,
          endDay: endDay,
          startMonth: checkBooking[k].month,
          endMonth: checkBooking[k].month,
          startYear: checkBooking[k].year,
          endYear: checkBooking[k].year,
        });
        startDay = null;
        endDay = null;
      }
      if (startDay != null && i == checkBooking[k].days.length - 1) {
        available.push({
          startDay: startDay,
          endDay: endDay,
          startMonth: checkBooking[k].month,
          endMonth: checkBooking[k].month,
          startYear: checkBooking[k].year,
          endYear: checkBooking[k].year,
        });
        startDay = null;
        endDay = null;
      }
      if (k == t.monthCheckOutIndex && i == checkBooking[k].days.length - 1) {
        available[available.length - 1].endDay = i + 1;
        available[available.length - 1].endMonth = checkBooking[k].month;
        available[available.length - 1].endYear = checkBooking[k].year;
      }
    }
  }
  let start = { startDay: null, startMonth: null, startYear: null };
  let end = { endDay: null, endMonth: null, endYear: null };
  for (let i = 0; i < available.length; i++) {
    if (
      t.dayIn >= available[i].startDay &&
      t.dayIn <= available[i].endDay &&
      start.day == null
    )
      start = {
        startDay: t.dayIn,
        startMonth: available[i].startMonth,
        startYear: available[i].startYear,
      };
    if (t.dayOut >= available[i].startDay && t.dayOut <= available[i].endDay)
      end = {
        endDay: t.dayOut,
        endMonth: available[i].endMonth,
        endYear: available[i].endYear,
      };

    // if (end.endDay == null){
    //     end = start
    // }
  }
  console.log(available);
  console.log(start);
  console.log(end);

  //   for (let i = t.monthCheckInIndex; i <= t.monthCheckOutIndex; i++) {
  //     if (i == t.monthCheckInIndex) {
  //       dayReservation = checkDateAvailableInMonth(
  //         checkBooking[i],
  //         "SAME_MONTH",
  //         t,
  //         dayReservation
  //       );
  //     }
  //     // else {
  //     //   dayReservation = checkDateAvailableInMonth(
  //     //     checkBooking[i],
  //     //     "DIFF_MONTH",
  //     //     t,
  //     //     dayReservation
  //     //   );
  //     // }
  //   }
  //   console.log(dayReservation);
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
//       for (let i = t.dayIn - 1; i < data.days.length; i++) {
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
// for (let i = (t.dayIn - 1); i < data.days.length; i++){
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
