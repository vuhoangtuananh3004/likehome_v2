import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reservationHist } from "../../features/account/accountSlice";
import Modify from "./Modify";

function Reservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.account.reservationHist);
  const user = useSelector((state) => state.account);

  useEffect(() => {
    if (reservations.isLoading) {
      dispatch(reservationHist("tatdattri@gmail.com"));
    }
  }, [dispatch, reservations.isLoading]);

  if (reservations.isLoading) return <h2>Loading....</h2>;
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <span className="w-full p-4 rounded  text-[24px] mb-10 text-center shadow-xl shadow-white/30">
        Booking History
      </span>
      <table class="table-auto border-separate border-spacing-x-20 border-spacing-y-10 border border-slate-500 rounded-[24px]">
        <thead className="">
          <tr className="text-[24px] tracking-widest text-sky-200">
            <th className="bg-white/10 p-5">#</th>
            <th>Image</th>
            <th>Listing Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr className="text-[20px] font-bold odd:text-orange-300 even: text-pink-100"> 
            <td>1</td>
            <td>
              <Image
                className="rounded-[36px] ring ring-offset-1"
                src={reservations.reservations.images[1]}
                alt="No image found"
                height="150px"
                width="150px"      
              />
            </td>
            <td>{reservations.reservations.title}</td>
            <td>01/24/2023 - 01/26/2023</td>
            <td>{reservations.reservations.accessibilityLabel}</td>
            <td>${reservations.reservations.amount_total}</td>
            <td><span className="flex w-[120px] justify-center items-center ring ring-offset-2 shadow-xl shadow-rose-900/70 rounded-[24px] p-5 bg-green-700/90">Complete</span></td>
            <td><span className="flex w-[120px] justify-center items-center ring ring-offset-2 shadow-xl shadow-yellow-500/70 rounded-[24px] p-5 bg-slate-400/40">Modify</span></td>
          </tr> 
        </tbody>
      </table>
      <div className="flex w-[1000px]"><Modify/></div>
 
    </div>
  );
}

export default Reservation;

// <div className="flex flex-col min-h-screen w-full items-center  space-y-5">
// <div className="flex flex-row h-[200px] w-[1000px] bg-purple-900/20 rounded ring ring-pink-500/80 ring-offset-4 shadow-xl shadow-green-500/40">
//   <div className="relative h-full w-[400px]">
//     <Image
//       className=""
//       src={reservations.reservations.images[1]}
//       alt="No image found"
//       layout="fill"
//       objectFit="cover"
//     />
//   </div>
//   <div className="flex flex-col h-full w-full p-5 text-[24px]">
//     <span>{reservations.reservations.title}</span>
//     <span>Check in - check out</span>
//     <span>Price</span>
//   </div>
// </div>
// </div>
