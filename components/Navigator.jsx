import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import FiltersScreen from '../screens/FiltersScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import TabsScreen from '../screens/TabsScreen';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from '../firebase.config';
import LoadingScreen from '../screens/LoadingScreen';
import AuthScreen from '../screens/AuthScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, prepareUserData } from '../redux/reducers/user-reducer';
import { auth } from '../App';


const Stack = createStackNavigator();

const defaultStackNavOptions = {
    headerStyle: { backgroundColor: 'white' },
    headerTitleStyle: { color: 'black' },
    headerTitleAlign: 'center'
}

export const firebaseApp = initializeApp(firebaseConfig);

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
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <React.Fragment>
            <Stack.Screen name="Main" component={TabsScreen} />
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