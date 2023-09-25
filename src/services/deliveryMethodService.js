import { getData, sendData } from './apiService';

export async function getAll(query) {
  try {
    const response = await getData(`delivery-method?${new URLSearchParams(query)}`)
    return response;
  } catch (e) {
    return false;
  }
}

export async function getEach(id) {
  try {
    const response = await getData(`delivery-method/${id}`);
    return response.data;
  } catch (e) {
    
    return false;
  }
}

export async function store(values) {
  try {
    
    const response = await sendData('delivery-method/store', values);

    return response;
  } catch (e) {
    return false;
  }
}



export async function update(values, id) {
  try {
    const response = await sendData(`delivery-method/${id}`, values, 'PUT');
    return response;
  } catch (e) {
  
    return false;
  }
}

export async function deleteDeliveryMethod(id, values) {
  try {
    const response = await sendData(`delivery-method/${  id}`, values, 'DELETE');
    return response;
  } catch (e) {

    return false;
  }
}