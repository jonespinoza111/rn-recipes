import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import RecipeThumbnail from "../components/RecipeThumbnail";
import { useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/Firebase";
import NoProfileImage from "../assets/images/no-profile.jpg";
import CustomText from "../components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userData);
  const favorites = userData.favorites ? userData.favorites.slice(0, 4) : [];

  const signOutHandler = async () => {
    await AsyncStorage.removeItem("userLogin");
    signOut(auth);
  };
  return (
    <View className="flex flex-1 justify-start items-center h-auto py-[10px] bg-white">
      <ScrollView className="w-[100%]">
        <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
          <View className="flex flex-row justify-start items-center w-[100%]">
            <View className="mr-[20px] rounded">
              <Image
                className="rounded w-[100px] h-[100px]"
                source={
                  userData.profileImage
                    ? {
                        uri: userData.profileImage,
                      }
                    : NoProfileImage
                }
              />
            </View>
            <View>
              <CustomText
                font="dm-bold"
                styles="text-[17px]"
                text={`${userData.name}`}
              />
              <CustomText
                styles="text-[15px] text-[#626262] font-extralight mb-[5px]"
                text={`${userData.description || "N/A"}`}
              />
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
          <View className="flex justify-start w-[100%]">
            <CustomText
              font="dm-bold"
              styles="
            text-[17px]"
              text="Contact Information"
            />
            <CustomText
              styles="text-[15px] text-[#626262] font-extralight mb-[5px]"
              text={`${userData.email || "N/A"}`}
            />
          </View>
        </View>
        <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
          <View className="flex justify-start w-[100%]">
            <CustomText
              font="dm-bold"
              styles="text-[17px]"
              text="My Favorites"
            />
            <CustomText
              styles="text-[15px] text-[#626262] font-extralight mb-[5px]"
              text={`You have ${
                userData.favorites.length || "no"
              } favorited recipes`}
            />
            <ScrollView className="w-[100%] pb-[8px]" horizontal={true}>
              <View className="flex flex-row items-center">
                {favorites.length
                  ? favorites.map(({ id, image }) => (
                      <RecipeThumbnail key={id} url={image} size="small" />
                    ))
                  : null}
                {favorites.length ? (
                  <TouchableOpacity
                    className="flex justify-center items-center mx-[5px] px-[2px] rounded bg-black w-[90px] h-[90px] min-h-[55px]"
                    onPress={() => navigation.navigate("Favorites")}
                  >
                    <CustomText
                      styles="text-[15px] text-md text-white font-bold mb-[5px] uppercase"
                      text="View All"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </View>
        <View className="flex flex-col justify-center items-center py-[15px] px-[20px] w-[100%] bg-white h-auto">
          <CustomButton
            title="Edit Profile"
            onPress={() => navigation.navigate("Edit Profile")}
            buttonColor="bg-blue-200"
            textColor="text-black"
          />
          <CustomButton
            title="Log Out"
            onPress={signOutHandler}
            buttonColor="bg-blue-200"
            textColor="text-black"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
