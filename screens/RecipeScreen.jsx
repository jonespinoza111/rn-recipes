import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import useFetch from "../hooks/useFetch";
import { recipeData } from "../data/exampleData";
import CustomRow from "../components/CustomRow";
import OverviewDetails from "../components/OverviewDetails";
import IngredientDetails from "../components/IngredientDetails";
import InstructionDetails from "../components/InstructionDetails";
import CustomButton from "../components/CustomButton";

const RecipeScreen = ({ route }) => {
  //   const { recipeId } = route.params;
  const [isFavorited, setIsFavorited] = useState(false);

  //   const [response, loading, hasError] = useFetch(
  //     `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`,
  //     {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //     }
  //   );

  const addToFavorites = () => {
    console.log('adding to favorites');
  }

  const removeFromFavorites = () => {
    console.log('removing from favorites');
  }




  const tabInfo = recipeData ? {
      Ingredients: recipeData.extendedIngredients,
      Instructions: recipeData.analyzedInstructions[0].steps,
      Overview: {
          title: recipeData.title,
          source: recipeData.sourceName,
          caloricBreakdown: recipeData.nutrition.caloricBreakdown,
          prepTime: recipeData.preparationMinutes,
          cookTime: recipeData.cookingMinutes
      },
  } : { };


  return (
    <View className="flex flex-1 justify-start items-center">
      <ScrollView className="w-[100%] h-[100%]">
        <View className="h-[200px] w-[100%] flex justify-center items-center">
          <Image
            resizeMode="cover"
            source={{ uri: recipeData.image }}
            className="w-[100%] h-[100%] rounded"
          ></Image>
        </View>
        <View className="flex py-[15px] items-center w-[100%] h-auto bg-white">
          <View className="w-[80%] h-auto flex flex-row justify-center items-center mb-[10px]">
            <Text className="text-[20px] text-black text-center capitalize">
              {recipeData.title}
            </Text>
          </View>
          <View className="w-[90%] h-auto flex row justify-evenly items-center gap-y-1">
            <View className="flex flex-row justify-start items-center">
              <FontAwesome5
                className="text-orange-200 mr-[5px] text-[15px]"
                name="stopwatch"
              />
              <Text>{recipeData.readyInMinutes} min(s)</Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <FontAwesome5
                className="text-orange-200 mr-[5px] text-[15px]"
                name="user"
              />
              <Text>{recipeData.servings} Serving(s)</Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <FontAwesome5
                className="text-orange-200 mr-[5px] text-[15px]"
                name="tint"
              />
              <Text className="text-black">
                {Math.round(recipeData.nutrition.nutrients[0].amount)} Calories
              </Text>
            </View>
          </View>
          <View className="w-[90%] h-auto flex">
              <CustomButton
                  title={
                      isFavorited
                          ? "Remove from Favorites"
                          : "Add to Favorites"
                  }
                  onPress={
                      isFavorited
                          ? removeFromFavorites
                          : addToFavorites
                  }
                  buttonColor="bg-blue-200"
                  textColor="black"
              />
          </View>
          <View style={{ width: "100%", height: "auto" }}>
            <CustomRow itemDisplay="column">
                <Text className="text-[17px]">Overview</Text>
                <OverviewDetails data={tabInfo.Overview} />
            </CustomRow>    
            <CustomRow itemDisplay="column">
                <Text className="text-[17px]">Ingredients</Text>
                <IngredientDetails data={tabInfo.Ingredients} />
            </CustomRow>
            <CustomRow itemDisplay="column">
                <Text className="text-[17px]">Instructions</Text>
                <InstructionDetails
                    data={tabInfo.Instructions}
                />
            </CustomRow>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeScreen;
