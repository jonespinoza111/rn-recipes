import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RecipeThumbnail from "./RecipeThumbnail";
import { useNavigation } from "@react-navigation/native";

const CustomListRow = ({ recipes, buttonTitle, param }) => {
  const navigation = useNavigation();
  const onPressHandler = (id) => {
    navigation.navigate("Recipe", { recipeId: id })
  }

  const onPressViewAllHandler = () => {
    console.log('paramok', param);
    navigation.navigate("Search Results", { searchQuery: param });
  };
  return (
    <ScrollView className="pb-2" horizontal={true}>
      {recipes ? (
        <React.Fragment>
          {recipes &&
            recipes.results &&
            recipes.results.map(({ id, title, image }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPressHandler(id)}
              >
                <View className="flex flex-col items-center">
                  <RecipeThumbnail url={image} size="large" />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="text-center w-[155px]"
                  >
                    {title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity onPress={onPressViewAllHandler}>
            <View className="flex justify-center items-center w-[155px] h-[155px] rounded mx-[6px] bg-black">
              <View className="flex justify-center items-center px-[10px] roudned w-[100%]">
                <Text className="text-center text-[16px] text-white uppercase px-[2px]">{`View All ${buttonTitle}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </React.Fragment>
      ) : (
        <View>
          <ActivityIndicator size="small" />
        </View>
      )}
    </ScrollView>
  );
};

export default CustomListRow;
