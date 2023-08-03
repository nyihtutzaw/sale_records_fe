import { getData, sendData } from './apiService';

export async function getAll(query) {
  try {
    const response = await getData(`customer?${new URLSearchParams(query)}`);

    return response;
  } catch (e) {
    return false;
  }
}

export async function store(values) {
  try {
    
    const response = await sendData('customer/store', values);

    return response;
  } catch (e) {
    return false;
  }
}

export async function getEach(id) {
  try {
    const response = await getData(`customer/${id}`);
    return response.data;
  } catch (e) {
    
    return false;
  }
}

export async function update(values, id) {
  try {
    const response = await sendData(`customer/${id}`, values, 'PUT');
    return response;
  } catch (e) {
  
    return false;
  }
}

export async function deleteCustomer(id, values) {
  try {
    const response = await sendData(`customer/${  id}`, values, 'DELETE');
    return response;
  } catch (e) {

    return false;
  }
}