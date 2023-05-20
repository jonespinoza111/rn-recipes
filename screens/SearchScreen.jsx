import { View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import CustomButton from "../components/CustomButton";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const onPressHandler = (searchQuery) => {
    navigation.navigate("Search Results", { searchQuery });
  };
  return (
    <View className="flex justify-start items-center flex-1 px-[10px] pt-[10px]">
      <Searchbar
        placeholder="Search for a recipe"
        onChangeText={(query) => setsearchQuery(query)}
        value={searchQuery}
        onIconPress={() => onPressHandler(searchQuery)}
      />
      <View className="mt-[10px] w-[90%]">
        <CustomButton
          title="Search"
          onPress={() => onPressHandler(searchQuery)}
          buttonColor="bg-blue-200"
          textColor="text-black"
        />
      </View>
    </View>
  );
};

export default SearchScreen;
