import * as userService from '../../services/userService';
import { SET_USERS } from '../types/user';

export const getUsers = (query) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });
  const response = await userService.getAll(query);
  dispatch({
    type: SET_USERS,
    payload: response,
  });
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
};
