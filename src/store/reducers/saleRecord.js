import {
  DELETE_SALE_RECORD,
  EDIT_SALE_RECORD,
  SET_SALE_RECORD,
  SET_SALE_RECORDS,
} from '../types/saleRecord';

const initialState = {
  saleRecords: [],
  saleRecord: {},
  total: 0
};

// eslint-disable-next-line default-param-last
const saleRecord = (state = initialState, action) => {
  switch (action.type) {
    case SET_SALE_RECORDS:
      return {
        ...state,
        saleRecords: action.payload.data,
        total: action.payload.total
      };
    case SET_SALE_RECORD:
      return {
        ...state,
        saleRecord: action.payload,
      };
    case EDIT_SALE_RECORD:
      return {
        ...state,
        saleRecords: state.saleRecords.map((account) => {
          if (account.id !== action.payload.id) {
            return account;
          }
          return {
            ...account,
            ...action.payload.data,
          };
        }),
      };

    case DELETE_SALE_RECORD:
      return {
        ...state,
        saleRecords: state.saleRecords.filter(
          (account) => account.id !== action.payload,
        ),
        total: state.total - 1
      };

    default:
      return state;
  }
};

export default saleRecord;
