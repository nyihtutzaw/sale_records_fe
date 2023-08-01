import * as ToDoService from '../../services/toDo';
import { SET_TODO } from '../types/toDo';

export const getToDos = (query) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });
  const response = await ToDoService.getAll(query);
  dispatch({
    type: SET_TODO,
    payload: response,
  });
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
};
