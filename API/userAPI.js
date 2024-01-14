import { $host, $authHost } from ".";
import {jwtDecode} from 'jwt-decode';
import "core-js/stable/atob";
import { save } from "./store";
import * as Keychain from 'react-native-keychain';


export const registration = async (email, password, role, name, phone) => {
  const { data } = await $host.post('api/user/registration', { email, password, role, name, phone })
  save('token', data.token)
  return jwtDecode(data.token)
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password })
  save('token', data.token)
  return jwtDecode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  save('token', data.token)
  return jwtDecode(data.token)
}