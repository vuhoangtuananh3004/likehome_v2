import { Checkbox } from "@mui/material";
import React, { useState } from "react";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const listAmenities = [
  "Wifi",
  "Hotub",
  "Free Parking",
  "Self Check in",
  "Air Conditioning",
];
export default function FilterByAmenities() {
  const [amenities, setAmenities] = useState([]);
  const amentitesSelection = (data) => {
    if (amenities.includes(data)) {
      setAmenities(amenities.filter((arr) => arr != data));
    } else {
      setAmenities([...amenities, data]);
    }
  };
  console.log("Filter By Amentities: " + amenities);
  return (
    <div className="flex flex-col w-[200px] pt-4 font-bold text-black space-y-2">
      <span className="">Amenities</span>
      {listAmenities.map((data) => (
        <span key={data} onClick={() => amentitesSelection(data)}>
          <Checkbox
            {...label}
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
          />
          {data}
        </span>
      ))}
    </div>
  );
}
// {listAmenities.map((data) => {

// })}
