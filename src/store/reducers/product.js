import { DELETE_PRODUCT, SET_PRODUCT, SET_PRODUCTS } from "../types/product";

const initialState = {
    products: [],
    product: {},
    total: 0
  };
  
  // eslint-disable-next-line default-param-last
  const product = (state = initialState, action) => {
    switch (action.type) {
      case SET_PRODUCTS:
        return {
          ...state,
          products: action.payload.data,
          total: action.payload.total
        };
      case SET_PRODUCT:
        return {
          ...state,
          product: action.payload,
        };
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(
            (account) => account.id !== action.payload,
          ),
          total: state.total - 1
        };
  
      default:
        return state;
    }
  };
  
  export default product;
  