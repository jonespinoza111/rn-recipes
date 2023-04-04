import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import RecipeThumbnail from '../components/RecipeThumbnail';

const ProfileScreen = () => {
    const [favorites, setFavorites] = useState([]);
    const [userData, setUserData] = useState({ name: "Jonathan Espinoza", description: 'First Man', profileImage: 'https://st2.depositphotos.com/3213441/12022/v/600/depositphotos_120226152-stock-illustration-pokemon-go-pokeball-round-sign.jpg', email: 'jonespinoza111@gmail.com' })
  return (
    <View className="flex flex-1 justify-start items-center h-auto py-[10px] bg-white">
        <ScrollView>
            <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
                <View className="flex flex-row justify-start items-center w-[100%]">
                    <View className="mr-[20px]">
                        <Image
                            className="rounded"
                            width={100}
                            height={100}
                            source={
                                userData.profileImage && {
                                    uri: userData.profileImage,
                                }
                            }
                        />
                    </View>
                    <View>
                        <Text className="text-[17px] font-bold" >{userData.name}</Text>
                        <Text className="text-[15px] font-extralight mb-[5px]">
                            {userData.description}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
                <View className="flex justify-start w-[100%]">
                    <Text className="text-[17px] font-bold" >Contact Information</Text>
                    <Text className="text-[15px] font-extralight mb-[5px]">{userData.email}</Text>
                </View>
            </View>
            <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
                <View className="flex justify-start w-[100%]">
                    <Text className="text-[17px] font-bold" >My Saved Recipes</Text>
                    <Text className="text-[15px] font-extralight mb-[5px]">
                        You have saved {favorites.length || "no"} recipes
                    </Text>
                    <View className="flex flex-row items-center">
                        {favorites.length
                            ? favorites.map(({ id, image }) => (
                                    <RecipeThumbnail
                                        key={id}
                                        url={image}
                                        size="small"
                                    />
                                ))
                            : null}
                    </View>
                </View>
            </View>
            <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
                <View className="flex justify-start w-[100%]">
                    <Text className="text-[17px] font-bold" >My Created Recipes</Text>
                    <Text className="text-[15px] font-extralight mb-[5px]">
                        You have created 5 new recipes
                    </Text>
                    <View className="flex flex-row items-center">
                        <RecipeThumbnail size="small" />
                        <RecipeThumbnail size="small" />
                        <RecipeThumbnail size="small" />
                        <RecipeThumbnail size="small" />
                        <View className="flex justify-center items-center mx-[5px] px-[2px] rounded bg-green-200 min-h-[55px]">
                            <Text className="text-[15px] font-extralight mb-[5px]">View all</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* <View className="flex justify-center items-center py-[15px] px-[20px] w-[100%] h-auto bg-white">
                <CustomButton
                    title="Edit Profile"
                    onPress={() => navigation.navigate("Edit Profile")}
                    buttonColor="lightblue"
                    textColor="black"
                />
                <CustomButton
                    title="Log Out"
                    onPress={signOutHandler}
                    buttonColor="lightblue"
                    textColor="black"
                />
            </View> */}
        </ScrollView>
    </View>
  )
}

export default ProfileScreen;