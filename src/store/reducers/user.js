import { SET_USERS } from '../types/user';

const initialState = {
  users: [],
  user: {},
};

// eslint-disable-next-line default-param-last
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default user;
