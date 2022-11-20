/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "../Account/useAuth";
import Profile from "../Hotels/Profile";
import SearchBox from "../SearchBar/SearchBox";
import ReservationImg from "./ReservationImg";
function Reservation({ queryValue }) {
  const imgs = queryValue.images;
  return (
    <div className="flex flex-col h-full w-full justify-center items-center bg-sky-900/20">
      <div className="mt-5">
        <SearchBox />
      </div>
      <div className="flex flex-row h-full w-full p-10">
        <div><Profile/></div>
        <div className="flex h-full w-full justify-center">
          <div className="grid grid-rows-3 grid-cols-3 w-3/4 gap-4">
            {imgs.map((img) => (
              <div
                className="first:col-span-2 first:row-span-2 aspect-video drop-shadow-xl"
                key={img}
              >
                <ReservationImg imgUrl={img} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
