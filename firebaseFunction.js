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
} from "firebase/firestore";

import db from "./firebaseConfig";

// ----------------------------- get DestinationIDs -----------------------------
export const destinationIds = async () => {
 
  const querySnapshot = await getDocs(collection(db, "destinationID"));
  return querySnapshot.docs.map((doc) => doc.data());
};

// ----------------------------- get Properties By DestinationIDs -----------------------------
export const getPropertiesByDestinationId = async (destinationId) => {
  const docRef = doc(db, "hotels", destinationId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

// ----------------------------- get All Properties-----------------------------
export const allProperties = async () => {
  const querySnapshot = await getDocs(collection(db, "hotels"));
  return querySnapshot.docs.map((doc) => doc.data());
};
// ----------------------------- get All Properties-----------------------------
export const checkAvailable = async (hotelId) => {
  const docRef = doc(db, "Check Availability", hotelId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return await docSnap.data().available
  }else{
    return null
  }
};
