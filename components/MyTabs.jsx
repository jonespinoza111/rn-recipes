import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RecipeScreen from "../screens/RecipeScreen";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={25} color="black" />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="search" size={20} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="user" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({});
