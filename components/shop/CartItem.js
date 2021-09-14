import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>qty</Text>
        <Text style={styles.mainText}>title</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>$amount</Text>
        <TouchableOpacity onPress={props.onPress} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {},
  itemData: {},
  quantity: {},
  mainText: {},
  deleteButton: {},
});

export default CartItem;
