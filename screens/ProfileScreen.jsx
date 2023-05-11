import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import RecipeThumbnail from "../components/RecipeThumbnail";
import { useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/Firebase";
import NoProfileImage from "../assets/images/no-profile.jpg";
import Accordion from "../components/Accordion";

const ProfileScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userData);
  const favorites = userData.favorites ? userData.favorites.slice(0, 4) : [];

  const signOutHandler = () => {
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
              <Text className="text-[17px] font-bold">{userData.name}</Text>
              <Text className="text-[15px] font-extralight mb-[5px]">
                {userData.description}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
          <View className="flex justify-start w-[100%]">
            <Text className="text-[17px] font-bold">Contact Information</Text>
            <Text className="text-[15px] font-extralight mb-[5px]">
              {userData.email}
            </Text>
          </View>
        </View>
        <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
          <View className="flex justify-start w-[100%]">
            <Text className="text-[17px] font-bold">My Saved Recipes</Text>
            <Text className="text-[15px] font-extralight mb-[5px]">
              You have saved {userData.favorites.length || "no"} recipes
            </Text>
            <ScrollView className="w-[100%] pb-[8px]" horizontal={true}>
              <View className="flex flex-row items-center">
                {favorites.length
                  ? favorites.map(({ id, image }) => (
                      <RecipeThumbnail key={id} url={image} size="small" />
                    ))
                  : null}
                <TouchableOpacity
                  className="flex justify-center items-center mx-[5px] px-[2px] rounded bg-black w-[90px] h-[90px] min-h-[55px]"
                  onPress={() => navigation.navigate("Favorites")}
                >
                  <Text className="text-[15px] text-md text-white font-bold mb-[5px] uppercase">
                    View all
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
        {/* <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
          <View className="flex justify-start w-[100%]">
            <Text className="text-[17px] font-bold">My Created Recipes</Text>
            <Text className="text-[15px] font-extralight mb-[5px]">
              You have created 5 new recipes
            </Text>
            <View className="flex flex-row items-center bg-white w-[100%]">
              <ScrollView className="w-[100%] pb-[8px]" horizontal={true}>
                <RecipeThumbnail size="small" />
                <RecipeThumbnail size="small" />
                <RecipeThumbnail size="small" />
                <RecipeThumbnail size="small" />
                <View className="flex justify-center items-center mx-[5px] px-[2px] rounded bg-green-200 w-[90px] h-[90px] min-h-[55px]">
                  <Text className="text-[15px] font-extralight mb-[5px]">
                    View all
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View> */}
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
