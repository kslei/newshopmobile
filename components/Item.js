import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { $primary, $white } from '../styles/style';
import {REACT_APP_API_URL} from 'react-native-dotenv';

const Item = ({item, setItem, width}) => {
  
  return (
    <Pressable style={[styles.item, { width: (width - 20) / 3 - 10}]} onPress={() => setItem(item)}>
      <Image style={styles.img} resizeMode='contain' source={{ uri: REACT_APP_API_URL + item.img }} />
      <Text style={styles.itemText}>{item.name}</Text>
    </Pressable>
  );
};
export default Item;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    aspectRatio: 3/2
  },
  item: {
    marginVertical: 3,
    backgroundColor: $white,
    borderBottomColor: $primary,
    borderBottomWidth: 1
  },
  itemText: {
    fontFamily: 'mt',
    fontSize: 12,
    color: $primary,
    textAlign: 'center'
  },
})