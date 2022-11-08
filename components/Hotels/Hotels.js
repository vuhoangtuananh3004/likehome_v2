import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHotelsByDestinationId,
  fetchHotelAvailable,
  copyListHotels,
} from "../../features/hotel/hotelSlice";
import Filter from "../Filter/Filter";
import Hamburger from "../Header/Hamburger";
import Navbar from "../Header/Navbar";
import SearchBox from "../SearchBar/SearchBox";
import PropertyCard from "./PropertyCard";

export default function Hotels() {
  const router = useRouter();
  const { hotels, locationName, checkin, checkout} = router.query;
  const getCopyListHotel = useSelector((state) => state.hotels.filterHotels);
  const getHotelsDestById = useSelector(
    (state) => state.hotels.getHotelByDestinationId.hotels
  );
  const loadHotels = useSelector(
    (state) => state.hotels.getHotelByDestinationId.isLoading
  );

  const dispatch = useDispatch();
  useEffect(() => {
    let test= {id: hotels, checkIn: checkin, checkOut: checkout}
    if (loadHotels) {
      dispatch(fetchHotelsByDestinationId(test));
    }

  }, [loadHotels, dispatch, hotels, checkin, checkout]);


  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="No image found"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute backdrop-blur-[4px] bg-white/10 h-full w-full"></div>
      {!loadHotels ? (
        <div className="flex flex-col text-white absolute h-full w-full">
          <div className="flex flex-row justify-between items-center p-5 w-full">
            <SearchBox />
            <div className="flex flex-col text-center font-bold tracking-widest text-xl">
              <span>Welcome to {locationName}</span>
              <span>
                There is {getCopyListHotel.length} listings available
              </span>
            </div>
            <Hamburger />
          </div>
          <div className="flex flex-row h-full w-full">
            <div className="pl-5 w-[300px]">
              <Filter />
            </div>
            <div className="flex flex-col h-full w-full">
              <div className="flex h-full w-full justify-center ">
                <div className="grid grid-flow-row-dense grid-cols-5 gap-4 h-full overflow-scroll">
                  {getCopyListHotel ? (
                    <>
                      {getCopyListHotel.map((doc) => (
                        <div key={doc.id} className="last:mb-[8rem]">
                          <PropertyCard images={doc.images} value={doc} />
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
