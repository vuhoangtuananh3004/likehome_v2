import React, { useContext, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignupContext from "../Context/SignupContext";
import { UserContext } from "../Context/userContext";
import { useRouter } from "next/router";
import {
  signInAuthUserWithEmailAndPassword,
  getDataUser,
} from "../../firebaseConfig.js";

function Login() {
  const router = useRouter();
  const { setSignup, setForgotpass } = useContext(SignupContext);
  const { setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [Required, setRequired] = useState({
    emailRequired: false,
    passWordRequired: false,
  });
  const txt = "Create an account?";
  let copyRequire = { ...Required };

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
  const SignupForm = () => {
    setSignup(true);
  };
  const ResetPassWordForm = () => {
    setForgotpass(true);
  };
  console.log(pwd);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, pwd);
      const res = getDataUser(user);
      console.log(res);
      setCurrentUser(user);
      console.log(user);
      setEmail("");
      setPwd("");
      router.push("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };
  return (
    <div className="backdrop-blur-md bg-white/30 border-4 border-slate-200 rounded-[50px] w-[500px] h-[600px] text-center ml-10">
      <div className="text-black font-bold text-[40px] pt-10 tracking-widest">
        Sign in
      </div>
      <div className="text-black font-bold text-[20px] pt-5 tracking-wider">
        Login for more Experiences
      </div>
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

          <div
            className="flex w-[400px] h-[50px] rounded-full mt-10 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c"
            onClick={() => handleRequire("password")}
          >
            <input
              className="rounded-l-full pl-10 h-full w-full outline-none"
              type="password"
              id="pwd"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
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
          <button
            className="w-[400px] h-[50px] rounded-full mt-10 mb-4 text-[20px] bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-500 font-bold"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <button className="text-sky-900 underline" onClick={ResetPassWordForm}>
          Reset your password?{" "}
        </button>
        <button onClick={SignupForm} className="text-sky-900 underline">
          Create an account?
        </button>
      </div>
    </div>
  );
}

export default Login;
