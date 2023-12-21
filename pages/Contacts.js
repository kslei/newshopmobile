import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Linking } from 'react-native';
import { $fontSize } from '../styles/style';

const Contacts = ({navigation}) => {
  const url1 = 'tel:+380680000000';
  const url2 = 'tel:+380990000000';

  const isCall = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }
  
  return (
    <View style={styles.container}>
      <Pressable onPress={() => isCall(url1)}>
        <Text style={styles.number}>{url1.split(':')[1]}</Text>
      </Pressable>
      <Pressable onPress={() => isCall(url2)}>
        <Text style={styles.number}>{url2.split(':')[1]}</Text>
      </Pressable>
    </View>
  );
};
export default Contacts;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  number: {
    marginVertical: 5,
    fontFamily: 'mt',
    fontSize: $fontSize,
    textDecorationLine: 'underline',
  }
})