import NotificationManager from 'react-notifications/lib/NotificationManager';

import { getData } from './apiService';

export async function getAll(query) {
  try {
    const response = await getData(`users?${new URLSearchParams(query)}`);
    return response;
  } catch (e) {
    NotificationManager.error('Opps. Something wrong');
    return false;
  }
}
