import React from "react";
import { FlatList, StyleSheet, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomButton from "../../components/UI/CustomButton";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { colors } from "../../constants/colors";
import { deleteProduct } from "../../store/actions/productActions";

const UserProductsScreen = (props) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const handleEditProduct = (id) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
    });
  };

  const handleProductDelete = (id) => {
    Alert.alert("Are you sure?", "Do  you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onPress={() => handleEditProduct(itemData.item.id)}
        >
          <CustomButton
            title="Delete"
            onPress={() => {
              handleProductDelete(itemData.item.id);
            }}
            color={colors.error}
            style={styles.btn}
          />
          <CustomButton
            title="Edit"
            onPress={() => handleEditProduct(itemData.item.id)}
            color={colors.secondary}
            style={styles.btn}
          />
        </ProductItem>
      )}
    />
  );
};

const isAndroid = Platform.OS === "android";

UserProductsScreen.navigationOptions = (navData) => ({
  headerTitle: "My Products",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={isAndroid ? "md-menu" : "ios-menu"}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Add"
        iconName={isAndroid ? "md-create" : "ios-create"}
        iconSize={23}
        onPress={() => navData.navigation.navigate("EditProduct")}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  btn: {
    width: "30%",
  },
});

export default UserProductsScreen;
