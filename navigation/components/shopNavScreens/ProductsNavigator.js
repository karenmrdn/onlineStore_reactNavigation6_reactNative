import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultNavOptions from "../../../constants/defaultNavOptions";
import ProductDetailScreen, {
  productDetailOptions,
} from "../../../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen, {
  productsOverviewOptions,
} from "../../../screens/shop/ProductsOverviewScreen";
import CartScreen, { cartOptions } from "../../../screens/shop/CartScreen";

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

export default ProductsNavigator;
