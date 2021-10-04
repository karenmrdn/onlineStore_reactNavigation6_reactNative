import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import CustomButton from "../../components/UI/CustomButton";
import { colors } from "../../constants/colors";
import { removeFromCart } from "../../store/actions/cartActions";
import { addOrder } from "../../store/actions/orderActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItemsArray = useSelector((state) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      const cartItemObj = state.cart.items[key];
      transformedCartItems.push({
        id: key,
        productTitle: cartItemObj.productTitle,
        productPrice: cartItemObj.productPrice,
        quantity: cartItemObj.quantity,
        sum: cartItemObj.sum,
        productPushToken: cartItemObj.pushToken,
      });
    }
    return transformedCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });

  const handleOrderNowPress = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItemsArray, totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.totalContainer}>
        <Text style={styles.total}>
          Total price:{" "}
          <Text style={styles.totalAccent}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.secondary} />
        ) : (
          <CustomButton
            title="Order Now"
            color={colors.secondary}
            disabled={cartItemsArray.length === 0}
            onPress={handleOrderNowPress}
          />
        )}
      </Card>
      {cartItemsArray.length > 0 ? (
        <FlatList
          data={cartItemsArray}
          renderItem={(itemData) => (
            <CartItem
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              quantity={itemData.item.quantity}
              onRemove={() => {
                dispatch(removeFromCart(itemData.item.id));
              }}
              deletable
            />
          )}
        />
      ) : (
        <Text style={styles.emptyCartText}>
          Your cart is empty yet.{"\n"}But you can always add products!
        </Text>
      )}
    </View>
  );
};

export const cartOptions = {
  headerTitle: "My Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    padding: 16,
    marginBottom: 16,
  },
  total: {
    fontFamily: "open-sans-bold",
  },
  totalAccent: {
    color: colors.primary,
  },
  emptyCartText: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
});

export default CartScreen;
