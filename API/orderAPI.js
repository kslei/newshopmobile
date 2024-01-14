import { $authHost } from './index';

export const createOrder = async (deviceId, quantity, userId, date, deliveryId) => {
  const { data } = await $authHost.post('api/order', { deviceId, quantity, userId, date, deliveryId })
  return data
}

export const createMail = async (email, message) => {
  const { data } = await $authHost.post('api/mail', { email, message })
  return data
}

export const fetchOneOrder = async (id, status, lng) => {
  try {
    const { data } = await $authHost.get('api/order/' + id, {
      params: {
        status,
        lng
      }
    })
    return data
  } catch (error) {
    return error.response
  }
}
