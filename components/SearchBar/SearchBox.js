import * as React from "react";
import {motion} from 'framer-motion'
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import SearchAutoComplete from "./SearchAutoComplete";
import Dropdown from "react-dropdown";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
export default function SearchBox() {
  const [value, onChange] = useState(new Date());
  const options = ["1", "2", "3"];
  const dropDownFunc = (e) => {
    console.log(e);
  };
  return (
    <div class="grid grid-flow-col auto-cols-max rounded-[24px] text-black">
      <div className="flex flex-col text-center text-white">
        <span className="text-white/60">
          <FmdGoodOutlinedIcon fontSize="inherit" />
        </span>
        <div className="h-[44px] w-[300px] bg-white rounded-l-[24px]">
          <SearchAutoComplete />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-[44px] w-[150px] bg-white-900 text-center divide-x">
          <span className="text-white/60 font-bold">Check-in</span>
          <DatePicker
            onChange={onChange}
            value={value}
            calendarIcon={null}
            clearIcon={null}
            dayPlaceholder={`${value.getDate()}`}
            monthPlaceholder={`${value.getMonth()}`}
            yearPlaceholder={`${value.getYear()}`}
            minDate={new Date()}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-[44px] w-[150px] bg-white-900 text-center divide-x">
          <span className="text-white/60 font-bold">Check out</span>
          <DatePicker
            onChange={onChange}
            value={value}
            calendarIcon={null}
            clearIcon={null}
            dayPlaceholder={`${value.getDate()}`}
            monthPlaceholder={`${value.getMonth()}`}
            yearPlaceholder={`${value.getYear()}`}
            minDate={new Date()}
          />
        </div>
      </div>
      <div className="flex flex-col divide-x">
        <span className="text-white/60 pl-10 font-bold">
          <TagOutlinedIcon fontSize="inherit" />
        </span>
        <div className="flex flex-row divide-x">
          <div className="h-full w-[100px] text-center justify-center items-center divide-x">
            <Dropdown
              options={options}
              onChange={dropDownFunc}
              placeholder="#Room"
            />
          </div>
          <button className="h-[44px] w-[48px] text-black font-bold bg-white rounded-r-[24px] hover:bg-sky-800">
              <ArrowForwardRoundedIcon color="inherit" />
          </button>
        </div>
      </div>
    </div>
  );
}
