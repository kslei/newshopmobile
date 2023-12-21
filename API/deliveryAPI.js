import {$host} from './index';

export const fetchDelivery = async (lng) => {
  try {
    const { data } = await $host.get('api/delivery', {
      params: { lng }
    })
    return data
  } catch (error) {
    return error.response
  }
}