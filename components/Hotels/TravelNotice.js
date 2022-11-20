import React from "react";

function TravelNotice() {
  return (
    <div className="flex w-full bg-yellow-400/80 text-black font-bold text-center rounded-br-[24px]">
      <div className="relative pt-2 pb-2 w-full">
        <div className="absolute -top-2 -right-1 h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
        <span className="text-md">Get Most Travel Notice !!!</span>
      </div>
    </div>
  );
}

export default TravelNotice;
