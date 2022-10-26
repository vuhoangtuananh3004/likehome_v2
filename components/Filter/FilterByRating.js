import { Rating } from "@mui/material";
import React, { useState } from "react";

export default function FilterByRating() {
  const [value, setValue] = useState(0);
  console.log("rating: " + value);
  return (
    <div className="flex flex-col w-[200px] pt-4 font-bold text-black space-y-2">
      <span className="">Guest Rating</span>
      <span className="text-center">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </span>
    </div>
  );
}
