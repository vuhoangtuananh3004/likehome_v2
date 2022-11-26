import React from "react";
import TextAnimation from "./TextAnimation";
import Image from "next/image";
import SearchBox from "../SearchBar/SearchBox";

function TopSection() {
  return (
    <div className="relative h-[100vh] w-full">
      <div className="absolute left-1/4 top-1/4 z-10">
        <TextAnimation text={"FEEL LIKE HOME"} />
       <SearchBox />
      </div>
      <Image
        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        alt="No image found"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default TopSection;
// <SearchBar />