import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultNavOptions from "../../../constants/defaultNavOptions";
import OrdersScreen, {
  ordersOptions,
} from "../../../screens/shop/OrdersScreen";

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="OrdersList"
        component={OrdersScreen}
        options={ordersOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

export default OrdersNavigator;
