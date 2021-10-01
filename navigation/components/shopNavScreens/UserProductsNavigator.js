import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultNavOptions from "../../../constants/defaultNavOptions";
import UserProductsScreen, {
  userProductsOptions,
} from "../../../screens/user/UserProductsScreen";
import EditProductsScreen, {
  editProductsOptions,
} from "../../../screens/user/EditProductsScreen";

const UserProductsStackNavigator = createStackNavigator();

const UserProductsNavigator = () => {
  return (
    <UserProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserProductsStackNavigator.Screen
        name="UserProductsList"
        component={UserProductsScreen}
        options={userProductsOptions}
      />
      <UserProductsStackNavigator.Screen
        name="EditProduct"
        component={EditProductsScreen}
        options={editProductsOptions}
      />
    </UserProductsStackNavigator.Navigator>
  );
};

export default UserProductsNavigator;
