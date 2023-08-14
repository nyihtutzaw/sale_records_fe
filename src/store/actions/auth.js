import * as authService from '../../services/authService';
import { removeCache, storeCache } from '../../utils/cache';

export const logout = () => async (dispatch) => {
  await authService.logout();
  removeCache('user');
  removeCache('access_token');
  dispatch({
    type: 'SET_USER',
    payload: {},
  });
};

export const login = (data) => async (dispatch) => {
  dispatch({ type: 'SET_LOADING' });

  try {
    const response = await authService.login(data);
    // eslint-disable-next-line camelcase
    const { admin, token } = response.data;
    const { name, email, role } = admin;

    dispatch({
      type: 'SET_USER',
      payload: { name, email, role },
    });
    storeCache('access_token', token);
    storeCache('user', JSON.stringify(response.data.admin))
    dispatch({
      type: 'SUCCESS_NOTI',
      payload: 'Success',
    });
    window.location = '/';
  } catch (error) {
      removeCache('user');
      removeCache('access_token');
      dispatch({
        type: 'FAIL_NOTI',
        payload: 'Failed',
      });
    }
  dispatch({ type: 'SET_LOADING' });
};
