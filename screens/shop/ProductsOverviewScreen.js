import React from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomButton from "../../components/UI/CustomButton";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { colors } from "../../constants/colors";
import { addToCart } from "../../store/actions/cartActions";

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  const viewDetails = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onPress={() => viewDetails(itemData.item.id, itemData.item.title)}
        >
          <CustomButton
            title="View Details"
            onPress={() => viewDetails(itemData.item.id, itemData.item.title)}
            color={colors.secondary}
            style={styles.btn}
          />
          <CustomButton
            title="Add to Cart"
            onPress={() => dispatch(addToCart(itemData.item))}
            color={colors.primary}
            style={styles.btn}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => ({
  headerTitle: "All products",
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
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Cart"
        iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        onPress={() => {
          navData.navigation.navigate("Cart");
        }}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  btn: {
    width: "35%",
  },
});

export default ProductsOverviewScreen;
