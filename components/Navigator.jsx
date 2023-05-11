import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import FiltersScreen from '../screens/FiltersScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import TabsScreen from '../screens/TabsScreen';

import { onAuthStateChanged } from "firebase/auth";
import LoadingScreen from '../screens/LoadingScreen';
import AuthScreen from '../screens/AuthScreen';
import { useDispatch, useSelector } from 'react-redux';
import { prepareUserData } from '../redux/reducers/user-reducer';
import { auth } from '../helpers/Firebase';
import EditProfileScreen from '../screens/EditProfileScreen';
import ImageOptionsScreen from '../screens/ImageOptionsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';


const Stack = createStackNavigator();

const defaultStackNavOptions = {
    headerStyle: { backgroundColor: 'transparent' },
    headerTitleStyle: { color: 'black' },
    headerTitleAlign: 'center'
}

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const userData = useSelector(user => user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsSignedIn(true);
            console.log('I have signed in now for real', user.uid, userData);
            dispatch(prepareUserData(user.uid));
        } else {
            setIsSignedIn(false);
        }
        setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      {!isSignedIn ? (
        <Stack.Screen options={{ headerShown: false}} name="Auth" component={AuthScreen} />
      ) : (
        <React.Fragment>
            <Stack.Screen name="Main" component={TabsScreen} />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
            <Stack.Screen name="Image Options" component={ImageOptionsScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Filters" component={FiltersScreen} />
            <Stack.Screen
                name="Search Results"
                component={SearchResultsScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
        </React.Fragment>
      )}
    </Stack.Navigator>
  )
}

export default Navigator;