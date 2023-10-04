import * as reportService from '../../services/reportService';
import {
  SET_PROFIT_REPORT,
} from '../types/report';
import { SET_LOADING } from '../types/status';

export const getProfitReport = (query) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await reportService.getProfitReport(query);
  dispatch({
    type: SET_PROFIT_REPORT,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
