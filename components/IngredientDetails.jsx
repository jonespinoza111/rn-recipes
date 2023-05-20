import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const IngredientDetails = ({ data }) => {
  return (
    <View>
      {data ? (
        data.map(({ original }, index) => (
          <View
            key={index}
            className="flex flex-row justify-start items-start my-[8px] pl-[10px] pr-[30px] w-[100%]"
          >
            <View className="mt-[6px] w-[10px] h-[10px] border-2 rounded border-orange-300 mr-[10px]"></View>
            <CustomText
              styles="text-[18px] capitalize mr-[5px]"
              text={`${original}`}
            />
          </View>
        ))
      ) : (
        <View className="flex flex-row justify-start items-start my-[8px] pl-[10px] pr-[30px] w-[100%]">
          <CustomText styles="" text="There were no ingredients found." />
        </View>
      )}
    </View>
  );
};

export default IngredientDetails;
