const initialState = {
  loading: false,
  success: false,
};

// eslint-disable-next-line default-param-last
const status = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default status;
