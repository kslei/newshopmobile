import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, FlatList } from 'react-native';
import { $back, $fontSize, $primary, $white, $sizeIcon } from '../styles/style';

const Limit = ({ title, items, callBackFunction }) => {
  const [visible, setVisible] = useState(false)

  const onPressItem = (item) => {
    setVisible(false);
    callBackFunction(item)
  }

  return (
    <View style={styles.limit}>
      <Pressable onPress={() => setVisible(!visible)} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, styles.titleButton]}>
        <Text style={styles.title}>{title? title : 'All'}</Text>
      </Pressable>
      {visible && <FlatList style={styles.list} data={items} horizontal={true} renderItem={({ item }) => (
        <Pressable key={item.id}
          onPress={() => {onPressItem(item)}}
          style={({ pressed }) => [{ backgroundColor: pressed ? $back : $white }, styles.item]}
        >
          <Text style={styles.itemText}>{item.name}</Text>
        </Pressable>
      )}
      />}
    </View>
  );
};
export default Limit;

const styles = StyleSheet.create({
  limit: {
    //width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingTop: 5,
    paddingRight: 5
  },
  title: {
    fontSize: $fontSize,
    color: $primary,
    fontFamily: 'mt',
    textAlign: 'center'
  },
  titleButton: {
    width: 40,
    height: 28,
    backgroundColor: $back,
    borderColor: $primary,
    borderWidth: 1,
    borderLeftWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  list: {
    position: 'absolute',
    left: 45,
    //alignItems: 'center',
    //width: '100%',
    //flexGrow: 1
  },
  item: {
    width: 40,
    //backgroundColor: $white,
    borderColor: $primary,
    paddingHorizontal: 1,
    paddingVertical: 2,
    color: $primary
  },
  itemText: {
    fontSize: $fontSize,
    fontFamily: 'mt',
    color: $primary,
    textAlign: 'center',
  }
})