import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";

const CartScreen = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItemsArray = useSelector((state) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      const cartItemObj = state.cart.items;
      transformedCartItems.push({
        id: key,
        title: cartItemObj[key].title,
        price: cartItemObj[key].price,
        quantity: cartItemObj[key].quantity,
        sum: cartItemObj[key].sum,
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>
          Total price:{" "}
          <Text style={styles.totalAccent}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={colors.secondary}
          disabled={cartItemsArray.length === 0}
        />
      </View>
      <View style={styles.itemsContainer}>
        {cartItemsArray.map((item) => (
          <Text key={item.id} style={styles.item}>
            {item.title}
          </Text>
        ))}
      </View>
    </View>
  );
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
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  total: {
    fontFamily: "open-sans-bold",
  },
  totalAccent: {
    color: colors.primary,
  },
  itemsContainer: {},
  item: {},
});

export default CartScreen;
