import React, { useContext } from "react";
import { motion } from "framer-motion";
import HomePageContext from "../Context/HomePageContext";
import Link from "next/link";
import useAuth from "../Account/useAuth";
import { useRouter } from "next/router";
import { auth } from "../../firebaseConfig";
export default function Navbar() {
  const user = useAuth();
  const router = useRouter();
  const { isOpen, setIsOpen } = useContext(HomePageContext);
  const navBtn = (name) => {
    setIsOpen({ [name]: true });
  };
  const SignOut = (e) => {
    e.preventDefault();
    auth.signOut();
    router.replace("/account");
  };
  const Profile = (e) => {
    e.preventDefault();
    router.replace("/profile");
  };
  return (
    <div className="flex flex-col p-4 tracking-wider font-bold text-lg space-y-2">
      <motion.span
        onClick={() => navBtn("homePage")}
        className={`indent-0.5 cursor-pointer hover:text-white/70 ${
          isOpen.homePage ? "animate-pulse text-red-500" : ""
        }`}
        whileHover={{ x: 5, y: 2 }}
      >
        Home
      </motion.span>
      <motion.span
        onClick={() => navBtn("discoverPage")}
        className={`indent-0.5 cursor-pointer hover:text-white/70 ${
          isOpen.discoverPage ? "animate-pulse text-sky-500" : ""
        }`}
        whileHover={{ x: 5, y: 2 }}
      >
        Discover
      </motion.span>
      <motion.span
        onClick={() => navBtn("aboutUsPage")}
        className={`indent-0.5 cursor-pointer hover:text-white/70 ${
          isOpen.aboutUsPage ? "animate-pulse text-yellow-500" : ""
        }`}
        whileHover={{ x: 5, y: 2 }}
      >
        About Us
      </motion.span>
      {!user.user ? (
        <Link href={"/account"}>
          <span className="font-bold hover:text-white/70 cursor-pointer">
            Account
          </span>
        </Link>
      ) : (
        <>
          <span
            className="font-bold hover:text-red-600 cursor-pointer"
            onClick={Profile}
          >
            Profile{" "}
          </span>
          <span
            className="font-bold hover:text-red-600 cursor-pointer"
            onClick={SignOut}
          >
            Sign Out
          </span>
        </>
      )}
    </div>
  );
}
