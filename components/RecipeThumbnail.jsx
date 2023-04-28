import React from "react";
import { View, Image, Text } from "react-native";
import BreakfastImage from "../assets/images/breakfast-image.jpg";

const RecipeThumbnail = ({ size = "medium", url }) => {
  return (
    <View
      className={`mx-[3px] rounded w-[155px] h-[155px] ${size === 'small' && 'w-[90px] h-[90px]'}`}
    >
      <Image
        className={`mx-[3px] rounded w-[155px] h-[155px] ${size === 'small' && 'w-[90px] h-[90px]'}`}
        source={url ? {
          uri: url,
      } : BreakfastImage}
      />
    </View>
  );
};

export default RecipeThumbnail;
