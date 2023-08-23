import * as adminService from '../../services/adminService';

export const getAdmins = (query) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });
  const response = await adminService.getAll(query);
  dispatch({
    type: 'SET_ADMINS',
    payload: response,
  });
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
};
export const setAdmin = (id) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });
  const response = await adminService.getEach(id);
  dispatch({
    type: 'SET_ADMIN',
    payload: response,
  });
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
};

export const deleteAdmin = (id) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });
  await adminService.deleteAdmin(id);
  dispatch({
    type: 'DELETE_ADMIN',
    payload: id,
  });
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
};