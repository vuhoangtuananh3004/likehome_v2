import React, { useContext, useEffect, useState } from "react";
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
  const {user, loading} = useAuth();
  const data = useSelector((state) => state.account.user);
  const dispatch = useDispatch();


  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [phone, setPhone] = useState();
  const [editFirstname, setEditFirstname] = useState(false);
  const [editLastname, setEditLastname] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [email, setEmail] = useState();
  
  useEffect(()=>{
    if (data){
      setFirstname(user.firstname)
      setLastname(user.lastname)
      setPhone(user.phone)
      setEmail(user.email)
    }
  },[data, user])

  console.log(data);
  if(!data) return <h2>Loading....</h2>

  // var pwdLen = user.pwd.length;
  // var pwdHidden = user.pwd.charAt(0);
  // for (var i = 1; i < pwdLen; i++) {
  //   pwdHidden += "*";
  // }

  var welcome = "Welcome back, " + data.firstname + "!";
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
          {data.firstname ? welcome : welcomeDefault}
        </span>
      </div>

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
                    {data.firstname ? data.firstname : "first name not found"}
                  </span>
                )}
                <button
                  className="flex flex-col justify-center align-center text-white p-4 text-center hover:scale-125"
                  onClick={EditFirstname}
                >
                  <EditOutlinedIcon />
                </button>
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
                    {data.lastname ? data.lastname : "last name not found"}
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
                    {data.phone ? data.phone : "phone number not found"}
                  </span>
                )}
                <button
                  className="flex flex-col justify-center align-center text-white p-4 text-center hover:scale-125"
                  onClick={EditPhone}
                >
                  <EditOutlinedIcon />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>
              <div className="w-full text-right">{data.email}</div>
            </td>
          </tr>
          <tr>
            <td>Password: </td>
            <td>
              <div className="w-full text-right">***</div>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="bg-white w-[200px] p-3 text-black rounded-full mt-10" onClick={onSave}>
        Save
      </button>
    </div>
  );
}

export default Profile;