import React, { useState } from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/router";
import useAuth from "../Account/useAuth";
function Profile(props) {
  const router = useRouter();
  const linkParam = router.query;
  const user = useAuth();
  const SignOut = (e) => {
    e.preventDefault();
    auth.signOut();
    router.replace("/account");
  };
  const Profile = (e) => {
    e.preventDefault();
    router.replace("/profile");
  };
  const SignIn = (e) => {
    e.preventDefault();
    if (linkParam.id) {
      router.replace({
        pathname: `../account/${linkParam.id}`,
        query: { ...linkParam, namePage: props.namePage },
      });
    } else {
      router.replace("/account");
    }
  };
  return (
    <div className="flex flex-col w-full p-4 bg-yellow-200 border text-black rounded-tl-[24px] rounded-tr-[24px] border border-black font-bold tracking-wider ">
      <div className="flex flex-col w-full justify-center items-center space-y-5">
        <div className="flex justify-center items-center h-[50px] w-[50px] rounded-full text-[48px]">
          <PersonOutlineRoundedIcon fontSize="inherit" />
        </div>
        {!user.user ? (
          <span
            className="cursor-pointer text-rose-900 italic underline tracking-wider"
            onClick={SignIn}
          >
            Sign in?
          </span>
        ) : (
          <div className="flex flex-col text-center">
            <span className=" ">Hi, {user.user.displayName}</span>
            <span
              className="cursor-pointer hover:text-slate-900 underline underline-offset-2 cursor-pointer"
              onClick={Profile}
            >
              Profile
            </span>
            <span
              className="cursor-pointer hover:text-slate-900 underline underline-offset-2 cursor-pointer"
              onClick={SignOut}
            >
              Sign Out
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
