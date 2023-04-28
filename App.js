import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./components/Navigator";
import { Provider } from "react-redux";
import store from "./redux/store";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { browserLocalPersistence, browserSessionPersistence, getAuth, initializeAuth, setPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const firestore = getFirestore(app);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
