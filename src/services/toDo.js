import NotificationManager from 'react-notifications/lib/NotificationManager';

import { getData } from './apiService';

export async function getAll() {
  try {
    const response = await getData('todos');
    return response;
  } catch (e) {
    NotificationManager.error('Opps. Something wrong');
    return false;
  }
}
