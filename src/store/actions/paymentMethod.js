import * as PaymentMethodService from '../../services/paymentMethodService';
import {
  DELETE_PAYMENT_METHOD,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_METHODS
} from '../types/paymentMethod';
import { SET_LOADING } from '../types/status';

export const getPaymentMethods = (query) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await PaymentMethodService.getAll(query);
  console.log(response);
  dispatch({
    type: SET_PAYMENT_METHODS,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const setPaymentMethod = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await PaymentMethodService.getEach(id);
  dispatch({
    type: SET_PAYMENT_METHOD,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const deletePaymentMethod = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  await PaymentMethodService.deletePaymentMethod(id);
  dispatch({
    type: DELETE_PAYMENT_METHOD,
    payload: id,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
