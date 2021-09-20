import { AUTHENTICATE } from "../actions/authActions";

const initialState = {
  token: null,
  useId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        // ...state,
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};

export default authReducer;
