import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './components/Navigator';
import { Provider } from 'react-redux';
import store from './redux/store';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';


export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
