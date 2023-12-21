import { $authHost, $host } from './index';

export const fetchTypes = async (lng) => {
  const { data } = await $host.get('api/type', {
    params: { lng }
  })
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const fetchDevices = async (typeId, brandId, page, limit, news, discount, lng) => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId, brandId, page, limit, news, discount, lng
    }
  })
  return data
}

export const fetchOneDevice = async (id, lng) => {
  const { data } = await $host.get('api/device/' + id, {
    params: {
      lng
    }
  })
  return data
}

export const createRating = async (rate, userId, deviceId) => {
  
    const { data } = await $authHost.post('api/rating', { rate, userId, deviceId })
    return data
  
}

export const fetchInfo = async (deviceId) => {
  const { data } = await $host.get('api/info', {
    params: {
      deviceId
    }
  })
  return data
}