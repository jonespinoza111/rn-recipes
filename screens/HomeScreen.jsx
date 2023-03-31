import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomListRow from '../components/CustomListRow';
import CustomRow from '../components/CustomRow';
import RecipeListItem from '../components/RecipeListItem';
import { categories, cuisines, diets } from "../data/data";



const HomeScreen = () => {
  const [popularData, setPopularData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [cuisineData, setCuisineData] = useState();
  const [dietData, setDietData] = useState();
  const [chosenCategory, setChosenCategory] = useState({ title: "" });
  const [chosenCuisine, setChosenCuisine] = useState({ title: "" });
  const [chosenDiet, setChosenDiet] = useState({ title: "" });

  const getData = useCallback(async () => {
    const category =
        categories[Math.floor(Math.random() * categories.length)];
    setChosenCategory(category);
    const cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
    setChosenCuisine(cuisine);
    const diet = diets[Math.floor(Math.random() * diets.length)];
    setChosenDiet(diet);

    const urls = [
        `https://api.spoonacular.com/recipes/complexSearch?sort=random&instructionsRequired=true&number=${5}&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`,
        `https://api.spoonacular.com/recipes/complexSearch?type=${
            category.param
        }&number=${5}&instructionsRequired=true&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`,
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${
            cuisine.param
        }&number=${5}&instructionsRequired=true&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`,
        `https://api.spoonacular.com/recipes/complexSearch?diet=${
            diet.param
        }&instructionsRequired=true&number=${5}&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`,
    ];

    await Promise.all([
        fetch(urls[0])
            .then((res) => res.json())
            .then((res) => setPopularData(res))
            .catch((err) => console.log("first err", err)),
        fetch(urls[1])
            .then((res) => res.json())
            .then((res) => setCategoryData(res))
            .catch((err) => console.log("second err", err)),
        fetch(urls[2])
            .then((res) => res.json())
            .then((res) => setCuisineData(res))
            .catch((err) => console.log("third error", err)),
        fetch(urls[3])
            .then((res) => res.json())
            .then((res) => setDietData(res))
            .catch((err) => console.log("fourth error", err)),
        ]);
        
  }, [fetch]);

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <View className="flex flex-1 justify-center items-center bg-white" >
      <ScrollView className="w-[100%] px-[20px]">
        <Text className="bg-black text-white py-[10px] px-[40px] my-[20px] text-[26px] text-center">
            Check Out Some Amazing Recipes!
        </Text>
        <Image
            source={require("../assets/images/front-page-image.jpg")}
            style={{ width: "100%", height: 400 }}
        />
        <CustomRow itemDisplay="column">
          <Text className="text-[18px] mb-2">Popular</Text>
          <CustomListRow
              recipes={popularData}
              buttonTitle="Popular"
              param="popularity"
              paramType="sort"
          />
        </CustomRow>
        <CustomRow itemDisplay="column">
            <Text className="text-[18px] mb-2">{chosenDiet.title}</Text>
            <CustomListRow
                recipes={dietData}
                buttonTitle={chosenDiet.title}
                param={chosenDiet.param}
                paramType="diet"
            />
        </CustomRow>

        <CustomRow itemDisplay="column">
            <Text className="text-[18px] mb-2">
                {chosenCategory.title}
            </Text>
            {(categoryData && categoryData.results) ? (
                categoryData.results.map((categoryRecipe, index) => (
                    <RecipeListItem
                        key={index}
                        recipe={categoryRecipe}
                    />
                ))
            ) : (
                <View>
                    <ActivityIndicator size="small" />
                </View>
            )}
            <CustomRow
                extraStyles='px-0 mx-0'
                itemDisplay="column"
            >
                <TouchableOpacity
                    onPress={() => console.log('')}
                >
                    <Button
                        title={`View all ${chosenCategory.title || ""}`}
                        color="black"
                    />
                </TouchableOpacity>
            </CustomRow>
        </CustomRow>

        <CustomRow itemDisplay="column">
            <Text className="text-[18px] mb-2">
                {chosenCuisine.title}
            </Text>
            {(cuisineData && cuisineData.results) ? (
                cuisineData.results.map((cuisineRecipe, index) => (
                    <RecipeListItem
                        key={index}
                        recipe={cuisineRecipe}
                    />
                ))
            ) : (
                <View>
                    <ActivityIndicator size="small" />
                </View>
            )}
            <CustomRow
                extraStyles='px-0 mx-0'
                itemDisplay="column"
            >
                <TouchableOpacity
                    onPress={() => console.log('hello')}
                >
                    <Button
                        title={`View all ${chosenCuisine.title || ""}`}
                        color="black"
                    />
                </TouchableOpacity>
            </CustomRow>
        </CustomRow>
      </ScrollView>
    </View>
  )
}

export default HomeScreen;

