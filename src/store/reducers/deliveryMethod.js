import { DELETE_DELIVERY_METHOD, SET_DELIVERY_METHOD, SET_DELIVERY_METHODS } from "../types/deliveryMethod";

const initialState = {
    deliveryMethods: [],
    deliveryMethod: {},
  };
  
  // eslint-disable-next-line default-param-last
  const deliveryMethod = (state = initialState, action) => {
    switch (action.type) {
      case SET_DELIVERY_METHODS:
        return {
          ...state,
          deliveryMethods: action.payload.data,
        };
      case SET_DELIVERY_METHOD:
        return {
          ...state,
          deliveryMethod: action.payload,
        };
      case DELETE_DELIVERY_METHOD:
        return {
          ...state,
          deliveryMethods: state.deliveryMethods.filter(
            (account) => account.id !== action.payload,
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default deliveryMethod;
  