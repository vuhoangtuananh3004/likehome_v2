/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../Account/useAuth";
import Profile from "../Hotels/Profile";
import Promotion from "../Hotels/Promotion";
import TravelNotice from "../Hotels/TravelNotice";
import SearchBox from "../SearchBar/SearchBox";
import ReservationImg from "./ReservationImg";
import WifiIcon from "@mui/icons-material/Wifi";
import HotTubIcon from "@mui/icons-material/HotTub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MicrowaveSharpIcon from "@mui/icons-material/MicrowaveSharp";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Booking from "./Booking";

function Reservation() {
  const router = useRouter();
  const linkParam = router.query;
  const imgs = linkParam.images;
  const amenitiesIcons = [
    { name: "Wifi", icon: <WifiIcon /> },
    { name: "Hot tub", icon: <HotTubIcon /> },
    { name: "Free parking", icon: <LocalParkingIcon /> },
    { name: "Self check-in", icon: <FactCheckIcon /> },
    { name: "Air conditioning", icon: <AcUnitIcon /> },
    { name: "Kitchen", icon: <MicrowaveSharpIcon /> },
  ];

  if (!imgs) return <h2>Loading</h2>;
  let getAmenities = amenitiesIcons.filter((filter) => {
    if (linkParam.amenitiesTitle.filter((t) => t === filter.name).length > 0) {
      return true;
    }
    return false;
  });

  return (
    <div className="flex flex-col h-full w-full justify-center items-center ">
      <div className="flex pt-5 pb-5 h-full w-full justify-center z-20 bg-indigo-900">
        searchBox
      </div>
      <div className="flex flex-row h-full w-full p-3 space-x-10">
        <div className="h-fit w-1/6 bg-slate-800/20 rounded-[24px]">
          <Profile namePage="reservation" />
          <Promotion />
          <TravelNotice />
          <div className="grid grid-cols-2 gap-2 w-full overflow-auto p-2">
            {getAmenities.map((doc) => (
              <div
                key={doc.name}
                className="flex justify-center items-center h-[50px] border border-black last:mb-5 bg-rose-100"
              >
                {doc.icon} {doc.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-full w-4/6 justify-center">
          <div className="grid grid-rows-3 grid-cols-3 w-full gap-4">
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
      <div className="flex h-full w-screen">
        <Booking />
      </div>
    </div>
  );
}

export default Reservation;
// <SearchBox />