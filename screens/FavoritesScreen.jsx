import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import CustomRow from '../components/CustomRow';
import RecipeListItem from '../components/RecipeListItem';
import { useSelector } from 'react-redux';

const testFavorites = [
    {
        id: 955591,
        image: "https://spoonacular.com/recipeImages/955591-312x231.jpg",
        imageType: "jpg",
        title: "Baby Kale Breakfast Salad with Quinoa & Strawberries",
    },
    {
        id: 557456,
        image: "https://spoonacular.com/recipeImages/557456-312x231.jpg",
        imageType: "jpg",
        title: "Oatmeal Berry Breakfast Cake ",
    },
    {
        id: 500461,
        image: "https://spoonacular.com/recipeImages/500461-312x231.jpg",
        imageType: "jpg",
        title: "Creamy Chocolate Breakfast Shake",
    },
    {
        id: 607078,
        image: "https://spoonacular.com/recipeImages/607078-312x231.jpg",
        imageType: "jpg",
        title: "Strawberry Infused Quinoa Breakfast Bowl",
    },
    {
        id: 474360,
        image: "https://spoonacular.com/recipeImages/474360-312x231.jpg",
        imageType: "jpg",
        title:
            "Easy Breakfast Bruschetta with Tomato and Avocado – Nigella Lawson – 50 Women Game Changers In Food",
    },
    {
        id: 505103,
        image: "https://spoonacular.com/recipeImages/505103-312x231.jpg",
        imageType: "jpg",
        title: "Strawberry & Peach Quinoa Breakfast",
    },
    {
        id: 495020,
        image: "https://spoonacular.com/recipeImages/495020-312x231.jpg",
        imageType: "jpg",
        title: "Pumpkin Spice Breakfast Shake",
    },
    {
        id: 916852,
        image: "https://spoonacular.com/recipeImages/916852-312x231.jpg",
        imageType: "jpg",
        title: "Strawberry Infused Quinoa Breakfast Bowl",
    },
    {
        id: 694990,
        image: "https://spoonacular.com/recipeImages/694990-312x231.jpg",
        imageType: "jpg",
        title: "Quick Breakfast Taco",
    },
    {
        id: 850397,
        image: "https://spoonacular.com/recipeImages/850397-312x231.jpg",
        imageType: "jpg",
        title: "Plant Protein Power Breakfast Bowls",
    },
];

const FavoritesScreen = () => {
    const favorites = useSelector(state => state.userData.favorites);
  return (
    <View className="flex h-auto py-[10px] flex-1 justify-start items-center bg-white">
        <ScrollView className='w-[100%]'>
            <CustomRow itemDisplay="column">
                {(favorites) ? (
                    favorites.map((favorite, index) => (
                        <RecipeListItem
                            key={index}
                            recipe={favorite}
                        />
                    ))
                ) : (
                    <View>
                        <Text>You have no favorites to display</Text>
                    </View>
                )}
            </CustomRow>
        </ScrollView>
    </View>
  )
}

export default FavoritesScreen;