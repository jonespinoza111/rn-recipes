import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChooseImageButton from "../components/ChooseImageButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import * as Random from "expo-random";
import { auth, firestore, storage } from "../helpers/Firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { prepareUserData } from "../redux/reducers/user-reducer";
import {
  deleteImageFromStorage,
  uploadImageToStorage,
} from "../helpers/StorageFunctions";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../helpers/DatabaseFunctions";

const schema = yup.object().shape({
  name: yup.string().required("You must enter a name").min(6),
  email: yup
    .string()
    .required("An email is required")
    .email("Email must be a valid email"),
  description: yup.string().max(255, "Your description is too long"),
});

const EditProfileScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  let uid = auth.currentUser.uid;

  const favorites = useSelector((state) => userData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isDescChanged, setIsDescChanged] = useState(false);
  const [isContactChanged, setIsContactChanged] = useState(false);

  const [pickedImage, setPickedImage] = useState(userData.profileImage);

  const onSubmit = async (data) => {
    let downloadUrl;
    const currentImage = userData.profileImage;
    if (userData.profileImage !== pickedImage) {
      downloadUrl = await uploadImageToStorage(pickedImage);
      await deleteImageFromStorage(currentImage);
    }

    const userRef = doc(firestore, "users", `${uid}`);

    await updateDoc(userRef, {
      name: data.name,
      email: data.email,
      description: data.description,
      profileImage: downloadUrl || userData.profileImage,
    })
      .then(() => ToastAndroid.show('Successfully updated profile!', ToastAndroid.SHORT))
      .then(() => dispatch(prepareUserData(uid)))
      .then(() => navigation.goBack())
      .catch((err) =>
        console.log("There was an error updating the user data ", err)
      );
  };
 
  return (
    <View className="flex-1 flex justify-start items-center bg-white">
      <ScrollView className="w-[100%]">
        <View className="flex justify-center items-center w-[100%] h-min-[200px] py-[20px] bg-[#000000b3]">
          <ImageBackground
            className="w-[150px] h-[150px]"
            resizeMode="cover"
            imageStyle={{ borderRadius: 75 }}
            source={{
              uri: pickedImage,
            }}
          >
            <ChooseImageButton setPickedImage={setPickedImage} />
          </ImageBackground>
        </View>
        <View className="w-[100%] h-auto flex items-start bg-white px-[30px] py-[20px]">
          <View className="flex justify-start w-[100%] mb-[10px]">
            <Text className="text-[14px] mb-[5px]">Name</Text>
            <Controller
              name="name"
              defaultValue={userData.name}
              control={control}
              className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                  onChangeText={(value) => {
                    console.log("This is the value in this", value);
                    onChange(value);
                    setIsNameChanged(value !== userData.name);
                  }}
                  value={value}
                />
              )}
            />
          </View>
          <View className="flex justify-start w-[100%] mb-[10px]">
            <Text className="text-[14px] mb-[5px]">Description</Text>
            <Controller
              name="description"
              defaultValue={userData.description}
              control={control}
              className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                  onChangeText={(value) => {
                    console.log("This is the value in this", value);
                    onChange(value);
                    setIsDescChanged(value !== userData.description);
                  }}
                  value={value}
                />
              )}
            />
          </View>
          <View className="flex justify-start w-[100%] mb-[10px]">
            <Text className="text-[14px] mb-[5px]">Contact Information</Text>
            <Controller
              name="email"
              defaultValue={userData.email}
              control={control}
              className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                  onChangeText={(value) => {
                    console.log("This is the value in this", value);
                    onChange(value);
                    setIsContactChanged(value !== userData.email);
                  }}
                  value={value}
                />
              )}
            />
          </View>
          <CustomButton
            title="Update"
            onPress={handleSubmit(onSubmit)}
            buttonColor="bg-blue-200"
            disabled={
              !isNameChanged &&
              !isContactChanged &&
              !isDescChanged &&
              userData.profileImage === pickedImage
            }
            textColor="black"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
