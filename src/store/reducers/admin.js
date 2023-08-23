
const initialState = {
    admins: [],
    admin: {},
  };
  
  // eslint-disable-next-line default-param-last
  const admin = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ADMINS':
        return {
          ...state,
          admins: action.payload.data,
        };
      case 'SET_ADMIN':
        return {
          ...state,
          admin: action.payload,
        };
      case 'DELETE_ADMIN':
        return {
          ...state,
          admins: state.admins.filter(account => account.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default admin;
  