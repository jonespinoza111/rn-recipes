import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setsearchQuery] = useState('');
    const onPressHandler = (searchQuery) => {
        navigation.navigate("Search Results", { searchQuery });
    };
  return (
    <View className="flex justify-start items-center flex-1 px-[10px] pt-[10px]">
        <Searchbar
            placeholder="Search"
            onChangeText={query => setsearchQuery(query)}
            value={searchQuery}
            onIconPress={() => onPressHandler(searchQuery)}
        />
        <View className="mt-[10px]">
            <Button className="mt-[10px] bg-black" title="Find Recipes" onPress={() => onPressHandler(searchQuery)} />
        </View>
    </View>
  )
}

export default SearchScreen;