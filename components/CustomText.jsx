import { Text } from "react-native";
import React from "react";

const CustomText = ({ font = "dm-regular", styles, text }) => {
  return (
    <Text className={`${styles}`} style={{ fontFamily: `${font}` }}>
      {text}
    </Text>
  );
};

export default CustomText;
