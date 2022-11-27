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
    <div className="flex flex-col justify-center items-center h-full w-full text-white">
      <div className="flex flex-col h-full w-full justify-center">
        <span className="text-center font-bold tracking-widest text-[30px] mt-10">
          {data.user.firstname ? welcome : welcomeDefault}
        </span>
      </div>

<<<<<<<<< Temporary merge branch 1
      <table className="border-separate border-spacing-5 mt-10 text-xl font-bold tracking-wider">
        <tbody>
          <tr>
            <td>First name: </td>
            <td>
              <div className="flex flex-row items-center">
                {editFirstname ? (
                  <div className="flex flex-row items-center h-[40px] w-[300px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
                    <input
                      className="rounded-l-full text-center w-full outline-none text-black"
                      type="text"
                      placeholder="Enter new first name"
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <BadgeOutlinedIcon className="text-black mr-5" />
                  </div>
                ) : (
                  <span className="w-full text-right">
                    {data.user.firstname ? firstname : "first name not found"}
                  </span>
                )}
                <button
                  className="flex flex-col justify-center align-center text-white p-4 text-center hover:scale-125"
                  onClick={EditFirstname}
                >
                  <EditOutlinedIcon />
                </button>
=========
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
          <button className="bg-white p-4 text-black rounded" onClick={onSave}>
            Save
          </button>
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
>>>>>>>>> Temporary merge branch 2
              </div>
            </td>
          </tr>
          <tr>
            <td>Last name: </td>
            <td>
              <div className="flex flex-row items-center">
                {editLastname ? (
                  <div className="flex h-[40px] w-[300px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
                    <input
                      className="rounded-l-full text-center w-full outline-none text-black"
                      type="text"
                      placeholder="Enter new last name"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <BadgeOutlinedIcon className="text-black mr-5" />
                  </div>
                ) : (
                  <span className="w-full text-right">
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
            </td>
          </tr>
          <tr>
            <td>Phone number: </td>
            <td>
              <div className="flex flex-row items-center">
                {editPhone ? (
                  <div className="flex h-[40px] w-[300px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
                    <input
                      className="rounded-l-full text-center w-full outline-none text-black"
                      type="text"
                      placeholder="Enter new phone number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <ContactPhoneOutlinedIcon className="text-black mr-5" />
                  </div>
                ) : (
                  <span className="w-full text-right">
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
<<<<<<<<< Temporary merge branch 1
            </td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>
              <div className="w-full text-right">{email}</div>
            </td>
          </tr>
          <tr>
            <td>Password: </td>
            <td>
              <div className="w-full text-right">{pwdHidden}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="bg-white w-[200px] p-3 text-black rounded-full mt-10" onClick={onSave}>
        Save
      </button>
    </div>
=========
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
>>>>>>>>> Temporary merge branch 2
  );
}

export default Profile;
