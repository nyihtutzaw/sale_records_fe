import { getData, sendData } from './apiService';

export async function getAll(query) {
  try {
    const response = await getData(`admin?${new URLSearchParams(query)}`);

    return response;
  } catch (e) {
    return false;
  }
}

export async function store(values) {
  try {
    const response = await sendData('admin/store', values);

    return response;
  } catch (e) {
    return false;
  }
}

export async function getEach(id) {
  try {
    const response = await getData(`admin/${id}`);
    return response.data;
  } catch (e) {
    
    return false;
  }
}

export async function update(values, id) {
  try {
    const response = await sendData(`admin/${id}`, values, 'PUT');
    return response;
  } catch (e) {
  
    return false;
  }
}

export async function deleteAdmin(id, values) {
  try {
    const response = await sendData(`admin/${id}`, values, 'DELETE');
    return response;
  } catch (e) {

    return false;
  }
}