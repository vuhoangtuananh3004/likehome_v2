import Image from "next/image";
import React from "react";

function ReservationImg(props) {
  return (
    <div className="relative h-full w-full">
      <Image
        className=""
        src={props.imgUrl}
        alt="No image found"
        layout="fill"
        objectFit="fill"
        quality={100}
        priority
      />
    </div>
  );
}

export default ReservationImg;
