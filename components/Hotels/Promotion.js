import Image from "next/image";
import Link from "next/link";
import React from "react";

function Promotion() {
  return (
    <div className="flex flex-col items-center w-full bg-white/10 p-2 cursor-pointer">
      <div
        className="h-24 w-24 pr-18 bg-cover overflow-hidden bg-[url('/svg/Discount.svg')]"
        title=""
      ></div>
      <div className="flex flex-col w-full text-[16px]">
        <span className="text-center">Member only</span>
        <span className="text-center">Earn 2 points on every 5$</span>
      </div>
    </div>
  );
}

export default Promotion;
