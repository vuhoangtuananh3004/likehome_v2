import Image from "next/image";
import React, { useState } from "react";
import SignupContext from "../Context/SignupContext";
import Navbar from "../Header/Navbar";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Signup from "./Signup";
import {motion} from "framer-motion"
function Account() {
  const [isOpen, setOpen] = useState(true)
  const variants ={
    open: { opacity: 1, pointerEvents: 'auto', transition: { duration: 0.5 } },
  }
  const [signUp, setSignup] = useState(false);
  const [forgotPass, setForgotpass] = useState(false);
  return (
    <motion.div className="relative h-[100vh] w-full" initial={{opacity: 0}} variants={variants}  animate={isOpen ? "open" : "close"}>
     <Navbar/>
      <Image
        src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="No image found"
        layout="fill"
        objectFit="cover"
      />
      <div className="flex h-full w-full justify-center items-center">
        <SignupContext.Provider value={{ signUp, setSignup, setForgotpass }}>
          {!forgotPass ? signUp ? <Signup /> : <Login /> : <ForgotPassword />}
        </SignupContext.Provider>
      </div>
    </motion.div>
  );
}

export default Account;
