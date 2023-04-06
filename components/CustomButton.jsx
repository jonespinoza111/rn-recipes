import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ buttonColor, textColor, title, onPress, disabled }) => {
  return (
    <TouchableOpacity
        className={`flex justify-center items-center w-[100%] py-[6px] my-[10px] min-h-[42px] ${buttonColor} ${disabled && 'bg-gray-200'}`}
        onPress={onPress}
        disabled={disabled}
    >
        <Text
            className={`uppercase tracking-wider text-[15px] ${textColor}`}
        >
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton;