import { getData, sendData } from './apiService';

export async function getAll(query) {
  try {
    const response = await getData(`product?${new URLSearchParams(query)}`)
    return response;
  } catch (e) {
    return false;
  }
}

export async function getEach(id) {
  try {
    const response = await getData(`product/${id}`);
    return response.data;
  } catch (e) {
    
    return false;
  }
}

export async function store(values) {
  try {
    
    const response = await sendData('product/store', values);

    return response;
  } catch (e) {
    return false;
  }
}

export async function storeProductPurchase(values) {
  try {
    
    const response = await sendData('product-purchase/store', values);
    return response;
  } catch (e) {
    return false;
  }
}

export async function update(values, id) {
  try {
    const response = await sendData(`product/${id}`, values, 'PUT');
    return response;
  } catch (e) {
  
    return false;
  }
}

export async function deleteProduct(id, values) {
  try {
    const response = await sendData(`product/${  id}`, values, 'DELETE');
    return response;
  } catch (e) {

    return false;
  }
}