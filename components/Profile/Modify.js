import React, { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import ProfileContext from "../Context/ProfileContext";
import Booking from "../Reservation/Booking";
import ChangeDateBooked from "./ChangeDateBooked";

function Modify() {
  const {isOpenRe, setOpenRe} = useContext(ProfileContext)
  const [valueCheckIn, onChangeCheckIn] = useState(new Date());
  const [valueCheckOut, onChangeCheckOut] = useState(new Date());
  let checkInDate = {
    date: valueCheckIn.getDate().toString(),
    month: (valueCheckIn.getMonth() + 1).toString(),
    year: valueCheckIn.getFullYear().toString(),
  };
  let checkOutDate = {
    date: valueCheckOut.getDate().toString(),
    month: (valueCheckOut.getMonth() + 1).toString(),
    year: valueCheckOut.getFullYear().toString(),
  };
  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <>
        <div
          class="flex w-full z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="flex z-10 w-full justify-center items-center">
            <div class="flex h-full w-full items-end justify-center p-4 text-center">
              <div class="relative transform rounded-lg bg-white text-left shadow-xl transition-all">
                <div class="bg-white px-4 pt-5">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center ">
                      <h3
                        class="text-lg font-medium leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Change Booking
                      </h3>
                      <div class="mt-2">
                        <ChangeDateBooked value={"123"} />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={()=> setOpenRe(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
    </>
  );
}

export default Modify;
