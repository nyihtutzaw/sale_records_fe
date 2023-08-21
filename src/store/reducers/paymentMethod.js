import { DELETE_PAYMENT_METHOD, SET_PAYMENT_METHOD, SET_PAYMENT_METHODS } from "../types/paymentMethod";

const initialState = {
    paymentMethods: [],
    paymentMethod: {},
  };
  
  // eslint-disable-next-line default-param-last
  const paymentMethod = (state = initialState, action) => {
    switch (action.type) {
      case SET_PAYMENT_METHODS:
        return {
          ...state,
          paymentMethods: action.payload.data,
        };
      case SET_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload,
        };
      case DELETE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethods: state.paymentMethods.filter(
            (account) => account.id !== action.payload,
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default paymentMethod;
  