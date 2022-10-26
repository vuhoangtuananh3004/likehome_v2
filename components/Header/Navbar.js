import React, { useState, useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Hamburger from "./Hamburger";
import Link from "next/link";

function Navbar() {


  return (
    <div
      className="flex flex-row w-full justify-between align-center items-center p-5 text-white fixed top-0 z-20 bg-black/50"
    >
      <div className="text-[40px]">
        <HomeOutlinedIcon fontSize="inherit" />
      </div>
      <Link href={"/"}><span className="font-bold text-[20px] cursor-pointer">HOME</span></Link>
      <Hamburger />
    </div>
  );
}

export default Navbar;