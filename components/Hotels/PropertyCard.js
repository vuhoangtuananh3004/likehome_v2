import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import HotTubIcon from "@mui/icons-material/HotTub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MicrowaveSharpIcon from "@mui/icons-material/MicrowaveSharp";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";

export default function PropertyCard({ value }) {
  const amenitiesIcons = [
    { name: "Wifi", icon: <WifiIcon /> },
    { name: "Hot tub", icon: <HotTubIcon /> },
    { name: "Free parking", icon: <LocalParkingIcon /> },
    { name: "Self check-in", icon: <FactCheckIcon /> },
    { name: "Air conditioning", icon: <AcUnitIcon /> },
    { name: "Kitchen", icon: <MicrowaveSharpIcon /> },
  ];
  const detail = {
    images: [...value.images],
    title: value.title,
    listingName: value.listingName,
    listingGuestLabel: value.listingGuestLabel,
    reviews: value.reviewsCount,
    rating: value.starRating ? value.avgRating : 0,
    accessibilityLabel: value.accessibilityLabel,
    price: value.price,
    listingGuestLabel: value.listingGuestLabel,
    amenities: [],
  };
  const updateIconAmenities = () => {
    value.listingPreviewAmenityNames.map((key) => {
      amenitiesIcons.map((doc) => {
        if (key === doc.name) {
          detail.amenities.push(doc.icon);
        }
      });
    });
  };
  updateIconAmenities();
  return (
    <div className="flex flex-col h-[300px] w-[286px] rounded-[24px] border-2 border-white bg-yellow-900/50 shadow-lg shadow-blue-500/50">
      <div className="relative h-[225px] w-full overflow-scroll">
        <Image
          className="rounded-tl-[24px] rounded-tr-[24px]"
          src={`${detail.images[0]}`}
          alt="No image found"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col h-[75px] w-full bg-white/50 rounded-bl-[24px] rounded-br-[24px] text-sm text-black overflow-scroll space-y-1">
        <span className="text-sm text-center w-full">
          {`${detail.title}`} {`(${detail.reviews} reviews)`}
        </span>
        <div className="flex w-full justify-center items-center text-center">
          <Rating
            name="read-only"
            size="small"
            value={detail.rating}
            precision={0.5}
            readOnly
          />
          ({detail.rating})
        </div>
        <span className="text-center">{detail.accessibilityLabel}, {detail.listingGuestLabel}</span>
      </div>
    </div>
  );
}
