import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomListRow from "../components/CustomListRow";
import CustomRow from "../components/CustomRow";
import RecipeListItem from "../components/RecipeListItem";
import { categories, cuisines, diets } from "../data/data";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DessertImage from "../assets/images/dessert-image.jpg";
import RandomImage from "../assets/images/random.png";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = () => {
  const [popularData, setPopularData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [cuisineData, setCuisineData] = useState();
  const [dietData, setDietData] = useState();
  const [chosenCategory, setChosenCategory] = useState({ title: "" });
  const [chosenCuisine, setChosenCuisine] = useState({ title: "" });
  const [chosenDiet, setChosenDiet] = useState({ title: "" });
  const [randomRecipe, setRandomRecipe] = useState();

  const userData = useSelector((state) => state.userData);

  const getData = useCallback(async () => {
    const category = categories[Math.floor(Math.random() * categories.length)];
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
      `https://api.spoonacular.com/recipes/random?number=1&instructionsRequired=true&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`,
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
      fetch(urls[4])
        .then((res) => res.json())
        .then((res) => setRandomRecipe(res))
        .catch((err) => console.log("fifth error", err)),
    ]);
  }, [fetch]);

  useEffect(() => {
    // getData();
  }, [getData]);

  const navigation = useNavigation();

  const onPressViewAllHandler = (param) => {
    navigation.navigate("Search Results", { searchQuery: param });
  };

  console.log("userdata herer eerere ", userData);

  return (
    <View className="flex flex-1 justify-center items-center bg-white">
      <ScrollView className="w-[100%] px-[20px]">
        <View className="bg-orange-200 my-[10px] flex flex-row p-[10px]">
          <View className="flex flex-col w-[75%]">
            <Text className="text-grey-200 w-auto text-[15px] font-light text-left">
              Welcome, {userData.name}
            </Text>
            <Text className="text-black pb-[10px] mr-[10px] text-[20px] font-bold text-left">
              Check Out Some Amazing Recipes Below!
            </Text>
          </View>
          <View className="w-[20%] flex justify-center items-center">
            <Image
              className="w-[70px] h-[70px] rounded-full"
              source={DessertImage}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Search Results", { searchQuery: 'Steak' })}>
            <View className="h-[400px]">
                <Image
                    source={require("../assets/images/front-page-image.jpg")}
                    style={{ width: "100%", height: 400 }}
                />
                <View className="absolute h-[400px] w-[100%] bg-[#00000055] flex justify-center items-center">
                    <Text className="text-white text-[30px] w-[150px]">
                    All Steak Recipes!
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            randomRecipe &&
            randomRecipe.recipes &&
            navigation.navigate("Recipe", {
              recipeId: randomRecipe.recipes[0].id,
            })
          }
        >
          <View className="bg-blue-200 my-[10px] flex flex-row p-[10px] rounded">
            <View className="flex flex-col justify-center items-start w-[75%] h-[120px]">
              <Text className="text-black pb-[10px] mr-[10px] text-[22px] font-bold text-left">
                Click here for a random recipe
              </Text>
            </View>
            <View className="w-[20%] flex justify-center items-center">
              <Image
                className="w-[70px] h-[70px] bg-white rounded-full"
                source={RandomImage}
              />
            </View>
          </View>
        </TouchableOpacity>
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

        <View className="bg-orange-200 my-[10px] flex p-[2px] rounded justify-center items-center">
          <View className="flex flex-row items-center justify-start w-[100%] h-[90px]">
            <Text className="text-black text-[22px] ml-[10px] font-bold text-left">
              You can add recipes to your favorites list!
            </Text>
          </View>
          {/* <View className="w-[25%] flex justify-center items-start">
                <Image className="w-[70px] h-[70px] rounded-full" source={DessertImage} />
            </View> */}
        </View>

        <CustomRow itemDisplay="column">
          <Text className="text-[18px] mb-2">{chosenCategory.title}</Text>
          {categoryData && categoryData.results ? (
            categoryData.results.map((categoryRecipe, index) => (
              <RecipeListItem key={index} recipe={categoryRecipe} />
            ))
          ) : (
            <View>
              <ActivityIndicator size="small" />
            </View>
          )}
          <CustomRow extraStyles="px-0 mx-0" itemDisplay="column">
            <Button
              title={`View all ${chosenCategory.title || ""}`}
              color="black"
              onPress={() => onPressViewAllHandler(chosenCategory.title)}
            />
          </CustomRow>
        </CustomRow>

        <CustomRow itemDisplay="column">
          <Text className="text-[18px] mb-2">{chosenCuisine.title}</Text>
          {cuisineData && cuisineData.results ? (
            cuisineData.results.map((cuisineRecipe, index) => (
              <RecipeListItem key={index} recipe={cuisineRecipe} />
            ))
          ) : (
            <View>
              <ActivityIndicator size="small" />
            </View>
          )}
          <CustomRow extraStyles="px-0 mx-0" itemDisplay="column">
            <Button
              title={`View all ${chosenCuisine.title || ""}`}
              color="black"
              onPress={() => onPressViewAllHandler(chosenCuisine.title)}
            />
          </CustomRow>
        </CustomRow>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
