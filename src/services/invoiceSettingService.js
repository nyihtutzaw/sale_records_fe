import { sendData, getData } from './apiService'


export async function get() {
  try {
    const response = await getData('invoice-setting/1')
    return response.data
  } catch (e) {
    return false
  }
}

export async function update(data) {
  try {
    const response = await sendData(`invoice-setting/1`, data, 'PUT')
    return response
  } catch (e) {
    return false
  }
}

