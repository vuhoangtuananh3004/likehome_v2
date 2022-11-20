import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHotelsByDestinationId,
  fetchHotelAvailable,
  copyListHotels,
  fetchHotelByDestID,
} from "../../features/hotel/hotelSlice";
import Filter from "../Filter/Filter";
import Hamburger from "../Header/Hamburger";
import Navbar from "../Header/Navbar";
import SearchBox from "../SearchBar/SearchBox";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import HomePage from "../HomePage/HomePage";
import Profile from "./Profile";
import TravelNotice from "./TravelNotice";
import Promotion from "./Promotion";
import { auth } from "../../firebaseConfig";
import useAuth from "../Account/useAuth";
import PropertyCard from "./PropertyCard";

export default function Hotels(props) {
  const router = useRouter()
  const { hotels, locationName, checkin, checkout } = router.query;

  // const getCopyListHotel = useSelector((state) => state.hotels.filterHotels);
  // const getHotelsDestById = useSelector(
  //   (state) => state.hotels.getHotelByDestinationId.hotels
  // );
  // const loadHotels = useSelector(
  //   (state) => state.hotels.getHotelByDestinationId.isLoading
  // );
  // useEffect(() => {
  //   if (loadHotels) {
  //     dispatch(fetchHotelsByDestinationId(hotels));
  //   }
  // }, [loadHotels, dispatch, hotels]);

  // const PropertyCard = dynamic(() => import("./PropertyCard"), {
  //   suspense: true,
  // });
  const filterHotels = useSelector((state) => state.hotels.filterHotels);
  const variants = {
    loaded: { opacity: 1, transition: { duration: 2 } },
    reload: { opacity: 0, transition: { duration: 0 } },
  };
  const isLoading = useSelector(
    (state) => state.hotels.getHotelByDestinationId.isLoading
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) dispatch(fetchHotelByDestID(props.hotels));
  }, [dispatch, isLoading, props.hotels]);

  if (!props) return <h2>Loading........</h2>;
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="absolute brightness-50 h-full w-full top-0 -z-40">
        <Image
          src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="No image found"
          layout="fill"
          objectFit="cover"
          priority
          quality={10}
        />
      </div>
      <div className="flex flex-row w-full justify-evenly items-center text-white p-5">
        <span>Logo</span>
        <motion.div className="z-20" initial={{y:-100}} animate={{y: 0}} transition={{duration:1}}>
          <SearchBox/>
        </motion.div>
        <span>Welcome to {locationName}</span>
      </div>
      <div className="flex flex-row h-full w-full text-white overflow-hidden mt-10">
        <motion.div initial={{x:-300}} animate={{x:0}} transition={{duration: 1}} className="w-[300px]">
          <Profile />
          <Filter />
          <Promotion />
          <TravelNotice />
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1 }} transition={{duration: 2}} className="container min-h-screen w-full overflow-auto ml-10">
          <div className="grid grid-cols-4 gap-5">
            {props.hotels.map((doc) => (
              <div key={doc.id} className="last:mb-[12rem]">
                <PropertyCard images={doc.images} value={doc} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// <div className="relative min-h-screen w-full overflow-hidden">
// <div className="absolute brightness-50 h-screen w-screen">
//   <Image
//     src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//     alt="No image found"
//     layout="fill"
//     objectFit="cover"
//     priority
//     quality={10}
//   />
//   </div>
//   <div className="absolute h-full w-full"></div>
//   {!loadHotels ? (
//     <div className="flex flex-col text-white absolute h-full w-full">
//       <div className="flex flex-row justify-between items-center p-5 w-full mb-10">
//       <span className="text-[36px]">Like Home</span>
//         <SearchBox />
//         <div className="flex flex-col text-center font-bold tracking-widest text-xl mr-20">
//           <span>Welcome to {locationName}</span>
//           <span>There is {getCopyListHotel.length} listings available</span>
//         </div>
//       </div>
//       <div className="flex flex-row h-full w-screen justify-evenly">
//         <div className="h-min w-[300px] rounded-tr-[24px] rounded-br-[24px] border-y-2 border-r-2 border-white drop-shadow-2xl">
//           <Profile/>
//           <Filter />
//           <Promotion/>
//           <TravelNotice/>
//         </div>
//         <div className="flex flex-col h-full w-full">
//           <div className="flex h-full w-full justify-center ">
//             <div className="grid grid-flow-row-dense grid-cols-4 gap-10 h-full overflow-scroll">
//               <Suspense
//                 fallback={`Watting`}
//               >
//                 {getCopyListHotel ? (
//                   <>
//                     {getCopyListHotel.map((doc) => (
//                       <motion.div
//                         variants={variants}
//                         initial={{ opacity: 0 }}
//                         animate={getCopyListHotel ? "loaded" : "reload"}
//                         key={doc.id}
//                         className="last:mb-[8rem]"
//                       >
//                         <PropertyCard images={doc.images} value={doc} />
//                       </motion.div>
//                     ))}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </Suspense>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <></>
//   )}
// </div>
