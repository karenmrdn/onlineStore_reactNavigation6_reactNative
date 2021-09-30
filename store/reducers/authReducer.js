import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AUTO_LOGIN,
} from "../actions/authActions";

const initialState = {
  token: null,
  useId: null,
  didTryAutoLogin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        // ...state,
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };

    case SET_DID_TRY_AUTO_LOGIN: {
      return { ...state, didTryAutoLogin: true };
    }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
