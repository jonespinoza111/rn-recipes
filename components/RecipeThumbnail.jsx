import React from 'react'
import { View, Image, Text } from 'react-native'

const RecipeThumbnail = ({ size = "medium", url }) => {
  return (
    <View className="mx-[3px] rounded w-[155px] h-[155px]">
      <Image className="mx-[3px] rounded w-[155px] h-[155px]" source={{ uri: url || 'https://www.seriouseats.com/recipes/images/2015/05/Anova-Steak-Guide-Sous-Vide-Photos15-beauty-1500x1125.jpg' }} />
    </View>
  )
}

export default RecipeThumbnail;