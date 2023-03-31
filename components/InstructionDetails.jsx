import { View, Text } from 'react-native'
import React from 'react'

const InstructionDetails = ({ data }) => {
  return (
    <View className="w-[100%] h-auto">
        {data ? (
            data.map(({ number, step }, index) => (
                <View key={index} className="flex flex-row justify-start items-start my-[12px] w-[100%] pl-[10px] pr-[30px]">
                    <Text className="text-[18px] text-orange-400 mr-[2px]">
                        {number}.{" "}
                    </Text>
                    <Text className="text-[18px]">{step}</Text>
                </View>
            ))
        ) : (
            <View className="flex flex-row justify-start items-start my-[12px] w-[100%] pl-[10px] pr-[30px]">
                <Text>There were no instructions found.</Text>
            </View>
        )}
    </View>
  )
}

export default InstructionDetails;