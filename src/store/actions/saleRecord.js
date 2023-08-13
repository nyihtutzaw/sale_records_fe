import * as saleRecordService from '../../services/saleRecordService';
import {
  DELETE_SALE_RECORD,
  SET_SALE_RECORDS,
} from '../types/saleRecord';
import { SET_LOADING } from '../types/status';

export const getSaleRecords = (query) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await saleRecordService.getAll(query);
  dispatch({
    type: SET_SALE_RECORDS,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const deleteSaleRecord = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  await saleRecordService.deleteSaleRecord(id);
  dispatch({
    type: DELETE_SALE_RECORD,
    payload: id,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};