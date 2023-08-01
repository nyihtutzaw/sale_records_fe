export const showAlert = (data) => (dispatch) => {
  dispatch({
    type: 'SET_ALERT_DIALOG',
    payload: data,
  });
};

export const closeAlert = () => (dispatch) => {
  dispatch({
    type: 'SET_ALERT_DIALOG',
    payload: {
      show: false,
    },
  });
};

export const showConfirm = (data) => (dispatch) => {
  dispatch({
    type: 'SET_CONFIRM_DIALOG',
    payload: data,
  });
};

export const closeConfirm = () => (dispatch) => {
  dispatch({
    type: 'SET_CONFIRM_DIALOG',
    payload: {
      show: false,
    },
  });
};
