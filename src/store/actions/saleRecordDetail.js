import * as productService from '../../services/productService';
import { ADD_SALE_RECORD_DETAIL, DELETE_SALE_RECORD_DETAIL, SET_PRODUCT_OPTIONS, UPDATE_SALE_RECORD_DETAIL } from '../types/saleRecordDetail';
import { SET_LOADING } from '../types/status';

export const getProductOptions = (query) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await productService.getAll(query);
  dispatch({
    type: SET_PRODUCT_OPTIONS,
    payload: response.data,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const deleteProductInSaleRecords = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  dispatch({
    type: DELETE_SALE_RECORD_DETAIL,
    payload: id,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const addProductToSaleRecords = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  dispatch({
    type: ADD_SALE_RECORD_DETAIL,
    payload: data,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const editExistingProductInSaleRecords = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  dispatch({
    type: UPDATE_SALE_RECORD_DETAIL,
    payload: data,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};