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
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

  if (!imgs)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-10 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  let getAmenities = amenitiesIcons.filter((filter) => {
    if (linkParam.amenitiesTitle.filter((t) => t === filter.name).length > 0) {
      return true;
    }
    return false;
  });

  return (
    <div className="flex flex-col h-full w-full justify-center items-center ">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="flex pt-5 pb-5 h-full w-full justify-center z-20 bg-green-200/70 drop-shadow-xl"
      >
        <div className="flex flex-row justify-center items-center h-full w-full">
          <div className="flex w-[300px] justify-center">
            <Link href="/">
              <span className="font-bold text-[24px] font-mono tracking-widest cursor-pointer">
                LikeHome.com
              </span>
            </Link>
          </div>
          <div className="flex w-full justify-center">
            <SearchBox />
          </div>
        </div>
      </motion.div>
      <div className="flex flex-row h-full w-full p-5 mt-10 space-x-10">
        <motion.div
          className="h-fit w-1/6 bg-slate-800/20 rounded-[24px]"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <Profile namePage="reservation" />
          <Promotion />
          <TravelNotice />
          <div className="grid grid-cols-2 gap-2 w-full overflow-auto p-2">
            {getAmenities.map((doc) => (
              <div
                key={doc.name}
                className="flex justify-center items-center h-[50px] border border-black last:mb-5 bg-rose-100 rounded-[12px]"
              >
                {doc.icon} {doc.name}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex h-full w-4/6 justify-center"
        >
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
        </motion.div>
      </div>
      <div className="flex h-full w-screen">
        <Booking />
      </div>
    </div>
  );
}

export default Reservation;
