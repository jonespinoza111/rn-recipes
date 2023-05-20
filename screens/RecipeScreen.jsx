import { View, Text, ScrollView, Image, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import useFetch from "../hooks/useFetch";
import CustomRow from "../components/CustomRow";
import OverviewDetails from "../components/OverviewDetails";
import IngredientDetails from "../components/IngredientDetails";
import InstructionDetails from "../components/InstructionDetails";
import CustomButton from "../components/CustomButton";
import LoadingScreen from "./LoadingScreen";
import { auth } from "../helpers/Firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../helpers/DatabaseFunctions";
import { prepareUserData } from "../redux/reducers/user-reducer";
import Accordion from "../components/Accordion";

const RecipeScreen = ({ route }) => {
  const uid = auth.currentUser.uid;
  const dispatch = useDispatch();
  const { recipeId } = route.params;
  const favorites = useSelector((state) => state.userData.favorites);
  const [isFavorited, setIsFavorited] = useState(
    favorites.some((favorite) => favorite.id === recipeId)
  );

  const [response, loading, hasError] = useFetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=4c14342fb0bf4bcdb5952945a0e7e7ca`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );

  const addFavorites = async () => {
    let updateObj = {
      id: recipeId,
      title: response[0].title,
      image: response[0].image,
    };
    await addToFavorites(uid, recipeId, updateObj).then(() => {
      setIsFavorited(true);
      ToastAndroid.show("Recipe added to favorites!", ToastAndroid.SHORT);
      dispatch(prepareUserData(uid));
    });
  };

  const removeFavorites = async () => {
    await removeFromFavorites(uid, recipeId).then(() => {
      setIsFavorited(false);
      ToastAndroid.show("Recipe removed from favorites!", ToastAndroid.SHORT);
      dispatch(prepareUserData(uid));
    });
  };

  const tabInfo = response[0]
    ? {
        Ingredients: response[0].extendedIngredients,
        Instructions: response[0].analyzedInstructions[0].steps,
        Overview: {
          title: response[0].title,
          source: response[0].sourceName,
          caloricBreakdown: response[0].nutrition.caloricBreakdown,
          prepTime: response[0].preparationMinutes,
          cookTime: response[0].cookingMinutes,
        },
      }
    : {};

  if (loading || response.length < 1) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex flex-1 justify-start items-center">
      <ScrollView className="w-[100%] h-[100%] bg-white">
        <View className="h-[200px] w-[100%] flex justify-center items-center">
          <Image
            resizeMode="cover"
            source={{ uri: response[0].image }}
            className="w-[100%] h-[100%] rounded"
          ></Image>
        </View>
        <View className="flex py-[15px] items-center w-[100%] h-auto bg-white">
          <View className="w-[80%] h-auto flex flex-row justify-center items-center mb-[10px]">
            <Text
              className="text-[20px] text-black text-center capitalize"
              style={{ fontFamily: "dm-regular" }}
            >
              {response[0].title}
            </Text>
          </View>
          <View className="w-[90%] h-auto flex row justify-evenly items-center gap-y-1">
            <View className="flex flex-row justify-start items-center">
              <FontAwesome5
                className="text-orange-200 mr-[5px] text-[15px]"
                name="stopwatch"
              />
              <Text className="mx-[4px]">
                {response[0].readyInMinutes} min(s)
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <FontAwesome5
                className="text-orange-200 mr-[5px] text-[15px]"
                name="user"
              />
              <Text className="mx-[4px]">
                {response[0].servings} Serving(s)
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <FontAwesome5
                className="text-orange-200 mr-[5px] text-[15px]"
                name="tint"
              />
              <Text className="text-black mx-[4px]">
                {Math.round(response[0].nutrition.nutrients[0].amount)} Calories
              </Text>
            </View>
          </View>
          <View className="w-[90%] h-auto flex">
            <CustomButton
              title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
              onPress={isFavorited ? removeFavorites : addFavorites}
              buttonColor="bg-blue-200"
              textColor="black"
            />
          </View>
          <View className="w-[100%] h-auto">
            <CustomRow itemDisplay="column">
              <Accordion title="Overview">
                <OverviewDetails data={tabInfo.Overview} />
              </Accordion>
            </CustomRow>
            <CustomRow itemDisplay="column">
              <Accordion title="Ingredients">
                <IngredientDetails data={tabInfo.Ingredients} />
              </Accordion>
            </CustomRow>
            <CustomRow itemDisplay="column">
              <Accordion title="Instructions">
                <InstructionDetails data={tabInfo.Instructions} />
              </Accordion>
            </CustomRow>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeScreen;
