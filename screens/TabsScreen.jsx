import { TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import MyTabs from "../components/MyTabs";
import { MaterialIcons } from "@expo/vector-icons";

const TabsScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          className="mr-[20px]"
          onPress={() => {
            navigation.navigate("Filters");
          }}
        >
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return <MyTabs />;
};

export default TabsScreen;
