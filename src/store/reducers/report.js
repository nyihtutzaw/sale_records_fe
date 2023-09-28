import { SET_PROFIT_REPORT } from "../types/report";

const initialState = {
    profit: {
      data: [],
      totalProfit : 0
    }
  };
  
  // eslint-disable-next-line default-param-last
  const report = (state = initialState, action) => {
    switch (action.type) {
      case SET_PROFIT_REPORT:
        return {
          ...state,
          profit: {
            data: action.payload.data,
            totalProfit: action.payload.totalProfit,
          }
        };
  
      default:
        return state;
    }
  };
  
  export default report;
  