import { useDispatch } from 'react-redux';

import {
  showAlert, closeAlert, showConfirm, closeConfirm,
} from '../store/actions';

const useDialog = () => {
  const dispatch = useDispatch();
  const showAlertDialog = (data) => {
    dispatch(showAlert({ ...data, show: true }));
  };

  const closeAlertDialog = () => {
    dispatch(closeAlert());
  };

  const showConfirmDialog = (data) => {
    dispatch(showConfirm({ ...data, show: true }));
  };

  const closeConfirmDialog = () => {
    dispatch(closeConfirm());
  };

  return {
    showAlertDialog, closeAlertDialog, showConfirmDialog, closeConfirmDialog,
  };
};

export default useDialog;
