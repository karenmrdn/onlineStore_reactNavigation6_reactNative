import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-navigation";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../store/actions/productActions";

const EditProductsScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  let editedProduct;
  if (productId) {
    editedProduct = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id === productId)
    );
  }

  const [title, setTitle] = useState(editedProduct?.title ?? "");
  const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl ?? "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct?.description ?? ""
  );

  const submitHandler = useCallback(() => {
    if (productId) {
      dispatch(updateProduct(productId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
    props.navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.listWrapper}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {!editedProduct && (
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductsScreen.navigationOptions = (navData) => {
  const submit = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          iconSize={23}
          onPress={submit}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  listWrapper: {
    margin: 16,
  },
  inputBlock: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    marginBottom: 2,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default EditProductsScreen;
