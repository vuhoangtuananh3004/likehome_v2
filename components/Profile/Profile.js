import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../../features/account/accountSlice";
import { auth } from "../../firebaseConfig";
import useAuth from "../Account/useAuth";
import Image from "next/image";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import Link from "next/link";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const user = useAuth();
  const data = useSelector((state) => state.account);
  const dispatch = useDispatch();

  console.log(data);

  const [firstname, setFirstname] = useState(data.user.firstname);
  const [lastname, setLastname] = useState(data.user.lastname);
  const [phone, setPhone] = useState(data.user.phone);
  const [editFirstname, setEditFirstname] = useState(false);
  const [editLastname, setEditLastname] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [email] = useState(data.user.email);


  var pwdLen = data.user.pwd.length;
  var pwdHidden = data.user.pwd.charAt(0);
  for (var i = 1; i < pwdLen; i++) {
      pwdHidden += '*';
  }

  var welcome = "Welcome back, " + data.user.firstname + "!";
  var welcomeDefault = "Welcome back!";

  const signOutHandler = (e) => {
    e.preventDefault();
    auth.signOut();
    router.replace("/");
  };
  const EditFirstname = (e) => {
    e.preventDefault();
    if (!editFirstname) {
      setEditFirstname(true);
    } else {
      setEditFirstname(false);
    }
  };

  const EditLastname = (e) => {
    e.preventDefault();
    if (!editLastname) {
      setEditLastname(true);
    } else {
      setEditLastname(false);
    }
  };

  const EditPhone = (e) => {
    e.preventDefault();
    if (!editPhone) {
      setEditPhone(true);
    } else {
      setEditPhone(false);
    }
  };
  
  const onSave = () => {
    dispatch(UpdateProfile({ email, firstname, lastname, phone }));
    setEditPhone(false);
    setEditLastname(false);
    setEditFirstname(false);
  };
  return (
    <>
      <div className="flex flex-row align-center p-4 text-[20px]">
        <button className="flex flex-col text-white px-4 font-bold tracking-widest text-[30px]">
          <p className="hover:scale-110">
            <Link href="/">Home </Link>
          </p>
        </button>
      </div>
      <div className="flex flex-row justify-center align-center p-4 text-[20px]">
        <span className="flex flex-col justify-center align-center text-white text-center font-bold tracking-widest text-[30px] top 20">
          {data.user.firstname ? welcome : welcomeDefault}
        </span>
      </div>
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
      <hr></hr>
      <div className="flex flex-row justify-center align-center p-4 text-[20px]">
        <button className="flex flex-col justify-center align-center text-white px-4 underline text-center">
          <p className="hover:scale-125">Profile</p>
        </button>
        <button className="flex flex-col justify-center align-center text-white px-4 text-center">
          <p className="hover:scale-125"> Reservations</p>
        </button>
        <button className="flex flex-col justify-center align-center text-white px-4 text-center">
          <p className="hover:scale-125">Payment</p>
        </button>
        <button
          className="flex flex-col justify-center align-center text-white px-4 text-center"
          onClick={signOutHandler}
        ></button>
      </div>
      <hr></hr>

      <div className="flex flex-row justify-left align-center">
        <div className="flex flex-col justify-left align-center p-7">
          <span className="text-white pl-20 font-bold tracking-widest text-[16px] p-4">
            First name
          </span>
          <span className="text-white pl-20 font-bold tracking-widest text-[16px] p-4">
            Last name
          </span>
          <span className="text-white pl-20 font-bold tracking-widest text-[16px] p-4">
            Phone number
          </span>
          <span className="text-white pl-20 font-bold tracking-widest text-[16px] p-4">
            Email
          </span>
          <span className="text-white pl-20 font-bold tracking-widest text-[16px] p-4">
            Password
          </span>
          <button className="bg-white p-4 text-black rounded" onClick={onSave}>Save</button>
        </div>
        <div className="flex flex-col justify-left align-center p-7">
          <div className="flex flex-row">
            {editFirstname ? (
              <div className="flex w-[300px] h-[50px] rounded-full ml-20 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
                <input
                  className="rounded-l-full pl-10 h-full w-full outline-none"
                  type="text"
                  placeholder="Enter new firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <BadgeOutlinedIcon className="mr-5" />
              </div>
            ) : (
              <span className="text-white pl-20 tracking-widest text-[16px] p-4">
                {data.user.firstname ? firstname : "first name not found"}
              </span>
            )}
            <button
              className="flex flex-col justify-center align-center text-white p-4 text-center hover:scale-125"
              onClick={EditFirstname}
            >
              <EditOutlinedIcon />
            </button>
          </div>
          <div className="flex flex-row">
            {editLastname ? (
              <div className="flex w-[300px] h-[50px] rounded-full ml-20 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
                <input
                  className="rounded-l-full pl-10 h-full w-full outline-none"
                  type="text"
                  placeholder="Enter new lastname"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <BadgeOutlinedIcon className="mr-5" />
              </div>
            ) : (
              <span className="text-white pl-20 tracking-widest text-[16px] p-4">
                {data.user.lastname ? lastname : "last name not found"}
              </span>
            )}
            <button
              className="flex flex-col justify-center align-center text-white p-4 text-center hover:scale-125"
              onClick={EditLastname}
            >
              <EditOutlinedIcon />
            </button>
          </div>
          <div className="flex flex-row">
            {editPhone ? (
              <div className="flex w-[300px] h-[50px] rounded-full ml-20 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
                <input
                  className="rounded-l-full pl-10 h-full w-full outline-none"
                  type="text"
                  placeholder="Enter new phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <ContactPhoneOutlinedIcon className="mr-5" />
              </div>
            ) : (
              <span className="text-white pl-20 tracking-widest text-[16px] p-4">
                {data.user.phone ? phone : "phone number not found"}
              </span>
            )}
            <button
              className="flex flex-col justify-center align-center text-white p-4 text-center hover:scale-125"
              onClick={EditPhone}
            >
              <EditOutlinedIcon />
            </button>
          </div>
          <div className="flex flex-row">
            <span className="text-white pl-20 tracking-widest text-[16px] p-4">
              {email}
            </span>
          </div>
          <div className="flex flex-row">
            <span className="text-white pl-20 tracking-widest text-[16px] p-4">
            {pwdHidden}
            </span>
          </div>
          
        </div>
        
      </div>
     
    </>
  );
}

export default Profile;
