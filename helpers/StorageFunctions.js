import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { storage } from "../helpers/Firebase";
import * as Random from "expo-random";

export const uploadImageToStorage = async (image) => {
  const blob = await fetch(image).then((response) => response.blob());
  const fileExtension = image.split(".").pop();
  let uuid = await Random.getRandomBytesAsync(16);
  uuid = uuid.join("");
  const fileName = `${uuid}.${fileExtension}`;
  let storageRef = ref(storage, `image/${fileName}`);

  let downloadUrl = await uploadBytes(storageRef, blob)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((newdownloadUrl) => newdownloadUrl);
  return downloadUrl;
};

export const deleteImageFromStorage = async (imageURL) => {
  const path = imageURL.match(/%2F(.*?)\?alt/)[1];
  const imageRef = ref(storage, `image/${path}`);
  await deleteObject(imageRef)
    .then(() => console.log("Old Image has been deleted"))
    .catch((error) =>
      console.log("There was an error deleting the image ", error)
    );
};
