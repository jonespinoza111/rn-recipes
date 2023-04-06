import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import FiltersScreen from '../screens/FiltersScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import TabsScreen from '../screens/TabsScreen';

import * as firebase from 'firebase';
import { firebaseConfig } from '../firebase.config';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const defaultStackNavOptions = {
    headerStyle: { backgroundColor: 'white' },
    headerTitleStyle: { color: 'black' },
    headerTitleAlign: 'center'
}

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    setIsLoading(false);
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         setIsSignedIn(true);
    //         dispatch(getUserData(user.uid));
    //         console.log('I have signed in now for real');
    //     } else {
    //         setIsSignedIn(false);
    //     }
    //     setIsLoading(false);
    // });
  }, [firebase]);

  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
        <React.Fragment>
            <Stack.Screen name="Home" component={TabsScreen} />
            <Stack.Screen name="Filters" component={FiltersScreen} />
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