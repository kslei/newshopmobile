import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, Pressable, Image } from 'react-native';
import Header from '../components/Header';
import { $back, $danger, $fontSize, $primary, $sizeIcon, $white, gStyle } from '../styles/style';
import { getStore, setStore } from '../store/asyncstore';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import { useSelector } from 'react-redux';
import {fetchDelivery} from '../API/deliveryAPI';
import EnterInput from '../components/EnterInput';
import { createOrder, createMail } from '../API/orderAPI';
import { useTranslation } from 'react-i18next';
import Message from '../components/Message';
import BasketDevice from '../components/BasketDevice';

const Basket = ({navigation, route}) => {
  const [basketDevices, setBasketDevices] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [delivery, setDelivery] = useState({id: null, name: ''});
  const [message, setMessage] = useState('')
  const EMAIL = 'koolchitsky@gmail.com'
  const user = useSelector(state=>state.user);
  const {t} = useTranslation()
  console.log("USER", user)
  useEffect(()=>{
    getStore('basketDevices').then(data => {if(data) setBasketDevices(data)})
    fetchDelivery().then(data => setDeliveries(data))
  },[])

  //delete device
  function deleteDevice(id) {
    setStore('basketDevices', basketDevices.filter(d => d.id !== id)).then(() => 
    getStore('basketDevices').then(data => setBasketDevices(data)))
  }

  const setId = (item) => {
    if (item !== -1) {
      setDelivery({id: item.id, name: item.name})
    } else {
      setDelivery({id: '', name: ''})
    }
  }

  const Summ = (devices) => {
    let sum = 0;
    for (let i = 0; i < devices.length; i++) {
      sum = sum + Math.floor(devices[i].price * (100 - devices[i].discount) / 100) * devices[i].quantity;
    }
    return sum;
  }

  const buy = (userId, deliveryId) => {
    console.log('basketDevices', basketDevices)
    console.log('userId', userId)
    console.log('deliveryId', deliveryId)
    let date = Date()
    if (!Number.isInteger(userId)) { //non - autorized ? then "note"
      setMessage(`${t("Login")} ${t("or")} ${t("Sign_up")}`)
      return
    }
    if (deliveryId !== null) {
      createOrder(basketDevices.map(device => device.id), basketDevices.map(device => device.quantity), userId, date, deliveryId).then(data => {
        setStore('basketDevices', []);
        setMail(user.name, user.email, new Date());
        navigation.navigate('Home')
      }).catch(e => console.log(e))
    } else {
      setMessage(`${t("Select")} ${t("delivery method")}`)
    }
  }
  const setMail = (name, email, date) => {
    let text = "Клиент " + name + " (" + email + ") " + date + "  сделал заказ";
    createMail(EMAIL, text)
  }

  if(basketDevices.length === 0) {
    return (
      <View style={gStyle.container}>
        <Header navigation={navigation} route={route}/>
        <View>
          <Text style={styles.empty}>{t("No items in cart")}</Text>
        </View>
        <Pressable style={({ pressed }) => [gStyle.btn, { borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4, width: '50%' }]} onPress={() => navigation.navigate('Shop')}>
          <Text style={gStyle.btnText}>{t("shopping_other")}</Text>
        </Pressable>
      </View>
    )
  } else {
    return (
      <ScrollView style={styles.container}>
        <Header navigation={navigation} route={route}/>
        <View style={{width: '100%', paddingHorizontal: 10}}>
          {basketDevices.map(item => (
            <BasketDevice key={item.id} item={item} deleteDevice={deleteDevice}/>
          ))}
        </View>
        <View style={styles.reverse}>
          <View style={styles.btnRow}>
            <Pressable onPress={() => navigation.navigate('Shop')} style={({ pressed }) => [gStyle.btnDanger, { width: '45%', borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4 }]}>
              <Text style={gStyle.btnTextDanger}>{t("shopping_other")}</Text>
            </Pressable>
            <Pressable onPress={() => buy(user.id, delivery.id)} style={({ pressed }) => [gStyle.btn, { width: '45%', borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4 }]}>
              <Text style={gStyle.btnText}>{t('Buy')}</Text>
            </Pressable>
          </View>
          <View style={{ width: '100%' }}>
            <EnterInput value={delivery.name ? delivery.name : `${t("Select") + " " + t("delivery method")}`} items={deliveries} callBackFunction={setId} />
          </View>
          <View style={[styles.end, { borderTopWidth: 1, borderTopColor: $primary }]}>
            <Text style={[styles.price, { fontFamily: 'mt-600' }]}>{t('Total')}: {t('price', { val: Summ(basketDevices) })}</Text>
          </View>
        </View>
        {message.length !== 0 &&
          <Message message={message} setMessage={setMessage} />
        }
      </ScrollView>
    );
  }
};
export default Basket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  empty: {
    fontFamily: 'mt-600',
    color: $danger,
    fontSize: $sizeIcon,
    marginVertical: 10
  },
  message: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: 19
  },
  end: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingLeft: '40%',
    backgroundColor: $back
  },
  btnRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  reverse: {
    width: '100%',
    flexDirection: 'column-reverse',
    paddingHorizontal: 10
  }
})