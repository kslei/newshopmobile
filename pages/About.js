import React from 'react';
import { StyleSheet, ScrollView, View, Text, ImageBackground } from 'react-native';
import Header from '../components/Header';
import Contacts from './Contacts';
import Icon from '../components/Icon';
import Map from '../components/Map';
import { gStyle, $fontSize, $sizeIcon, $primary } from '../styles/style';
import { useTranslation } from 'react-i18next';

const About = ({navigation, route}) => {
  const {t, i18n} = useTranslation()
  
  return (
    <View style={gStyle.container}>
      <Header navigation={navigation} route={route} />
      <ScrollView style={styles.about}>
        <View >
          <Text style={styles.title}>{t("About_Store")}</Text>
          <Text style={styles.description}>{'\t'}{t("Content_about")}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="business-time" size={$sizeIcon} color={$primary} />
          <View>
            <Text style = {styles.schedule}>{t("Mo_sa")}: 9:00 - 18:00</Text>
            <Text style = {styles.schedule}>{t("Lunch_hour")}: 13:00 - 14:00</Text>
            <Text style = {styles.schedule}>{t("Day_off")}: {t("Su")}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Icon name="phone" size={$sizeIcon} color={$primary} />
          <Contacts/>
        </View>
        <View style={styles.row}>
          <ImageBackground source={require('../assets/images/adress1.png')} style={{width: 18, height: 18}}></ImageBackground>
          <View>
            <Text style = {styles.schedule}>{t("Mo_sa")}: 9:00 - 18:00</Text>
            <Text style = {styles.schedule}>{t("Lunch_hour")}: 13:00 - 14:00</Text>
            <Text style = {styles.schedule}>{t("Day_off")}: {t("Su")}</Text>
          </View>
        </View>
        <Map />
      </ScrollView>
  </View>
  );
};
export default About;

const styles = StyleSheet.create({
  about: {
    width: '100%',
    padding: 10,
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  schedule: {
    fontFamily: 'mt',
    fontSize: $fontSize,
    color: '#000000',
    textAlign: 'justify',
    marginLeft: 10
  }
})