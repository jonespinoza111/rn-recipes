import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./components/Navigator";
import { Provider } from "react-redux";
import store from "./redux/store";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
