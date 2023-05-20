import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const InstructionDetails = ({ data }) => {
  return (
    <View className="w-[100%] h-auto">
      {data ? (
        data.map(({ number, step }, index) => (
          <View
            key={index}
            className="flex flex-row justify-start items-start my-[12px] w-[100%] pl-[10px] pr-[30px]"
          >
            <CustomText
              styles="text-[18px] text-orange-400 mr-[2px]"
              text={`${number}.${" "}`}
            />
            <CustomText styles="text-[18px]" text={`${step}`} />
          </View>
        ))
      ) : (
        <View className="flex flex-row justify-start items-start my-[12px] w-[100%] pl-[10px] pr-[30px]">
          <CustomText text="There were no instructions found." />
        </View>
      )}
    </View>
  );
};

export default InstructionDetails;
