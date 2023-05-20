import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomText from "./CustomText";

const Accordion = ({ title, children }) => {
  const [showContent, setShowContent] = useState(true);
  return (
    <View className="w-[100%]">
      <View className="w-[100%] bg-white text-white flex flex-row justify-between items-center border-b-2 border-[#dadada] pl-[5px] pr-[5px] py-[10px]">
        <CustomText
          styles="bg-black text-orange-300 rounded py-2 px-4 text-[17px]"
          text={`${title}`}
        />
        <TouchableOpacity
          className="px-[10px] flex justify-center items-center"
          onPress={() => setShowContent((prev) => !prev)}
        >
          {showContent ? (
            <FontAwesome5 name="caret-down" size={25} color="black" />
          ) : (
            <FontAwesome5 name="caret-right" size={25} color="black" />
          )}
        </TouchableOpacity>
      </View>
      {showContent && children}
    </View>
  );
};

export default Accordion;
