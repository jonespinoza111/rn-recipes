import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
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
import GetStartedModal from "../components/GetStartedModal";
import CustomText from "../components/CustomText";

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
    getData();
  }, [getData]);

  const navigation = useNavigation();

  const onPressViewAllHandler = (param) => {
    navigation.navigate("Search Results", { searchQuery: param });
  };
  return (
    <View className="flex flex-1 justify-center items-center bg-white">
      <GetStartedModal />
      <ScrollView className="w-[100%] px-[20px]">
        <View className="bg-orange-200 my-[10px] flex flex-row p-[10px] rounded">
          <View className="flex flex-col w-[75%]">
            <CustomText
              font="dm-regular"
              styles="text-grey-200 w-auto text-[15px] text-left"
              text={`Welcome, ${userData.name}`}
            />
            <CustomText
              font="dm-bold"
              styles="text-black pb-[10px] mr-[10px] text-[20px] text-left"
              text="Check Out Some Amazing Recipes Below!"
            />
          </View>
          <View className="w-[20%] flex justify-center items-center">
            <Image
              className="w-[70px] h-[70px] rounded-full"
              source={DessertImage}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search Results", { searchQuery: "Steak" })
          }
        >
          <View className="h-[400px]">
            <Image
              source={require("../assets/images/front-page-image.jpg")}
              style={{ width: "100%", height: 400 }}
            />
            <View className="absolute h-[400px] w-[100%] bg-[#00000055] flex justify-center items-center">
              <CustomText
                styles="text-white text-[30px] w-[150px]"
                text="All Steak Recipes!"
              />
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
              <CustomText
                font="dm-bold"
                styles="text-black pb-[10px] mr-[10px] text-[22px] text-left"
                text="Click here for a random recipe"
              />
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
          <CustomText styles="text-[18px] mb-2 font-semibold" text="Popular" />
          <CustomListRow
            recipes={popularData}
            buttonTitle="Popular"
            param="popularity"
            paramType="sort"
          />
        </CustomRow>
        <CustomRow itemDisplay="column">
          <CustomText styles="text-[18px] mb-2" text={`${chosenDiet.title}`} />
          <CustomListRow
            recipes={dietData}
            buttonTitle={chosenDiet.title}
            param={chosenDiet.param}
            paramType="diet"
          />
        </CustomRow>

        <View className="bg-orange-200 my-[10px] flex p-[2px] rounded justify-center items-center">
          <View className="flex flex-row items-center justify-start w-[100%] h-[90px]">
            <CustomText
              font="dm-bold"
              styles="text-black text-[22px] ml-[10px] font-bold text-left"
              text="You can add recipes to your favorites list!"
            />
          </View>
        </View>

        <CustomRow itemDisplay="column">
          <CustomText
            styles="text-[18px] mb-2"
            text={`${chosenCategory.title}`}
          />

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
              styles={{ fontFamily: "dm-regular" }}
              title={`View all ${chosenCategory.title || ""}`}
              color="black"
              onPress={() => onPressViewAllHandler(chosenCategory.title)}
            />
          </CustomRow>
        </CustomRow>

        <CustomRow itemDisplay="column">
          <CustomText
            styles="text-[18px] mb-2"
            text={`${chosenCuisine.title}`}
          />
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
              styles={{ fontFamily: "dm-regular" }}
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
