import React, { useState, useEffect, useRef } from "react";
import TopSection from "./TopSection";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../NavBar/Navbar";
import HomePageContext from "../Context/HomePageContext";
import MiddleSection from "./MiddleSection";
import Hamburger from "../Header/Hamburger";
import {
  getStateIds,
  fetchDestinationId,
} from "../../features/hotel/hotelSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../SearchBar/SearchBox";

import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import db from "../../firebaseConfig";
import {
  destinationIds,
  getPropertiesByDestinationId,
} from "../../firebaseFunction";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState({ homePage: true });
  const dispatch = useDispatch();
  const destinationIds = useSelector((state) => state.hotels.getDestinations);

  const variants = {
    open: { opacity: 1, pointerEvents: "auto", transition: { duration: 2 } },
    close: { opacity: 0, pointerEvents: "none", transition: { duration: 2 } },
  };

  return (
    <div className="relative overflow-hidden">
      <HomePageContext.Provider value={{ isOpen, setIsOpen }}>
        <div className="fixed ml-20 bottom-5 text-white z-20 bg-black/20 rounded-[24px]">
          <Navbar />
        </div>
        <div className=" absolute z-20 right-0">
          <Hamburger />
        </div>
        <motion.div
          variants={variants}
          initial={{ opacity: 0 }}
          animate={isOpen.homePage ? "open" : "close"}
        >
          <TopSection />
        </motion.div>
        <motion.div
          variants={variants}
          initial={{ opacity: 0 }}
          animate={isOpen.discoverPage ? "open" : "close"}
        >
          <MiddleSection />
        </motion.div>
      </HomePageContext.Provider>
    </div>
  );
}
// -----------------------------Get destination ID-----------------------------
// (async () => {
//   await destinationIds().then((data) => {
//     console.log(data);
//   });
// })();

// -----------------------------Get destination ID-----------------------------
// (async () => {
//   await getPropertiesByDestinationId('').then((data) => {
//     console.log(data);
//   });
// })();
// -----------------------------Get properties by ID-----------------------------
// (async () => {
//   await getPropertiesByDestinationId("ChIJo_yEkM8EmogRDy2K9NjKr4c").then((data) => {
//     console.log(data);
//   });
// })();

// -----------------------------Get all Properties-----------------------------

// (async () => {
//   await allProperties().then((data) => {
//     console.log(data);
//   });
// })();
