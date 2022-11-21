import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { useDispatch, useSelector } from "react-redux";
import { fetchDateAvailableById, reloadDateBooking } from "../../features/hotel/bookingSlice";
import DisplayResult from "./DisplayResult";

function Booking() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.booking.booking.isLoading)
  const [valueCheckIn, onChangeCheckIn] = useState(new Date());
  const [valueCheckOut, onChangeCheckOut] = useState(new Date());
    dispatch(fetchDateAvailableById("10269973"))
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-row w-full justify-center items-center drop-shadow-xl">
        <div className="h-full w-[500px] text-center divide-x bg-purple-900/40 border border-black p-1">
          <span className="font-bold">Check-in</span>
          <DatePicker
            className="design"
            onChange={onChangeCheckIn}
            value={valueCheckIn}
            clearIcon={null}
            dayPlaceholder={`${valueCheckIn.getDate()}`}
            monthPlaceholder={`${valueCheckIn.getMonth()}`}
            yearPlaceholder={`${valueCheckIn.getFullYear()}`}
            minDate={new Date()}
            maxDate={new Date("10/31/2023")}
          />
        </div>
        <div className="h-full w-[500px] text-center divide-x bg-purple-900/40 border border-black p-1">
          <span className="font-bold">Check-out</span>
          <DatePicker
            className="design"
            onChange={onChangeCheckOut}
            value={valueCheckOut}
            clearIcon={null}
            dayPlaceholder={`${valueCheckOut.getDate()}`}
            monthPlaceholder={`${valueCheckOut.getMonth()}`}
            yearPlaceholder={`${valueCheckOut.getFullYear()}`}
            minDate={valueCheckIn}
            maxDate={new Date("10/31/2023")}
          />
        </div>
        <button className="h-[73px] w-[200px] bg-sky-400 border border-black">
          Search
        </button>
      </div>
      <div className="contain h-full w-[1200px] mx-auto"><DisplayResult/></div>
    </div>
  );
}

export default Booking;
