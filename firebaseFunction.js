import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";

import db from './firebaseConfig'
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";


// ***************************** AUTHENTICATIONS   ******************************
export const createUser = async (objUser) => {
  if (!objUser.email || !objUser.pwd) return;
  try {
    await setDoc(doc(db, "users", objUser.email), objUser);
    const user = await createUserWithEmailAndPassword(
      auth,
      objUser.email,
      objUser.pwd,
    ).then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: objUser.firstname
      }).then(() => {
        console.log("Profile Updated");
      }).catch((error) => {
        console.log("Unable to update your profile");
      });
      auth.signOut();
    });
    return user;
  } catch (error) {
    alert('Account is already in use')
    console.log("existed");
    return false;
  }
};
export const loginUser = async (objUser) => {
  const q = query(
    collection(db, "users"),
    where("pwd", "==", objUser.pwd),
    where("email", "==", objUser.email)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty){alert("Invalid Email or Password"); return null;}
  signInWithEmailAndPassword(auth, objUser.email, objUser.pwd)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  console.log(querySnapshot.docs[0].data());
  return querySnapshot.docs[0].data();
};
export const forgotPassword = async (objUser) => {
  let temp = await userExisted(objUser).then((data) => data);
  if (!temp) return false;
};
export const userExisted = async (objUser) => {
  const docRef = doc(db, "users", objUser.email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  }
  return false;
};

// ***************************** HOTELS FUNCTIONS   *****************************
// ----------------------------- get DestinationIDs -----------------------------
export const destinationIds = async () => {
  const docRef = collection(db, "destinationID");
  const q = query(docRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

// ----------------------------- get Properties By DestinationIDs ---------------
export const getPropertiesByDestinationId = async (destinationId) => {
  const docRef = doc(db, "hotels", destinationId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
// ----------------------------- get All Properties------------------------------
export const allProperties = async () => {
  const querySnapshot = await getDocs(collection(db, "hotels"));
  return querySnapshot.docs.map((doc) => doc.data());
};
// ----------------------------- get All Properties------------------------------
export const checkAvailable = async (hotelId) => {
  const docRef = doc(db, "checkBookings", hotelId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return await docSnap.data().available;
  } else {
    return null;
  }
};
