import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react';
import { categories } from '../data/data';


const MealTypeScreen = ({ navigation }) => {
    const selectHandler = (category) => {
        const { title, type } = category;
        navigation.navigate("Search Results", { query: { title, type, cuisine: '', searchQuery: '' } });
    };
  return (
    <View className="flex flex-1 w-[100%]">
        <ScrollView className="flex flex-1 w-[100%]">
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => selectHandler(category)}
                >
                    <ImageBackground
                        source={category.image}
                        className="flex flex-1 w-[100%] h-[200px]"
                    >
                        <View className="flex flex-row justify-center items-center h-[100%] bg-slate-100 p-[15px] my-0 mx-0 border-black border-2">
                            <Text className="text-[22px] text-white bg-white p-[5px]">
                                {category.title}
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
  )
}

export default MealTypeScreen;