import React from "react";
import { useSelector } from "react-redux";
import { AuthNavigator, ShopNavigator } from "./ShopNavigator";
import { NavigationContainer } from "@react-navigation/native";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {!isAuth && !didTryAutoLogin && <AuthNavigator />}
      {!isAuth && didTryAutoLogin && <StartupScreen />}
      {isAuth && <ShopNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
