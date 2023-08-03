import * as customerService from '../../services/customerService';
import {
  DELETE_CUSTOMER,
  SET_CUSTOMER,
  SET_CUSTOMERS,
} from '../types/customer';
import { SET_LOADING } from '../types/status';

export const getCustomers = (query) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await customerService.getAll(query);
  dispatch({
    type: SET_CUSTOMERS,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
export const setCustomer = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await customerService.getEach(id);
  dispatch({
    type: SET_CUSTOMER,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const deleteCustomer = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  await customerService.deleteCustomer(id);
  dispatch({
    type: DELETE_CUSTOMER,
    payload: id,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
