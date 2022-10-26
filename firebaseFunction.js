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
  const docRef = doc(db, "hotels", "ChIJaxhMy-sIK4cRcc3Bf7EnOUI");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

// ----------------------------- get All Properties-----------------------------
export const allProperties = async () => {
  const querySnapshot = await getDocs(collection(db, "hotels"));
  return querySnapshot.docs.map((doc) => doc.data());
};
