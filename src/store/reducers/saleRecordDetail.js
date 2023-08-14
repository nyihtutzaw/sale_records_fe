import {
  ADD_SALE_RECORD_DETAIL,
  UPDATE_SALE_RECORD_DETAIL,
  DELETE_SALE_RECORD_DETAIL,
  SET_PRODUCT_OPTIONS,
} from '../types/saleRecordDetail';

const initialState = {
  saleRecordDetails: [],
  saleRecordDetail: {},
  productOptions: [],
  originProductOptions: [],
};

// eslint-disable-next-line default-param-last
const saleRecordDetail = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_OPTIONS:
      return {
        ...state,
        productOptions: action.payload,
        originProductOptions: action.payload,
      };
    case ADD_SALE_RECORD_DETAIL: {
      const toAddProductName = state.productOptions?.find(
        (eachProduct) => eachProduct?.id === action.payload?.product_id,
      )?.name;

      const updatedSaleRecordDetails = [
        ...state.saleRecordDetails,
        { ...action.payload, name: toAddProductName },
      ];

      const updatedProductOptions = state.productOptions.filter(
        (eachProduct) => eachProduct?.id !== action.payload?.product_id,
      );

      return {
        ...state,
        saleRecordDetails: updatedSaleRecordDetails,
        productOptions: updatedProductOptions,
      };
    }

    case UPDATE_SALE_RECORD_DETAIL: {
      const updatedSaleRecordDetails = state.saleRecordDetails.map(
        (eachProduct) => {
          if (eachProduct?.product_id === action.payload?.product_id) {
            return { ...action.payload, name: eachProduct?.name };
          }
          return eachProduct;
        },
      );

      return {
        ...state,
        saleRecordDetails: updatedSaleRecordDetails,
      };
    }

    case DELETE_SALE_RECORD_DETAIL: {
      const recoverProduct = state.originProductOptions?.find(
        (eachProduct) => eachProduct?.id === action.payload,
      );

      const updatedSaleRecordDetails = state.saleRecordDetails.filter(
        (eachProduct) => eachProduct?.product_id !== action.payload,
      );
      return {
        ...state,
        saleRecordDetails: updatedSaleRecordDetails,
        productOptions: [...state.productOptions, recoverProduct],
      };
    }

    default:
      return state;
  }
};

export default saleRecordDetail;
