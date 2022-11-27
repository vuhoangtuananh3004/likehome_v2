import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

function Modify() {
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
    <div class="flex z-10 w-full" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-slate-900/40 transition-opacity"></div>
    <div class="fixed inset-0 z-10 ">
      <div class="flex min-h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="h-full w-full bg-white">asd</div>
      </div>
    </div>
  </div>
  
  );
}

export default Modify;
