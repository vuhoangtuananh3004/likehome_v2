import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

function useAuth() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user)=>{
        if (user){
            setUser(user)
        }else{
            setLoading(false)
        }
    })
  }, [user])
  



  return {user, loading};
}

export default useAuth;
