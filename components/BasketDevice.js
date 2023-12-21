import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import { $white, $back } from '../styles/style';

const BasketDevice = ({item, deleteDevice}) => {
  const {t} = useTranslation()
  return (
    <View>
      <View style={styles.row}>
        <Image style={{ width: 50, height: 50 }} resizeMode='contain' source={{ uri: REACT_APP_API_URL + item.img }} />
        <View style={{ width: 180 }}>
          <Text style={[styles.name, { fontWeight: 600 }]}>{item.brand.name}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View><Text>{item.quantity}</Text></View>
        <Pressable onPress={() => deleteDevice(item.id)}>
          <Image style={{ width: 20, height: 20 }} source={require('../assets/images/delete.png')} />
        </Pressable>
      </View>
      <View style={styles.end}>
        <Text style={styles.price}>{t('Cost')}: {t('price', { val: item.quantity * Math.floor(item.price * (1 - (item.discount / 100))) })}</Text>
      </View>
    </View>
  );
};
export default BasketDevice;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    marginTop: 10,
    backgroundColor: $white
  },
  name: {
    fontFamily: 'mt-300',
    fontSize: 13,
  },
  price: {
    fontFamily: 'mt',
    fontSize: 14,
  },
  end: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: '40%',
    backgroundColor: $back
  },
})