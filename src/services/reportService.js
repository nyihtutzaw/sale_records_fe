import { getData } from './apiService';

export async function getProfitReport(query) {
  try {
    const response = await getData(`report/profit?${new URLSearchParams(query)}`)
    return response;
  } catch (e) {
    return false;
  }
}