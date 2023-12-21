import React from 'react';
import { Pressable, StyleSheet, View, Text, FlatList } from 'react-native';
import Icon from './Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../store/deviceReducer';
import { $back, $fontSize, $primary, $white } from '../styles/style';

const Pages = () => {
  const pages = []
  const dispatch = useDispatch()
  const device = useSelector(state=>state.device)
  const pageCount = Math.ceil(device.totalCount / device.limit)
  
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }
  
const onPage = (page) => {
  dispatch(setPage(page))
}

  return (
  <View style={styles.pages}>
    <Pressable style={() => [{ backgroundColor: $back }, styles.button]} onPress={() => onPage(device.page - 1)} disabled={device.page > 1 ? false : true}>
      <Icon name='double-left' size={16} color={$primary} />
    </Pressable>
    <View style={{width: 115, overflow: 'hidden'}}>
      <FlatList data={pages} horizontal={true} initialScrollIndex={device.page === 1 ? device.page-1 : device.page-2} renderItem={({item}) => (
      <Pressable style={() => [{backgroundColor: item === device.page ? $primary : $back}, styles.button]} onPress={() => onPage(item)}>
        <Text style={[{ color: item === device.page ? $white : $primary }, styles.text]}>{item}</Text>
      </Pressable>
    )}/>
    </View>
      <Pressable style={() => [{ backgroundColor: $back }, styles.button, { transform: [{ rotateY: '180deg' }] }]} onPress={() => onPage(device.page + 1)} disabled={device.page === pages.length ? true : false}>
        <Icon name='double-left' size={16} color={$primary} />
    </Pressable>
  </View>
  );
};
export default Pages;

const styles = StyleSheet.create({
  pages: {
    flexDirection: 'row',
  },
  button: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: $primary,
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: $fontSize,
    fontFamily: 'mt'
  }
})