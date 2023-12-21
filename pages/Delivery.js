import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Header from '../components/Header';
import { $fontSize, gStyle, $danger } from '../styles/style';
import { fetchDelivery } from '../API/deliveryAPI';
import { useTranslation } from 'react-i18next';

const Delivery = ({navigation, route}) => {
  const [delivery, setDelivery] = useState([])
  const {t, i18n} = useTranslation();
  const lng = i18n.language

  useEffect(() => {
    fetchDelivery(lng).then(data => setDelivery(data))
  }, [lng])


  return (
    <View style={gStyle.container}>
      <Header navigation={navigation} route={route} />
      <View style={styles.delivery}>
        
        <View>
          <Text style={styles.title}>{t("Delivery")} {t("of goods")}</Text>
          <Text style={styles.description}>{'\t'}{t("Content_delivery")}</Text>
        </View>
        <FlatList data={delivery} renderItem={({item, index}) => (
          <View>
            <Text style={styles.description}>{index+1}.{'\t'} {item.name}</Text>
          </View>
        )} />
        <View>
          <Text style={styles.title}>{t("Payment")} {t("of goods")}</Text>
          <Text style={styles.description}>{'\t'}{t("Content_payment")}</Text>
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>{t("Demo")}</Text>
      </View>
  </View>
  );
};
export default Delivery;

const styles = StyleSheet.create({
  delivery: {
    position: 'relative',
    width: '100%',
    padding: 10,
  },
  message: {
    position: 'absolute',
    width: '100%',
    top: 200,
    alignItems: 'center',
    transform: [{rotate: '-30deg'}],
  },
  messageText: {
    fontFamily: 'mt-800',
    fontSize: 24,
    color: $danger,
    opacity: 0.5
  },
  title: {
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontFamily: 'mt',
    lineHeight: 24,
    fontSize: $fontSize,
    color: '#000000',
    textAlign: 'justify'
  }
})