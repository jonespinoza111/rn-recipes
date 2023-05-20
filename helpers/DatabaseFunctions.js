import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "@firebase/firestore";
import { firestore } from "../helpers/Firebase";

export const addToFavorites = async (uid, recipeId, updateObject) => {
  await setDoc(
    doc(firestore, "users", `${uid}/favorites/${recipeId}`),
    updateObject
  );
};

export const removeFromFavorites = async (uid, recipeId) => {
  const docRef = doc(firestore, "users", `${uid}/favorites/${recipeId}`);
  await deleteDoc(docRef);
};

export const getFavorites = async (uid) => {
  let favorites = [];
  const querySnapshot = await getDocs(
    collection(firestore, "users", `${uid}/favorites`)
  );
  querySnapshot.forEach((doc) => {
    favorites.push(doc.data());
  });
  return favorites;
};
