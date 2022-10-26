import React, { useState } from "react";
import FilterByAmenities from "./FilterByAmenities";
import FilterByPrice from "./FilterByPrice";
import FilterByRating from "./FilterByRating";
import { motion, AnimatePresence, animate } from "framer-motion";

export default function Filter() {
  const [isOn, setIsOn] = useState(false);
  const variants = {
    open: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: { duration: 1 },
    },
    close: {
      opacity: 0,
      y: -10,
      pointerEvents: "auto",
      transition: { duration: 1 },
    },
  };
  return (
    <div
      className={`flex flex-col w-full rounded-[24px] items-center justify-center divide-y bg-white/30`}
    >
      <div className={`flex flex-row h-10 w-full justify-between items-center`}>
        <div
          className={`flex items-center justify-center h-full w-1/2 bg-purple-900/30 ${
            isOn ? "rounded-tl-[24px]" : "rounded-l-[24px]"
          }`}
        >
          Filter
        </div>
        <div
          className={`relative flex items-center justify-center h-full w-1/2 cursor-pointer ${
            isOn
              ? "bg-green-900/30 rounded-tr-[24px]"
              : "bg-red-900/30 rounded-r-[24px]"
          } ` }    onClick={() => setIsOn(!isOn)}
        >
          <motion.span
            className="absolute"
            variants={variants}
            initial={{ opacity: 0, y: 0 }}
            animate={isOn ? "open" : "close"}
          >
            ON
          </motion.span>
          <motion.span
           className=""
            variants={variants}
            initial={{ opacity: 1, y: 0 }}
            animate={!isOn ? "open" : "close"}
          >
            OFF
          </motion.span>
        </div>
      </div>
      {isOn ? (
        <motion.div
          className="space-y-4 divide-y"
          variants={variants}
          initial={{ opacity: 0, y: 0 }}
          animate={isOn ? "open" : "close"}
        >
          <FilterByPrice />
          <FilterByRating />
          <FilterByAmenities />
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
}

// <span className="text-black font-bold pt-4">Filter by: </span>
