import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="casa" component={HomeScreen} />
      <Tab.Screen name="next" component={HomeScreen} />
    </Tab.Navigator>
  )
}

export default MyTabs

const styles = StyleSheet.create({})