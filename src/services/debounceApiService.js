
import { getData } from "./apiService";

 function debounce(callbackFunction, delay = 250) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    return new Promise((resolve, reject) => {
      timeout = setTimeout(async () => {
        try {
          const result = await callbackFunction(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

export const debounceApiCall = debounce(async (url, query) => {
    const response = await getData(`${url}?${new URLSearchParams(query)}`)
    return response;
}, 1000);

