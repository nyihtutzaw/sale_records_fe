import { SET_TODO } from '../types/toDo';

const initialState = {
  toDos: [],
  toDo: {},
};

// eslint-disable-next-line default-param-last
const toDo = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        toDos: action.payload,
      };

    default:
      return state;
  }
};

export default toDo;
