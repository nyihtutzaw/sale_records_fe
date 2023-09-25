import * as DeliveryMethodService from '../../services/deliveryMethodService';
import {
  DELETE_DELIVERY_METHOD,
  SET_DELIVERY_METHOD,
  SET_DELIVERY_METHODS
} from '../types/deliveryMethod';
import { SET_LOADING } from '../types/status';

export const getDeliveryMethods = (query) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await DeliveryMethodService.getAll(query);
  dispatch({
    type: SET_DELIVERY_METHODS,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const setDeliveryMethod = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await DeliveryMethodService.getEach(id);
  dispatch({
    type: SET_DELIVERY_METHOD,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const deleteDeliveryMethod = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  await DeliveryMethodService.deleteDeliveryMethod(id);
  dispatch({
    type: DELETE_DELIVERY_METHOD,
    payload: id,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
