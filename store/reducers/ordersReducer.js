import { ADD_ORDER } from "../actions/orderActions";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        Math.random().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: [...state.orders, newOrder],
      };

    default:
      return state;
  }
};

export default ordersReducer;
