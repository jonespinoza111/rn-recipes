import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const OverviewDetails = ({ data }) => {
  const { title, prepTime, cookTime, source, caloricBreakdown } = data;
  return (
    <View className="flex justify-center items-start w-[100%] mt-[10px] pl-[10px]">
      <View className="flex flex-row flex-wrap justify-start items-start w-[100%] mb-[2px]">
        <CustomText styles="text-[18px] text-orange-400" text="Name: " />
        <CustomText styles=" text-[18px] text-wrap" text={`${title || "N/A"}`} />
      </View>
      <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
        <CustomText styles="text-[18px] text-orange-400" text="Prep Time: " />
        <CustomText
          styles=" text-[18px]"
          text={`${prepTime || "N/A"} min(s)`}
        />
      </View>
      <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
        <CustomText styles="text-[18px] text-orange-400" text="Cook Time: " />
        <CustomText
          styles=" text-[18px]"
          text={`${cookTime || "N/A"} min(s)`}
        />
      </View>
      <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
        <CustomText styles="text-[18px] text-orange-400" text="Source: " />
        <CustomText styles=" text-[18px]" text={`${source || "N/A"}`} />
      </View>
      <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
        <CustomText styles="text-[18px] text-orange-400" text="Protein: " />
        <CustomText
          styles=" text-[18px]"
          text={`${caloricBreakdown.percentProtein || "N/A"}%`}
        />
      </View>
      <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
        <CustomText styles="text-[18px] text-orange-400" text="Carbs: " />
        <CustomText
          styles=" text-[18px]"
          text={`${caloricBreakdown.percentCarbs || "N/A"}%`}
        />
      </View>
      <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
        <CustomText styles="text-[18px] text-orange-400" text="Fat: " />
        <CustomText
          styles=" text-[18px]"
          text={`${caloricBreakdown.percentFat || "N/A"}%`}
        />
      </View>
    </View>
  );
};

export default OverviewDetails;
