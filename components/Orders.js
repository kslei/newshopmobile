import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, View, Text, FlatList, Pressable } from 'react-native';
import { fetchOneOrder } from '../API/orderAPI';
import { $active, $back, $fontSize, $primary, gStyle } from '../styles/style';

const Orders = ({user}) => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('In_processing')
  const [message, setMessage] = useState('')
  const {t, i18n} = useTranslation()
  let lng = i18n.language
  const statusMenu = [
    { id: 1, name: `${t("In_processing")}`, value: "In_processing" },
    { id: 2, name: `${t("Executed")}`, value: "Executed" },
    { id: 3, name: `${t("Rejected")}`, value: "Rejected" },
  ]

  useEffect(() => {
    if (user.isAuth && user.id) {
      console.log(user.id, status, lng)
      fetchOneOrder(user.id, status, lng).then(data => {
        if (Array.isArray(data)) {
          setOrders(data)
          setMessage('')
        } else {
          setOrders([]);
          setMessage(data.data.message);
        }
      })
    }
  }, [user.id, status, lng])

  const summ = (devices) => {
    let sum = 0
    for(let i=0; i<devices.length; i++) {
      sum = sum + devices[i].quantity*Math.floor(devices[i].device.price*(1 - (devices[i].device.discount/100)))
    }
    return sum
  }

  
  return (
  <ScrollView View style={styles.orders}>
    <View style={styles.menu}>
      {statusMenu.map(item => (
      <Pressable key={item.id} style={[styles.menuItem, {backgroundColor: item.value === status ? $back : 'transparent'}]} onPress={() => setStatus(item.value)}>
        <Text style={[styles.menuItemText, {color: item.value === status ? $active : $primary}]}>{item.name}</Text>
      </Pressable>
    ))}
    </View>
    {message.length !==0 &&
      <View style={styles.message}><Text style={styles.textMessage}>{message}</Text></View>
    }
    <View>
      {orders.map(item => (
        <View key={item.id}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderHeaderText}>№{item.id}</Text>
            <Text style={styles.orderHeaderText}>{item.date.split('T')[0]}</Text>
            <Text style={styles.orderHeaderText}>{t('Delivery')}: {item.delivery.name}</Text>
          </View>
          {item.order_devices.map(orderDevice => (
            <View key={orderDevice.id} style={styles.orderItem}>
              <View style={{width: '30%'}}>
                <Text style={styles.orderItemText}>{orderDevice.device.brand.name}</Text>
              </View>
              <View style={{width: '40%'}}>
                <Text style={styles.orderItemText}>{orderDevice.device.name}</Text>
              </View>
              <View style={{ width: '30%' }}>
                <Text style={styles.orderItemText}>{t("price", { val: orderDevice.quantity * Math.floor(orderDevice.device.price * (1 - (orderDevice.device.discount /100)))})}</Text>
              </View>
            </View>
          ))}
          <View style={styles.orderFutor}>
            <View style={{width: '30%'}}>
              <Text style={styles.orderFutorText}>{t("price", {val: summ(item.order_devices)})}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
  );
};
export default Orders;

const styles = StyleSheet.create({
  orders: {
    width: '100%',
    paddingHorizontal: 10
  },
  menu :{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  menuItem: {
    width: '33.333333%',
    alignItems: 'center',
    padding: 3,
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: $primary
  },
  menuItemText: {
    fontFamily: 'mt',
    fontSize: 12,
    //color: $primary
  },
  orderHeader: {
    flexDirection: 'row',
    columnGap: 10,
    padding: 4,
    backgroundColor: $back,
    borderColor: $primary,
    borderWidth: 1
  },
  orderHeaderText: {
    fontFamily: 'mt',
    fontSize: 12,
    color: $primary
  },
  orderItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderColor: $primary,
    borderWidth: 1
  },
  orderItemText: {
    fontFamily: 'mt',
    fontSize: 12,
    marginHorizontal: 1
  },
  orderFutor: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 4,
    backgroundColor: $back,
    borderColor: $primary,
    borderWidth: 1,
    paddingHorizontal: 4,
    marginBottom: 5
  },
  orderFutorText: {
    fontFamily: 'mt',
    fontSize: 12,
  },
  message: {
    width: '100%',
    alignItems: 'center',
    padding: 10
  },
  textMessage: {
    fontFamily: 'mt',
    fontSize: 14,
  }
})