import { getData, sendData } from './apiService';

export async function getAll(query) {
  try {
    const response = await getData(`payment-method?${new URLSearchParams(query)}`)
    return response;
  } catch (e) {
    return false;
  }
}

export async function getEach(id) {
  try {
    const response = await getData(`payment-method/${id}`);
    return response.data;
  } catch (e) {
    
    return false;
  }
}

export async function store(values) {
  try {
    
    const response = await sendData('payment-method/store', values);

    return response;
  } catch (e) {
    return false;
  }
}



export async function update(values, id) {
  try {
    const response = await sendData(`payment-method/${id}`, values, 'PUT');
    return response;
  } catch (e) {
  
    return false;
  }
}

export async function deletePaymentMethod(id, values) {
  try {
    const response = await sendData(`payment-method/${  id}`, values, 'DELETE');
    return response;
  } catch (e) {

    return false;
  }
}