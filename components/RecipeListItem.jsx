import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import RecipeThumbnail from './RecipeThumbnail';
import { useNavigation } from '@react-navigation/native';

const RecipeListItem = ({ recipe }) => {
  let { id, title, image } = recipe;
  let navigation = useNavigation();
  const selectHandler = () => {
    navigation.navigate('Recipe', { recipeId: id })
  }
  return (
    <TouchableOpacity className="my-[7px] w-[100%] h-auto flex flex-row justify-start items-start rounded bg-white" onPress={selectHandler}>
        <RecipeThumbnail url={image} />
        <View className="ml-[10px] w-[200px] h-[50%]">
            <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                className="mb-[10px] text-[17px] capitalize"
            >
                {title}
            </Text>
            <Text>40 Min Cook Time</Text>
        </View>
    </TouchableOpacity>
  )
}

export default RecipeListItem;