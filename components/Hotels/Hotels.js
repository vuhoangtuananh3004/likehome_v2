import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHotelsByDestinationId,
  test,
} from "../../features/hotel/hotelSlice";
import Filter from "../Filter/Filter";
import Hamburger from "../Header/Hamburger";
import Navbar from "../Header/Navbar";
import SearchBox from "../SearchBar/SearchBox";
import PropertyCard from "./PropertyCard";

export default function Hotels() {
  const router = useRouter();
  const { hotels } = router.query;
  const getHotelsDestId = useSelector(
    (state) => state.hotels.getHotelByDestinationId.hotels
  );
  const loadHotels = useSelector(
    (state) => state.hotels.getHotelByDestinationId.isLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadHotels) {
      dispatch(fetchHotelsByDestinationId("ChIJaxhMy-sIK4cRcc3Bf7EnOUI"));
    }
  }, [loadHotels, dispatch]);

  if (!loadHotels) {
    console.log(getHotelsDestId);
  }
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="No image found"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute backdrop-blur-[4px] bg-white/10 h-full w-full"></div>

      <div className="flex flex-col text-white absolute h-full w-full">
        <div className="flex flex-row justify-between items-center p-5 w-full">
          <SearchBox />
          <Hamburger />
        </div>
        <div className="flex flex-row h-full w-full">
          <div className="pl-5 w-[300px]">
            <Filter />
          </div>
          <div className="flex flex-col h-full w-full">
            <div className="flex h-full w-full justify-center ">
              <div class="grid grid-flow-row-dense grid-cols-4 gap-4 h-full overflow-scroll">
                {!loadHotels ? (
                  <>
                    {getHotelsDestId.map((doc) => 
                      <div key={doc.id} className="last:mb-[8rem]">
                        <PropertyCard  images={doc.images} value ={doc}/>
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
