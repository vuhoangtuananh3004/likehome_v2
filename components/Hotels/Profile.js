import React, { useState } from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/router";
import useAuth from "../Account/useAuth";
function Profile() {
  const router = useRouter();
  const user = useAuth()
  const SignOut = (e) => {
    e.preventDefault();
    auth.signOut();
    router.replace("/account")
  }

  const SignIn = (e) => {
    e.preventDefault()
    router.replace("/account")
  }
  return (
    <div className="flex flex-col w-full bg-sky-700/80 p-4 rounded-tr-[24px] ">
      <div className="flex flex-col w-full justify-center items-center space-y-5">
        <div className="flex justify-center items-center h-[50px] w-[50px] rounded-full text-[48px] bg-blue-500">
          <PersonOutlineRoundedIcon fontSize="inherit" />
        </div>
        {(!user.user) ? (
          <span onClick={SignIn}>Sign in ?</span>
        ) : (
          <div className="flex flex-col text-center">
            <span>Hi, Anthony</span>
            <span>User Profile</span>
            <span className="cursor-pointer hover:text-slate-900 underline underline-offset-2" onClick={SignOut}>Sign Out</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
