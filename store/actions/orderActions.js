import { Alert } from "react-native";

export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => async (dispatch) => {
  try {
    const date = new Date();

    const response = await fetch(
      "https://shop-reactnative-13438-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Unexpected error occurred while loading data from the server"
      );
    }

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  } catch (error) {
    Alert.alert("Error occurred!", error.message, [{ text: "OK" }]);
  }
};
