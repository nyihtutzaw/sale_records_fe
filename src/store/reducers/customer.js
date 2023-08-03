import { DELETE_CUSTOMER, SET_CUSTOMER, SET_CUSTOMERS } from "../types/customer";

const initialState = {
    customers: [],
    customer: {},
  };
  
  // eslint-disable-next-line default-param-last
  const customer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CUSTOMERS:
        return {
          ...state,
          customers: action.payload.data,
        };
      case SET_CUSTOMER:
        return {
          ...state,
          customer: action.payload,
        };
      case DELETE_CUSTOMER:
        return {
          ...state,
          customers: state.customers.filter(
            (account) => account.id !== action.payload,
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default customer;
  