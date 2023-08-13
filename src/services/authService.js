import { sendData } from './apiService'
import { storeCache, removeCache } from '../utils/cache'

export async function login(values) {
    try {
        const response = await sendData('admin/login', values)
        storeCache('user', JSON.stringify(response.data.admin))
        storeCache('access_token', response.data.token)
        return response
    } catch (e) {
        // NotificationManager.error('Login Failed')
        return false
    }
}

export function logout() {
    removeCache('user')
    removeCache('access_token')
}
