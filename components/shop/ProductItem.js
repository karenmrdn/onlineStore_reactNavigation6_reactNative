import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { colors } from "../../constants/colors";

const ProductItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onViewDetail} useForeground>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: props.imageUrl }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.titleText}>{props.title}</Text>
              <Text style={styles.priceText}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <Button
                title="View Details"
                onPress={props.onViewDetail}
                color={colors.secondary}
              />
              <Button
                title="Add to Cart"
                onPress={props.onAddToCart}
                color={colors.primary}
              />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    // overflow: "hidden",
  },
  touchable: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    height: "60%",
    width: "100%",
  },
  detailsContainer: {
    height: "23%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    marginVertical: 4,
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  priceText: {
    color: "#888",
    fontFamily: "open-sans",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ProductItem;
