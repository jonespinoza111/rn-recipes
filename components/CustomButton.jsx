import { TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const CustomButton = ({ buttonColor, textColor, title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      className={`flex justify-center items-center w-[100%] py-[6px] my-[10px] min-h-[42px] ${buttonColor} ${
        disabled && "bg-gray-200"
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      <CustomText
        font="dm-regular"
        styles={`uppercase tracking-wider text-[15px] ${textColor}`}
        text={`${title}`}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;
