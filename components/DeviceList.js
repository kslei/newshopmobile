import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import DeviceItem from './DeviceItem';
import { $fontSize, $primary, gStyle } from '../styles/style';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


const DeviceList = ({navigation, search}) => {
  const {t} = useTranslation()
  const devices = useSelector(state=>state.device.devices)
  
  const searchDevices = devices.filter(
    device => device.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
  <View style={styles.list}>
    <FlatList
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', flex: 1 }}
      horizontal={false}
      data={searchDevices}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>{t('Nothing found')}!</Text>
      )}
      renderItem={({ item }) => (
      <DeviceItem device={item} navigation={navigation} />
    )} />
  </View>
  );
};
export default DeviceList;

const styles = StyleSheet.create({
  list:{
    flex: 1,
    width: '100%',
    paddingVertical: 5
  },
  empty: {
    fontSize: 22,
    fontFamily: 'mt-600',
    color: $primary,
    textAlign: 'center',
    paddingVertical: 20
  }
})