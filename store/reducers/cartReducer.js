import CartItem from "../../models/cartItem";
import { ADD_TO_CART } from "../actions/cartActions";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productToAdd = action.product;
      const productPrice = productToAdd.price;
      const productTitle = productToAdd.title;

      let updatedOrNewCartItem;

      if (state.items[productToAdd.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[productToAdd.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[productToAdd.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state, 
        items: { ...state.items, [productToAdd.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };

    default:
      return state;
  }
};

export default cartReducer;
