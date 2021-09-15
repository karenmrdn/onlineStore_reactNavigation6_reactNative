import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => ({
  headerTitle: "My Orders",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  list: {
    margin: 16,
  },
});

export default OrdersScreen;
