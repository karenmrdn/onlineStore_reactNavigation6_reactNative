import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import CustomButton from "../components/UI/CustomButton";
import { colors } from "../constants/colors";
import CartScreen, { cartOptions } from "../screens/shop/CartScreen";
import OrdersScreen, { ordersOptions } from "../screens/shop/OrdersScreen";
import ProductDetailScreen, {
  productDetailOptions,
} from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen, {
  productsOverviewOptions,
} from "../screens/shop/ProductsOverviewScreen";
import AuthScreen, { authOptions } from "../screens/user/AuthScreen";
import EditProductsScreen, {
  editProductsOptions,
} from "../screens/user/EditProductsScreen";
import UserProductsScreen, {
  userProductsOptions,
} from "../screens/user/UserProductsScreen";
import { logout } from "../store/actions/authActions";

const isAndroid = Platform.OS === "android";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: isAndroid ? colors.primary : "#fff",
  },
  headerTintColor: isAndroid ? "#fff" : colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans", // style of the text next to the BACK button on iOS
  },
};

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

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

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <CustomButton
                title="Logout"
                color={colors.primary}
                onPress={() => {
                  dispatch(logout());
                  // props.navigation.navigate("Auth");
                }}
                style={{ margin: 16 }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        drawerStyle: {
          paddingTop: 48,
        },
        drawerLabelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          headerShown: false,
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          headerShown: false,
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="UserProducts"
        component={UserProductsNavigator}
        options={{
          title: "My Products",
          headerShown: false,
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
