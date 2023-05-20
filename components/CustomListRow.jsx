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
import CustomText from "./CustomText";

const CustomListRow = ({ recipes, buttonTitle, param }) => {
  const navigation = useNavigation();
  const onPressHandler = (id) => {
    navigation.navigate("Recipe", { recipeId: id });
  };

  const onPressViewAllHandler = () => {
    navigation.navigate("Search Results", { searchQuery: param });
  };
  return (
    <ScrollView className="pb-2" horizontal={true}>
      {recipes ? (
        <React.Fragment>
          {recipes &&
            recipes.results &&
            recipes.results.map(({ id, title, image }, index) => (
              <TouchableOpacity key={index} onPress={() => onPressHandler(id)}>
                <View className="flex flex-col items-center w-auto">
                  <RecipeThumbnail url={image} size="large" />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="text-center w-[155px] mt-[2px]"
                    style={{ fontFamily: "dm-regular" }}
                  >
                    {title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity onPress={onPressViewAllHandler}>
            <View className="flex justify-center items-center w-[155px] h-[155px] rounded mx-[6px] bg-black">
              <View className="flex justify-center items-center px-[10px] roudned w-[100%]">
                <CustomText
                  styles="text-center text-[16px] text-white uppercase px-[2px]"
                  text={`View All ${buttonTitle}`}
                />
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
