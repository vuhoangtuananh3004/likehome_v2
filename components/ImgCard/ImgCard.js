import Image from "next/image";
import React from "react";

export default function ImgCard(props) {
  return (
    <div className="relative h-[25rem] min-w-min">
      <div className="flex flex-col justify-end items-center text-center">
      <Image
        className="rounded-[48px]"
        src={props.value.url}
        alt="No image found"
        layout="fixed"
        width={250}
        height={400}
        objectFit="cover"
      />
      <span className="absolute text-white font-bold text-[36px] tracking-wide">{props.value.name}</span>
      </div>
    </div>
  );
}
