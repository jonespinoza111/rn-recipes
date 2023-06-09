import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../redux/reducers/filters-reducer";
import CustomRow from "../components/CustomRow";
import { categories, cuisines, diets, intolerances } from "../data/data";
import Tag from "../components/Tag";
import CustomText from "../components/CustomText";

const FiltersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const globalFilters = useSelector((state) => state.filters);
  const [filters, setFilters] = useState({ ...globalFilters });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="ml-[20px]" onPress={clearFilters}>
          <Text className="text-[16px]">Clear</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          className="mr-[20px]"
          onPress={() => {
            dispatch(updateFilters(filters));
            ToastAndroid.show("Filters have been applied!", ToastAndroid.SHORT);
            navigation.goBack();
          }}
        >
          <Text className="text-[16px]">Apply</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, filters]);

  const addFilter = (param, type) => {
    let withAdded;
    if (type === "category" && filters[type].length > 0) {
      withAdded = [param];
    } else if (type === "diet" && filters[type].length > 0) {
      withAdded = [param];
    } else {
      withAdded = [...filters[type]];
      withAdded.push(param);
    }
    setFilters({ ...filters, [type]: withAdded });
  };

  const removeFilter = (param, type) => {
    setFilters({
      ...filters,
      [type]: filters[type].filter((name) => param !== name),
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      diet: [],
      cuisine: [],
      intolerance: [],
    });
  };

  return (
    <View className="flex h-auto py-[10px] flex-1 justify-start items-center bg-white">
      <ScrollView className="w-[100%]">
        <CustomRow itemDisplay="column" extraStyles="px-[10px]">
          <CustomText font="dm-bold" text="Category" />
          <CustomText text="Choose only one" />
          <View className="flex flex-row flex-wrap justify-start items-center my-[10px]">
            {categories.map((category, index) => (
              <Tag
                key={index}
                tagInfo={category}
                type="category"
                add={addFilter}
                remove={removeFilter}
                filters={filters}
              />
            ))}
          </View>
        </CustomRow>
        <CustomRow itemDisplay="column" extraStyles="px-[10px]">
          <CustomText font="dm-bold" text="Diet" />
          <CustomText text="Choose only one" />
          <View className="flex flex-row flex-wrap justify-start items-center my-[10px]">
            {diets.map((diet, index) => (
              <Tag
                key={index}
                tagInfo={diet}
                type="diet"
                add={addFilter}
                remove={removeFilter}
                filters={filters}
              />
            ))}
          </View>
        </CustomRow>
        <CustomRow itemDisplay="column" extraStyles="px-[10px]">
          <CustomText font="dm-bold" text="Intolerance" />
          <CustomText text="Choose many" />
          <View className="flex flex-row flex-wrap justify-start items-center my-[10px]">
            {intolerances.map((intolerance, index) => (
              <Tag
                key={index}
                tagInfo={intolerance}
                type="intolerance"
                add={addFilter}
                remove={removeFilter}
                filters={filters}
              />
            ))}
          </View>
        </CustomRow>
        <CustomRow itemDisplay="column" extraStyles="px-[10px]">
          <CustomText font="dm-bold" text="Cuisine" />
          <CustomText text="Choose many" />
          <View className="flex flex-row flex-wrap justify-start items-center my-[10px]">
            {cuisines.map((cuisine, index) => (
              <Tag
                key={index}
                tagInfo={cuisine}
                type="cuisine"
                add={addFilter}
                remove={removeFilter}
                filters={filters}
              />
            ))}
          </View>
        </CustomRow>
      </ScrollView>
    </View>
  );
};

export default FiltersScreen;
