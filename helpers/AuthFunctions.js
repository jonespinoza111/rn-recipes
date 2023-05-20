import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../helpers/Firebase";

export const createDatabaseUser = async (uid, data, dispatch) => {
  try {
    const docRef = await setDoc(doc(firestore, "users", uid), {
      name: data.name,
      description: "Food Novice",
      email: data.email,
      favorites: "",
      profileImage: data.profileImage || "",
    });
  } catch (err) {
    console.log("Could not create user in database", err);
  }
};
