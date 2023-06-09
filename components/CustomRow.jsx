import { View } from "react-native";
import React from "react";

const CustomRow = ({ itemDisplay, children, extraStyles = "" }) => {
  return (
    <View
      className={`flex py-[15px] w-[100%] h-auto bg-white ${
        itemDisplay === "column" && "flex-col justify-center items-start"
      } ${extraStyles}`}
    >
      {children}
    </View>
  );
};

export default CustomRow;
