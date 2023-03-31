import { View, Text } from 'react-native'
import React from 'react'

const OverviewDetails = ({ data }) => {
    const { title, prepTime, cookTime, source, caloricBreakdown } = data;
  return (
    <View className="flex justify-center items-start w-[100%] mt-[10px] pl-[10px]">
        <View className="flex justify-start items-start w-[100%] mb-[2px]">
            <Text className="text-[18px]">
                <Text className="text-orange-400">Name: </Text>
                {title || 'N/A'}
            </Text>
        </View>
        <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
            <Text className="text-[18px] text-orange-400">Prep Time: </Text>
            <Text className="text-[18px]">{prepTime || 'N/A '} min(s)</Text>
        </View>
        <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
            <Text className="text-[18px] text-orange-400">Cook Time: </Text>
            <Text className="text-[18px]">{cookTime || 'N/A '} min(s)</Text>
        </View>
        <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
            <Text className="text-[18px] text-orange-400">Source: </Text>
            <Text className="text-[18px]">{source || 'N/A'}</Text>
        </View>
        <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
            <Text className="text-[18px] text-orange-400">Protein: </Text>
            <Text className="text-[18px]">{caloricBreakdown.percentProtein || 'N/A '}%</Text>
        </View>
        <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
            <Text className="text-[18px] text-orange-400">Carbs: </Text>
            <Text className="text-[18px]">{caloricBreakdown.percentCarbs || 'N/A '}%</Text>
        </View>
        <View className="flex flex-row justify-start items-start w-[100%] mb-[2px]">
            <Text className="text-[18px] text-orange-400">Fat: </Text>
            <Text className="text-[18px]">{caloricBreakdown.percentFat || 'N/A '}%</Text>
        </View>
    </View>
  )
}

export default OverviewDetails;