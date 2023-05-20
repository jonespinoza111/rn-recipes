import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import RecipeListItem from "../components/RecipeListItem";
import { useSelector } from "react-redux";
import { API_LINK, API_KEY } from "@env";

const SearchResultsScreen = ({ route, navigation }) => {
  const filters = useSelector((state) => state.filters);

  const { searchQuery } = route.params;
  const sortParam = route.params.sort || "popularity";
  const typeParam = filters.category || "";
  const dietParam = filters.diet || "";
  const intoleranceParam =
    filters.intolerance.length > 1
      ? filters.intolerance.join(",")
      : filters.intolerance[0] || "";
  const cuisineParam =
    filters.cuisine.length > 1
      ? filters.cuisine.join(",")
      : filters.intolerance[0] || "";

  const fetchNumber = 10;
  const [offset, setOffset] = useState(0);
  const [initialLoad, setInitialLoad] = useState(false);
  const [urlString, setUrlString] = useState(
    `${API_LINK}/recipes/complexSearch?query=${searchQuery}&type=${typeParam}&diet=${dietParam}&cuisine=${cuisineParam}&intolerances=${intoleranceParam}&number=${fetchNumber}&sort=${sortParam}&instructionsRequired=true&offset=${offset}&apiKey=${API_KEY}`
  );

  const [response, loading, hasError] = useFetch(urlString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    setUrlString(
      `${API_LINK}/recipes/complexSearch?query=${searchQuery}&type=${typeParam}&diet=${dietParam}&cuisine=${cuisineParam}&intolerances=${intoleranceParam}&number=${fetchNumber}&sort=${sortParam}&instructionsRequired=true&offset=${offset}&apiKey=${API_KEY}`
    );
  }, [offset]);

  const fetchMoreHandler = () => {
    setInitialLoad(true);
    setOffset(offset + fetchNumber);
  };

  if (loading && !initialLoad) {
    return (
      <View className="flex flex-1 justify-center items-center bg-white pt-[5px]">
        <ActivityIndicator size="large" color={"black"} />
      </View>
    );
  }

  const renderFooter = () => {
    return (
      initialLoad &&
      loading && (
        <View>
          <ActivityIndicator size="large" color={"black"} />
        </View>
      )
    );
  };

  return (
    <View className="flex flex-1 justify-center items-center bg-white pt-[5px]">
      {response && response.length ? (
        <FlatList
          className="bg-[#fefefe] w-[100%] px-[10px]"
          data={response}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={(item) => (
            <RecipeListItem navigation={navigation} recipe={item.item} />
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
  );
};

export default SearchResultsScreen;
