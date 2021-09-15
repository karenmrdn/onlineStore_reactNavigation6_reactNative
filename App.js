import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import MainDrawerNavigator from "./navigation/ShopNavigator";
import cartReducer from "./store/reducers/cartReducer";
import ordersReducer from "./store/reducers/ordersReducer";
import productReducer from "./store/reducers/productReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={(error) => console.error(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainDrawerNavigator />
    </Provider>
  );
}
