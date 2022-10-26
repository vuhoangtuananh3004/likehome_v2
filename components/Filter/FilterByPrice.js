import { Box, Slider } from "@mui/material";
import React from "react";

export default function FilterByPrice() {
  const marks = [
    {
      value: 0,
      label: "0$",
    },
    {
      value: 100,
      label: "100$",
    },
    {
      value: 200,
      label: "200$",
    },
    {
      value: 300,
      label: "300$+",
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <div className="flex flex-col pt-4 font-bold text-black">
      <span>Price per nights</span>
      <div className="flex justify-center">
        <Box sx={{ width: 150 }}>
          <Slider
            size="small"
            color="secondary"
            aria-label="Custom marks"
            defaultValue={300}
            getAriaValueText={valuetext}
            step={100}
            marks={marks}
            min={0}
            max={300}
          />
        </Box>
      </div>
    </div>
  );
}
