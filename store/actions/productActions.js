import { Alert } from "react-native";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://shop-reactnative-13438-default-rtdb.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error(
        "Unexpected error occurred while loading data from the server"
      );
    }

    const responseData = await response.json();

    const fetchedProductsArray = [];
    for (const key in responseData) {
      fetchedProductsArray.push(
        new Product(
          key,
          "u1",
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCTS,
      products: fetchedProductsArray,
    });
  } catch (error) {
    Alert.alert("Error occurred!", error.message, [{ text: "OK" }]);
  }
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT, id });
};

export const createProduct =
  (title, description, imageUrl, price) => async (dispatch) => {
    try {
      const response = await fetch(
        "https://shop-reactnative-13438-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
          }),
        }
      );
      const responseData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: responseData.name,
          title,
          imageUrl,
          description,
          price,
        },
      });
    } catch (error) {
      Alert.alert("Error occurred!", error.message, [{ text: "OK" }]);
    }
  };

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
