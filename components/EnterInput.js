import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, FlatList } from 'react-native';
import Icon from './Icon';
import { $back, $fontSize, $primary, $white, $sizeIcon } from '../styles/style';

const EnterInput = ({ value, items, callBackFunction }) => {
  const [visible, setVisible] = useState(false)

  const onPressItem = (item) => {
    setVisible(false);
    callBackFunction(item)
  }

  const renderItem = ({ item }) => (
    <Pressable key={item.id} onPress={() => onPressItem(item)} style={({ pressed }) => [{ backgroundColor: pressed ? $back : $white }, styles.item]}>
      <Text style={styles.itemText}>{item.name}</Text>
    </Pressable>
  )

  return (
    <View style={styles.enterInput}>
      <Pressable onPress={() => setVisible(!visible)} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, {borderBottomColor: visible? $white: $primary}, styles.titleButton]}>
        <Text style={styles.title}>{value}</Text>
        <Icon name='double-down' size={$fontSize} color={$primary} />
      </Pressable>
      {visible && 
        <FlatList style={styles.list} data={items} renderItem={renderItem} />
      }
    </View>
  );
};
export default EnterInput;

const styles = StyleSheet.create({
  enterInput: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 5,
    marginVertical: 10
  },
  title: {
    fontSize: $fontSize,
    color: $primary,
    fontFamily: 'mt',
    //textAlign: 'center',
  },
  titleButton: {
    width: '100%',
    backgroundColor: $white,
    borderColor: $primary,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 5,
  },
  list: {
    position: 'absolute',
    top: 32,
    width: '100%',
    flexGrow: 1
  },
  item: {
    width: '100%',
    //backgroundColor: $white,
    borderColor: $primary,
    paddingHorizontal: 4,
    paddingVertical: 3,
    color: $primary
  },
  itemText: {
    fontSize: $fontSize,
    fontFamily: 'mt',
    color: $primary,
    
    //textAlign: 'center',
  }
})