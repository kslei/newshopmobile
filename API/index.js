import axios from "axios";
import {REACT_APP_API_URL} from 'react-native-dotenv';
import * as SecureStore from 'expo-secure-store';

const $host = axios.create({
  baseURL: REACT_APP_API_URL
})

const $authHost = axios.create({ 
  baseURL: REACT_APP_API_URL
})

$authHost.interceptors.request.use(async req => {
  const access_token = await SecureStore.getItemAsync('token')
  req.headers.authorization = `Bearer ${access_token}`;
  return req;
});

export {
  $host,
  $authHost
}