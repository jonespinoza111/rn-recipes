import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import RecipeListItem from '../components/RecipeListItem';
import { useSelector } from 'react-redux';

const recipes = [
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

const SearchResultsScreen = ({ route, navigation }) => {
    const filters = useSelector(state => state.filters);

    const { searchQuery } = route.params;
    const sortParam = route.params.sort || 'popularity';
    const typeParam = filters.category || '';
    const dietParam = filters.diet || '';
    const intoleranceParam = filters.intolerance.length > 1 ? filters.intolerance.join(',') : (filters.intolerance[0] || '');
    const cuisineParam = filters.cuisine.length > 1 ? filters.cuisine.join(',') : (filters.intolerance[0] || '');

    const fetchNumber = 10;
    const [offset, setOffset] = useState(0);
    const [initialLoad, setInitialLoad] = useState(false);
    const [urlString, setUrlString] = useState(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&type=${typeParam}&diet=${dietParam}&cuisine=${cuisineParam}&intolerances=${intoleranceParam}&number=${fetchNumber}&sort=${sortParam}&instructionsRequired=true&offset=${offset}&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`
    );

    const [response, loading, hasError] = useFetch(urlString, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    useEffect(() => {
        setUrlString(
            `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&type=${typeParam}&diet=${dietParam}&cuisine=${cuisineParam}&intolerances=${intoleranceParam}&number=${fetchNumber}&sort=${sortParam}&instructionsRequired=true&offset=${offset}&apiKey=eaca26685ac1458ba5003ef51e1941c1`
        );
    }, [offset]);

    const fetchMoreHandler = () => {
        console.log('fetching more now');
        setInitialLoad(true);
        setOffset(offset + fetchNumber);
    };

    if (loading && !initialLoad) {
        return (
            <View className="flex flex-1 justify-center items-center bg-white pt-[5px]">
                <ActivityIndicator size="large" color={'black'} />
            </View>
        );
    }

    const renderFooter = () => {
        return (
            (initialLoad && loading) && (
                <View>
                    <ActivityIndicator size="large" color={'black'} />
                </View>
            )
        )
    }

  return (
    <View className="flex flex-1 justify-center items-center bg-white pt-[5px]">
        {response && response.length ? (
            <FlatList
                className="bg-[#fefefe] w-[100%] px-[10px]"
                data={response}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                renderItem={(item) => (
                    <RecipeListItem
                        navigation={navigation}
                        recipe={item.item}
                    />
                )}
                onEndReached={fetchMoreHandler}
                onEndReachedThreshold={0.05}
                ListFooterComponent={renderFooter}
            />
        ) : (
            <View>
                <Text>No recipes were found!</Text>
            </View>
        )}
    </View>
  )
}

export default SearchResultsScreen;