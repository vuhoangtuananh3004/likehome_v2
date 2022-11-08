import * as React from "react";
import { motion } from "framer-motion";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Dropdown from "react-dropdown";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDestinationId } from "../../features/destinations/destinationSlice";
import {
  reloadGetHotelByDestinationId,
  searchBoxFilterValue,
} from "../../features/hotel/hotelSlice";
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp";
import Link from "next/link";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
export default function SearchBox() {
  // ---------------MOTION VARIANTS------------------
  const variants = {
    show: { x: 100 },
  };
  // ---------------WHERE TO GO----------------------
  const isLoading = useSelector(
    (state) => state.hotels.getHotelByDestinationId.isLoading
  );
  const [searchValue, setSearchValue] = useState({
    id: "",
    name: "",
  });
  const destinationIds = useSelector(
    (state) => state.destinations.getDestinations.destinations
  );
  const loadDestinations = useSelector(
    (state) => state.destinations.getDestinations.isLoading
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadDestinations) {
    
      dispatch(fetchDestinationId());
    }

  }, [loadDestinations, dispatch]);

  const items = [];
  if (!loadDestinations) {
    destinationIds.map((doc) => {
      items.push({ id: doc.id, name: doc.location_name });
    });
  }

  const handleOnSearch = (string, results) => {
    if (results.length > 0) {
      setSearchValue({ id: results[0].id, name: results[0].name });
    } else {
      setSearchValue(null);
    }
  };
  const handleOnSelect = (item) => {
    setSearchValue({ id: item.id, name: item.name });
  };
  const formatResult = (item) => {
    return (
      <div className="z-20">
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </div>
    );
  };
  const reloadPage = () => {
    if (!isLoading) {
      dispatch(reloadGetHotelByDestinationId());
    }
    dispatch(
      searchBoxFilterValue({
        checkIn: `${
          valueCheckIn.getMonth() + 1
        }-${valueCheckIn.getDate()}-${valueCheckIn.getFullYear()}`,
        checkOut: `${
          valueCheckOut.getMonth() + 1
        }-${valueCheckOut.getDate()}-${valueCheckOut.getFullYear()}`,
        adults: adult,
      })
    );
  };
  // ---------------DATE----------------------
  /** CHECK-IN */
  const [valueCheckIn, onChangeCheckIn] = useState(new Date());
  const checkIn = `${
    valueCheckIn.getMonth() + 1
  }-${valueCheckIn.getDate()}-${valueCheckIn.getFullYear()}`;
  /** CHECK-OUT */
  const [valueCheckOut, onChangeCheckOut] = useState(new Date());
  const checkOut = `${
    valueCheckOut.getMonth() + 1
  }-${valueCheckOut.getDate()}-${valueCheckOut.getFullYear()}`;
  // ---------------ADULTS----------------------

  console.log(checkIn);
  const [adult, setAdult] = useState();
  const adultOptions = [1, 2, 3];

  const dropDownFunc = (e) => {
    setAdult(e);
  };

  return (
    <div className="grid grid-flow-col auto-cols-max rounded-[24px] text-black opacity-90 drop-shadow-xl z-30">
      <div className="flex flex-col text-center text-white bg-black/50 rounded-bl-[24px]">
        <span className="text-white/60">
          <FmdGoodOutlinedIcon fontSize="inherit" />
        </span>
        <div className="h-[44px] w-[300px] bg-white rounded-l-[24px]">
          <div className="flex flex-row h-full">
            <div className="w-[400px]">
              {!loadDestinations ? (
                <>
                  <ReactSearchAutocomplete
                    styling={{
                      backgroundColor: "white",
                      placeholderColor: "black",
                      iconColor: "black",
                      borderRadius: "24px",
                      height: "44px",
                      border: "none",
                      outline: "none",
                      boxShadow: "white",
                      hoverBackgroundColor: "white",
                    }}
                    items={items}
                    placeholder="Where to go?"
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    autoFocus
                    formatResult={formatResult}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-black/50">
        <div className="h-[44px] w-[150px] text-center divide-x">
          <span className="text-white/60 font-bold">Check-in</span>
          <DatePicker
            onChange={onChangeCheckIn}
            value={valueCheckIn}
            calendarIcon={null}
            clearIcon={null}
            dayPlaceholder={`${valueCheckIn.getDate()}`}
            monthPlaceholder={`${valueCheckIn.getMonth()}`}
            yearPlaceholder={`${valueCheckIn.getYear()}`}
            minDate={new Date()}
            maxDate={new Date("10/31/2023")}
          />
        </div>
      </div>
      <div className="flex flex-col text-center">
        <div className="h-[44px] w-[150px] text-center divide-x bg-black/50">
          <span className="text-white/60 font-bold">Check out</span>
          <DatePicker
            onChange={onChangeCheckOut}
            value={valueCheckOut}
            calendarIcon={null}
            clearIcon={null}
            dayPlaceholder={`${valueCheckOut.getDate()}`}
            monthPlaceholder={`${valueCheckOut.getMonth()}`}
            yearPlaceholder={`${valueCheckOut.getYear()}`}
            minDate={valueCheckIn}
          />
        </div>
      </div>
      <div className="flex flex-col text-center">
        <div className="h-[44px] w-[75px] text-center divide-x bg-black/50">
          <span className="text-white/60 font-bold">Adults</span>
          <Dropdown
            options={adultOptions}
            onChange={dropDownFunc}
            placeholder="#Adults"
          />
        </div>
      </div>

      <div className="flex flex-col text-center">
        <div className="h-[44px] w-[75px] bg-white text-center divide-x bg-black/50">
          <span className="text-white/60 font-bold">
            <FlightTakeoffSharpIcon fontSize="xl" />
          </span>
          <div>
            {searchValue ? (
              <Link
                href={`../hotels/${searchValue.id}?locationName=${searchValue.name}&checkin=${checkIn}&checkout=${checkOut}`}
              >
                <button
                  onClick={reloadPage}
                  className={`h-[44px] w-full bg-white rounded-r-[24px]
                    }`}
                >
                  <motion.div
                    className="flex justify-center items-center text-[24px]"
                    initial={{ x: "-20%" }}
                    animate={{ opacity: 0, x: "40%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowForwardRoundedIcon
                      fontSize="inherit"
                      color="inherit"
                    />
                  </motion.div>
                </button>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// <div className="flex flex-col text-center">
// <div className="h-[44px] w-[75px] text-center divide-x bg-black/50">
//   <span className="text-white/60 font-bold">
//     <TagOutlinedIcon fontSize="inherit" /> Room
//   </span>
//   <Dropdown
//     options={options}
//     onChange={dropDownFunc}
//     placeholder="#Room"
//   />
// </div>
// </div>
