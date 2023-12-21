import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Pressable, ImageBackground, TextInput, FlatList, VirtualizedList } from 'react-native';
import Header from '../components/Header';
import DeviceImage from '../components/DeviceImage';
import Rating from '../components/Rating';
import Icon from '../components/Icon';
import { $active, $back, $fontSize, $primary, $white, gStyle } from '../styles/style';
import { fetchOneDevice, createRating } from '../API/deviceAPI';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStore, setStore } from '../store/asyncstore';
import { useTranslation } from 'react-i18next';
import Message from '../components/Message';

const Device = ({navigation, route}) => {
  const [device, setDevice] = useState({ name: '', brand: [], info: [], device_frames: [], device_images: [] })
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('');
  const [rate, setRate] = useState(0)
  const [basketDevices, setBasketDevices] = useState([])
  const {t, i18n} = useTranslation()
  let lng = i18n.language
  
  useEffect(()=>{
    getStore('basketDevices').then(data => {
      if(data !==null) setBasketDevices(data)
    })
  }, [])
    
  //set device.id
  const id = route.params
  //set user
  const user = useSelector(state=>state.user)
  console.log("user", user)
  
  useEffect(() => {
    fetchOneDevice(id, lng).then(data => setDevice(data))
  }, [lng])

  //console.log(device)
  const onNumber = (text) => {
    if(text <= device.number && text > 0) {
      setNumber(Number(text))
    }
  }

  const setOrder = (deviceId, userId) => {
    /* console.log("YES")
    if (!Number.isInteger(userId)) {
      setMessage(`${t('Not_autorized')}`)
    } */
    if (!basketDevices) { basketDevices = [] }
    let orderDevice = {
      id: device.id,
      discount: device.discount,
      name: device.name,
      brandId: device.brand.id,
      brand: { name: device.brand.name },
      price: device.price,
      quantity: number? number : 1,
      img: device.img
    }
    if(basketDevices.findIndex(item => item.id === device.id) === -1) {
      basketDevices.push(orderDevice)
      setStore('basketDevices', basketDevices).then(data => navigation.navigate('Basket'))
    } else {
      setMessage(`${t('This product in cart')}`)
    }
  }

  /* async function getStore() {
    try {
      const jsonValue = await AsyncStorage.getItem('basketDevices')
      return jsonValue !==null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.log(error)
    }
  }

  const setStore = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('basketDevices', jsonValue)
    } catch (error) {
      console.log(error)
    }
  } */

  const setRating = (rate, userId, deviceId) => {
    if (!user.isAuth) {
      setMessage(`${t('Not_autorized')}`)
    }
    createRating(rate, userId, deviceId).catch(error=>setMessage(error.response.data.message))   
  }

  return (
    <View style={gStyle.container}>
      <ScrollView style={{width: '100%', flex: 1}}>
        <Header navigation={navigation} route={route} />
        <View style={[styles.device, gStyle.container]}>
          <Text style={styles.brand} >{device.brand.name}</Text>
          <Text style={styles.name} >{device.name}</Text>
          <View style={styles.image}>
            <DeviceImage img={device.img} images={device.device_images} frames={device.device_frames}/>
            <View style={styles.abs}>
              {device.news && <ImageBackground source={require("../assets/images/new1.png")} style={{ width: '100%', aspectRatio: 1/1 }} resizeMode='contain' ></ImageBackground>}
              {device.discount !== 0 && 
                <ImageBackground source={require("../assets/images/discount.png")} style={{ width: 35, aspectRatio: 1/1, margin: '15%' }} resizeMode='contain'>
                  <Text style={styles.ratingText}>-{device.discount}%</Text>  
                </ImageBackground>}
            </View>
            <View style={styles.rating}>
              <ImageBackground style={{width: '100%', aspectRatio: 1/1}} resizeMode='contain' source={require("../assets/images/Star.png")}>
                <Text style={styles.ratingText}>{device.rating}</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.row}>
            {device.discount
              ?<View style={{width: '45%'}}>
                <Text style={styles.oldprice}>{t("price", { val: device.price })}</Text>
                <Text style={styles.price}>{t("price", { val: Math.floor(device.price*(1-(device.discount/100))) })}</Text>
              </View>
              :<View style={{width: '45%'}}>
                <Text style={styles.price}>{t("price", { val: device.price })}</Text>
              </View>
            }
            <TextInput 
              value={number} 
              onChangeText={text => onNumber(text)} 
              keyboardType='number-pad'
              maxLength={2}
              readOnly={device.number<1? true : false}
              style={styles.input}
              selectTextOnFocus={true}
              placeholder='1'
            />
            <Pressable style={({pressed}) => [styles.btn, {borderWidth: pressed? 2 : 1, padding: pressed? 3 : 4}]}>
              <Text style={styles.btnText} onPress={() => setOrder(id, user.id)}>{t('To_basket')}</Text>
            </Pressable>
          </View>
          <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rateText}>{t('Rate')}</Text>
              <Text style={[styles.rateText, { textTransform: 'lowercase' }]}> {t("The")} {t("Product_one")}</Text>
            </View>
            <View style={styles.row}>
              <Rating rating={rate} setRating={setRate}/>
              <Pressable onPress={() => setRating(rate, user.id, id)} style={({ pressed }) => [styles.btn, { borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4 }]}>
                <Text style={styles.btnText}>{t("Rate")}</Text>
              </Pressable>
            </View>
          </View>
          {message.length !==0 &&
            <Message message={message} setMessage={setMessage}/>
          }
          <View style={styles.specifications}>
            <Text style={styles.specificationsTitle}>{t('Specifications')}</Text>
            {device.info.map(item => (
              <View key={item.id} style={styles.inforow}>
                <Text style={styles.infoText}>{item.title}</Text>
                <Text style={styles.infoText}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Device;

const styles = StyleSheet.create({
  device: {
    width: '100%',
    padding: 10,
    alignItems: 'center'
  },
  brand: {
    fontSize: 18,
    fontFamily: 'mt-800',
    color: $primary
  },
  name: {
    marginVertical: 5,
    fontSize: $fontSize,
    fontFamily: 'mt-600',
    textAlign: 'center'
  },
  image: {
    position: 'relative',
    width: '100%'
  },
  abs: {
    position: 'absolute',
    width: '20%',
    top: '-1.5%',
    left: '-2.5%',
    zIndex: 10
  },
  rating: {
    position: 'absolute',
    width: 30,
    top: 10,
    right: 10,
    zIndex: 10
  },
  ratingText: {
    color: $white,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: 'bold'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  },
  price: {
    fontSize: 18,
    fontFamily: 'mt',
    color: $primary
  },
  oldprice: {
    fontSize: 14,
    fontFamily: 'mt',
    textDecorationLine: 'line-through'
  },
  input: {
    width: '10%',
    paddingVertical: 3,
    borderColor: $primary,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: $fontSize,
    fontFamily: 'mt-600',
    color: $active,
    borderRadius: 5
  },
  btn: {
    width: '40%',
    padding: 4,
    borderColor: $primary,
    borderRadius: 5,
    borderWidth: 1
  },
  btnText: {
    fontSize: $fontSize,
    color: $primary,
    fontFamily: 'mt',
    textAlign: 'center'
  },
  rateText: {
    marginTop: 10,
    fontFamily: 'mt',
    color: $primary,
    fontSize: $fontSize
  },
  specifications: {
    width: '100%',
    borderTopColor: $primary,
    borderTopWidth: 1,
    paddingVertical: 10
  },
  specificationsTitle: {
    fontFamily: 'mt',
    fontSize: $fontSize,
    textAlign: 'center',
    color: 'black'
  },
  inforow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  infoText: {
    width: '50%',
    fontFamily: 'mt',
    fontSize: 14,
    color: 'gray'
  }
})