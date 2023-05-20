import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

const Tag = ({ tagInfo, type, add, remove, filters }) => {
  let isHighlighted = filters[type].some((name) => tagInfo.param === name);

  useEffect(() => {}, [isHighlighted, filters]);
  return (
    <TouchableOpacity
      onPress={
        isHighlighted
          ? () => remove(tagInfo.param, type)
          : () => add(tagInfo.param, type)
      }
    >
      <View
        className={`flex justify-center items-center mx-[2px] my-[4px] py-[10px] px-[15px] min-w-[80px] w-auto h-[38px] border-1 rounded bg-gray-200 ${
          isHighlighted && "bg-orange-300"
        }`}
      >
        <CustomText text={`${tagInfo.title}`} />
      </View>
    </TouchableOpacity>
  );
};

export default Tag;
