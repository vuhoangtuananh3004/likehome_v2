import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import HotTubIcon from "@mui/icons-material/HotTub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function PropertyCard({ value }) {
  const detail = {
    images: [...value.images],
    listingName: value.listingName,
    reviews: value.reviewsCount,
    rating: (value.starRating) ? value.avgRating : 0,
    price: value.accessibilityLabel,
  };
  return (
    <div className="flex flex-col h-[300px] w-[300px] rounded-[24px] border-2 border-white bg-yellow-900/50 shadow-lg shadow-blue-500/50">
      <div className="relative h-[225px] w-full">
        <Image
          className="rounded-tl-[24px] rounded-tr-[24px]"
          src={`${detail.images[0]}`}
          alt="No image found"
          layout="fill"
          objectFit="cover"
        />
        <span className="absolute bottom-0 right-0 p-2 font-bold text-xl tracking-wider">
          {detail.price}
        </span>
      </div>
      <div className="flex flex-col h-[100px] w-full bg-white/50 rounded-bl-[24px] rounded-br-[24px] text-sm text-black overflow-scroll">
        <span className="text-sm text-center w-full">{`${detail.listingName}`} {`(${detail.reviews} reviews)`}</span>
        <span className="text-center">
          <Rating name="read-only" size="small" value={detail.rating} precision={0.5} readOnly />
        </span>
        <div className="flex flex-row justify-between items-center w-full pl-2 pr-2">
          <WifiIcon />
          <HotTubIcon />
          <LocalParkingIcon />
          <FactCheckIcon />
          <AcUnitIcon />
        </div>
      </div>
    </div>
  );
}
