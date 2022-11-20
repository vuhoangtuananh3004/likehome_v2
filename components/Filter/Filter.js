import React, { useEffect, useState } from "react";
import FilterByAmenities from "./FilterByAmenities";
import FilterByPrice from "./FilterByPrice";
import FilterByRating from "./FilterByRating";
import { motion, AnimatePresence, animate } from "framer-motion";
import FilterContext from "../Context/FilterContext";
import { useDispatch } from "react-redux";
import { filter } from "../../features/hotel/hotelSlice";
export default function Filter() {
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(false);
  const [sort, setSort] = useState({ name: "PRICE", sortType: undefined });
  const [sortR, setSortRating] = useState({
    name: "RATING",
    sortType: undefined,
  });
  const [filterPrice, setPrice] = useState({ name: "PRICE", value: 300 });
  const [filterRating, setRating] = useState({ name: "RATING", value: 5 });
  const [filterAmenities, setFilterAmenities] = useState({
    name: "AMENITIES",
    value: [],
  });
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

  useEffect(() => {
    try {
      dispatch(
        filter([filterPrice, filterRating, filterAmenities, sort, sortR])
      );
    } catch (error) {
      console.log("check");
    }
  }, [dispatch, filterPrice, filterRating, filterAmenities, sort, sortR, isOn]);
  return (
    <FilterContext.Provider
      value={{
        setPrice,
        setRating,
        filterAmenities,
        setFilterAmenities,
        setSort,
        setSortRating,
      }}
    >
      <div
        className={`flex flex-col w-full rounded-tr-[24px] rounded-br-[24px]  divide-y  text-black`}
      >
        <div
          className={`flex flex-row h-10 w-full justify-between items-center`}
        >
          <div
            className={`flex items-center justify-center h-full w-1/2 bg-purple-600 text-white`}
          >
            Filter
          </div>
          <div
            className={`relative flex items-center justify-center h-full w-1/2 cursor-pointer ${
              isOn ? "bg-green-600" : "bg-red-500 "
            } `}
            onClick={() => setIsOn(!isOn)}
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
            className="space-y-4 divide-y bg-blue-200/60"
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
    </FilterContext.Provider>
  );
}

// <span className="text-black font-bold pt-4">Filter by: </span>
