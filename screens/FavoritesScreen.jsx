import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import CustomRow from "../components/CustomRow";
import RecipeListItem from "../components/RecipeListItem";
import { useSelector } from "react-redux";

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.userData.favorites);
  return (
    <View className="flex h-auto py-[10px] flex-1 justify-start items-center bg-white">
      <ScrollView className="w-[100%]">
        <CustomRow itemDisplay="column">
          {favorites ? (
            favorites.map((favorite, index) => (
              <RecipeListItem key={index} recipe={favorite} />
            ))
          ) : (
            <View>
              <CustomText text="You have no favorites to display" />
            </View>
          )}
        </CustomRow>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
