import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItemsArray = useSelector((state) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      const cartItemObj = state.cart.items;
      transformedCartItems.push({
        id: key,
        productTitle: cartItemObj[key].productTitle,
        productPrice: cartItemObj[key].productPrice,
        quantity: cartItemObj[key].quantity,
        sum: cartItemObj[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
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
          />
        )}
      />
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
