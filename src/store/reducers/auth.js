import {getCache} from "../../utils/cache";

const initialState = {
  user: getCache('user') ? JSON.parse(getCache('user')) : {},
  token: null,
};

// eslint-disable-next-line default-param-last
const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};

export default auth;
