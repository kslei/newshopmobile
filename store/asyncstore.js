import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStore(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue !== null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.log(error)
  }
}

export const setStore = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    console.log(error)
  }
}