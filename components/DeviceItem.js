import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, ImageBackground, Dimensions } from 'react-native';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import { $active, $danger, $primary, $white } from '../styles/style';
import { useTranslation } from 'react-i18next';

const $margin = 5
const $fontSize = 13

const DeviceItem = ({navigation, device}) => {
  const {width} = Dimensions.get('window')
  const column = 2
  const $size = (width-($margin*column*2))/column
  const {t} = useTranslation()
  
  const goDevice = (id) => {
    navigation.navigate('Device', id)
  }

  return (
  <Pressable onPress={() => goDevice(device.id)}>
    <View style={[styles.card, {width: $size}]}>
      <ImageBackground style={styles.image} resizeMode='contain' source={{uri: REACT_APP_API_URL + device.img}} />
      <Text style={styles.brand}>{device.brand.name}</Text>
      <Text style={styles.name}>{device.name}</Text>
      {device.discount 
      ? <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.old}>{t('price', {val: device.price})}</Text>
          <Text style={styles.discount}>{t('price', {val: Math.floor(device.price*(1 - device.discount/100))})}</Text>
        </View>
      : <Text style={styles.price}>{t('price', {val: device.price})}</Text>}
    </View>
  </Pressable>
  );
};
export default DeviceItem;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    margin: $margin,
    backgroundColor: $white,
    color: $primary,
  },
  image: {
    width: '100%',
    aspectRatio: 1/1,
  },
  brand: {
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    color: $active
  },
  name: {
    fontFamily: 'mt-300',
    fontSize: $fontSize,
    color: $active,
    minHeight: 65
  },
  price: {
    textAlign: 'right',
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    marginTop: 16
  },
  discount:{
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    color: $danger
  },
  old: {
    fontFamily: 'mt',
    fontSize: $fontSize,
    textDecorationLine: 'line-through',
    //marginRight: 10
  }
})