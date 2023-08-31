import { SET_INVOICE_SETTING } from "../types/invoiceSetting";

const initialState = {
    invoiceSetting: {},
  };
  
  // eslint-disable-next-line default-param-last
  const invoiceSetting = (state = initialState, action) => {
    switch (action.type) {
      case SET_INVOICE_SETTING:
        return {
          ...state,
          invoiceSetting: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default invoiceSetting;
  