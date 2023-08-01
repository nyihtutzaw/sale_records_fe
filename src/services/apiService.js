import axios from 'axios';
// import { getCache, removeCache } from 'utli/cache';
import { NotificationManager } from 'react-notifications';

export const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}`;

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function getData(url, params) {
  // const token = getCache('access_token')
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }
  axios.defaults.headers = headers;

  const response = await axios
    .get(`${apiEndpoint}${url}`, { params })
    .catch((e) => {
      if (e.response.status === 401) {
        NotificationManager.info('You need to login again');
        // removeCache('access_token')
        window.location = '/';
      }
    });

  return response.data;
}

export async function sendData(url, data, type = 'POST', showNoti = true) {
  // const token = getCache('access_token')
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }
  axios.defaults.headers = headers;
  let response;

  if (type === 'POST') response = await axios.post(`${apiEndpoint}${url}`, data);
  else if (type === 'DELETE') {
    response = await axios.delete(`${apiEndpoint}${url}`, { data });
  } else if (type === 'PUT') response = await axios.put(`${apiEndpoint}${url}`, data);
  else if (type === 'PATCH') response = await axios.patch(`${apiEndpoint}${url}`, data);

  if ((response.status === 200 || response.status === 201) && showNoti) {
    NotificationManager.success('success');
  }

  return response.data;
}

export async function sendForBlobData(url, data, options) {
  // const token = getCache('access_token')
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }
  axios.defaults.headers = headers;
  const response = await axios.post(`${apiEndpoint}${url}`, data, options);
  return response.data;
}

export async function getForBlobData(url, options) {
  // const token = getCache('access_token')
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }
  axios.defaults.headers = headers;
  const response = await axios.get(`${apiEndpoint}${url}`, options);
  return response.data;
}
