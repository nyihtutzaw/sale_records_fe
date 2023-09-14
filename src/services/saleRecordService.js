import { getData, sendData } from './apiService';

export async function getAll(query) {
  try {
    const response = await getData(`sale-record?${new URLSearchParams(query)}`);

    return response;
  } catch (e) {
    return false;
  }
}

export async function store(values) {
  try {
    
    const response = await sendData('sale-record/store', values);

    return response;
  } catch (e) {
    return false;
  }
}

export async function getEach(id) {
  try {
    const response = await getData(`sale-record/${id}`);
    return response.data;
  } catch (e) {
    
    return false;
  }
}

export async function update(values, id) {
  try {
    const response = await sendData(`sale-record/${id}`, values, 'PUT');
    return response;
  } catch (e) {
  
    return false;
  }
}

export async function deleteSaleRecord(id, values) {
  try {
    const response = await sendData(`sale-record/${  id}`, values, 'DELETE');
    return response;
  } catch (e) {

    return false;
  }
}

export async function updateSaleRecordItem(values, id) {
  try {
    const response = await sendData(`sale-record-detail/${id}`, values, 'PUT');
    return response;
  } catch (e) {
  
    return false;
  }
}
export async function deleteSaleRecordItem(id, values) {
  try {
    const response = await sendData(`sale-record-detail/${id}`, values, 'DELETE');
    return response;
  } catch (e) {
  
    return false;
  }
}