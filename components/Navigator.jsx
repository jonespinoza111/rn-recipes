import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import TabsScreen from '../screens/TabsScreen';

const Stack = createStackNavigator();

const defaultStackNavOptions = {
    headerStyle: { backgroundColor: 'white' },
    headerTitleStyle: { color: 'black' },
    headerTitleAlign: 'center'
}

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
        <React.Fragment>
            <Stack.Screen name="Home" component={TabsScreen} />
            <Stack.Screen
                name="Search Results"
                component={SearchResultsScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
        </React.Fragment>
    </Stack.Navigator>
  )
}

export default Navigator;