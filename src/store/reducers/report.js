import { SET_PROFIT_REPORT } from "../types/report";

const initialState = {
    profit: []
  };
  
  // eslint-disable-next-line default-param-last
  const report = (state = initialState, action) => {
    switch (action.type) {
      case SET_PROFIT_REPORT:
        return {
          ...state,
          profit: action.payload.data,
        };
  
      default:
        return state;
    }
  };
  
  export default report;
  