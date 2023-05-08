import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "@firebase/firestore";
import { auth, firestore } from "../App";

export const addToFavorites = async (uid, recipeId, updateObject) => {
  console.log("I am now adding to favorites");
  await setDoc(
    doc(firestore, "users", `${uid}/favorites/${recipeId}`),
    updateObject
  );
};

export const removeFromFavorites = async (uid, recipeId) => {
  console.log("I am now removing from favorites");
  const docRef = doc(firestore, "users", `${uid}/favorites/${recipeId}`);
  await deleteDoc(docRef);
};

export const getFavorites = async (uid) => {
  console.log("I am now getting all the favorites");
  let favorites = [];
  const querySnapshot = await getDocs(
    collection(firestore, "users", `${uid}/favorites`)
  );
  querySnapshot.forEach((doc) => {
    favorites.push(doc.data());
  });

  console.log('big time favorites ', favorites);
  return favorites;
  
};
