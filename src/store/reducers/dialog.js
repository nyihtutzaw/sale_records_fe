const initialState = {
  alertDialog: {
    show: false,
    title: '',
    body: '',
    acceptLabel: 'OK',
  },
  confirmDialog: {
    show: false,
    title: '',
    body: '',
    acceptLabel: 'Submit',
    cancelLabel: 'Cancel',
  },
};

// eslint-disable-next-line default-param-last
const dialog = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALERT_DIALOG':
      return {
        ...state,
        alertDialog: action.payload,
      };
    case 'SET_CONFIRM_DIALOG':
      return {
        ...state,
        confirmDialog: { ...state.confirmDialog, ...action.payload },
      };
    default:
      return state;
  }
};

export default dialog;
