import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { loginUserWithEmailAndPass } from "../../features/account/accountSlice";
function useAuth() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginUserWithEmailAndPass(user));
        setUser(user);
      } else {
        setLoading(false);
      }
    });
  }, [user,dispatch]);

  return { user, loading };
}

export default useAuth;
