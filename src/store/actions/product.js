import * as productService from '../../services/productService';
import {
  DELETE_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCTS,
} from '../types/product';
import { SET_LOADING } from '../types/status';

export const getProducts = (query) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await productService.getAll(query);
  dispatch({
    type: SET_PRODUCTS,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const setProduct = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await productService.getEach(id);
  dispatch({
    type: SET_PRODUCT,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  await productService.deleteProduct(id);
  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
