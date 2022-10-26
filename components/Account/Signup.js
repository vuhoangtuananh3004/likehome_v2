import React, { useContext, useState, useEffect } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import SignupContext from "../Context/SignupContext";
import { UserContext } from "../Context/userContext";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../firebaseConfig.js";

function Signup() {
  const { setSignup } = useContext(SignupContext);
  const [Required, setRequired] = useState({
    emailRequired: false,
    passWordRequired: false,
  });
  let copyRequire = { ...Required };
  const { setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const object = { email, pwd, matchPwd, firstname, lastname, phone };
  const handleRequire = (e) => {
    e === "email"
      ? (copyRequire.emailRequired = true)
      : (copyRequire.emailRequired = false);
    e === "password"
      ? (copyRequire.passWordRequired = true)
      : (copyRequire.passWordRequired = false);
    setRequired((Required) => ({
      ...copyRequire,
    }));
  };
  const LoginForm = () => {
    setSignup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd !== matchPwd) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, pwd);

      const res = await createUserDocumentFromAuth(user, object);
      console.log(res);
      setCurrentUser(user);

      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  return (
    <div className="backdrop-blur-md bg-white/30 border-4 border-slate-200 rounded-[50px] w-[500px] h-[800px] text-center ml-10">
      <div className="text-black font-bold text-[40px] pt-10 tracking-widest">
        Sign up
      </div>
      <div className="text-black font-bold text-[20px] pt-5 tracking-wider"></div>
      <div className="flex flex-col h-full w-full p-10 mt-5">
        <form onSubmit={handleSubmit}>
          <div
            className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c"
            onClick={() => handleRequire("email")}
          >
            <input
              className="rounded-l-full pl-10 h-full w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
            />
            <EmailOutlinedIcon className="mr-5" />
          </div>
          {Required.emailRequired ? (
            <span className="text-left text-rose-900 mt-2">
              Please fill your Email
            </span>
          ) : (
            <></>
          )}
          <div className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c mt-4">
            <input
              className="rounded-l-full pl-10 h-full w-full outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              name="phone"
              placeholder="Phone number"
            />
            <ContactPhoneOutlinedIcon className="mr-5" />
          </div>
          <div className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c mt-4">
            <input
              className="rounded-full pl-10 h-full w-full outline-none"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First name"
            />
          </div>
          <div className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c mt-4">
            <input
              className="rounded-full pl-10 h-full w-full outline-none"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
            />
          </div>

          <div
            className="flex w-[400px] h-[50px] rounded-full mt-4 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c"
            onClick={() => handleRequire("password")}
          >
            <input
              className="rounded-l-full pl-10 h-full w-full outline-none"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
            />
            <LockOutlinedIcon className="mr-5" />
          </div>
          {Required.passWordRequired ? (
            <span className="text-left text-rose-900 mt-2">
              Please fill your Password
            </span>
          ) : (
            <></>
          )}
          <div className="flex w-[400px] h-[50px] rounded-full mt-4 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
            <input
              className="rounded-l-full pl-10 h-full w-full outline-none"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              placeholder="Confirm new password"
            ></input>
            <LockOutlinedIcon className="mr-5" />
          </div>
          <button
            type="submit"
            className="w-[400px] h-[50px] rounded-full mt-4 mb-4 text-[20px] bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-500 font-bold"
          >
            Sign up
          </button>
        </form>

        <button onClick={LoginForm} className="text-sky-900 underline">
          You have already a LikeHome account?
        </button>
      </div>
    </div>
  );
}

export default Signup;
