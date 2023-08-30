import * as invoiceSettingService from '../../services/invoiceSettingService';
import { SET_LOADING } from '../types/status';
import { SET_INVOICE_SETTING } from '../types/invoiceSetting';


export const setInvoiceSetting = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const response = await invoiceSettingService.get();
  
  dispatch({
    type: SET_INVOICE_SETTING,
    payload: response,
  });
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
