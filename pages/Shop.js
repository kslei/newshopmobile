import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { $primary, $danger, gStyle, $active, $fontSize, $back } from '../styles/style';
import Icon from '../components/Icon';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypes, fetchBrands, fetchDevices } from '../API/deviceAPI';
import { setDevices, setTotalCount, setBrands, setTypes, setLimit, setSelectedType, setSelectedBrand, setPage } from '../store/deviceReducer';
import Accordeon from '../components/Accordeon';
import DeviceItem from '../components/DeviceItem';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import Limit from '../components/Limit';
import { useTranslation } from 'react-i18next';
import { setVis } from '../store/searchReducer';

const Shop = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const limitMenu = [
    {id: 0, name: 4, limit: 4},
    {id: 1, name: 10, limit: 10},
    {id: 2, name: 20, limit: 20},
    {id: 3, name: 50, limit: 50},
  ]
  const {t, i18n} = useTranslation()

  const dispatch = useDispatch()

  const onChange = (text) => {
    setSearch(text)
  }

  const clear = () => {
    onChange('')
    dispatch(setPage(1))
    dispatch(setLimit(10))
    dispatch(setVis(false))
  }
    
  const device = useSelector(state => state.device)
 
  useEffect(()=>{
    setIsLoading(true)
    fetchTypes(i18n.language).then(data => dispatch(setTypes(data))).catch(error=>setMessage(error.message)) 
    fetchBrands().then(data => dispatch(setBrands(data))).catch(error => setMessage(error.message)) 
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, "false", 0, i18n.language).then(data => {
      dispatch(setDevices(data.rows))
      dispatch(setTotalCount(data.count))
    }).catch(error => setMessage(error.message)).finally(()=>setIsLoading(false))
  }, [device.selectedType, device.selectedBrand, device.page, device.limit, i18n.language])

  useEffect(() => {
    if (search.length) {
      dispatch(setLimit(device.totalCount))
      dispatch(setPage(1))
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, "false", 0, i18n.language).then(data => {
        dispatch(setDevices(data.rows))
        dispatch(setTotalCount(data.count))
      })
    }
  }, [search])

  const onSelectedType = (type) => {
    dispatch(setSelectedType(type))
    dispatch(setPage(1))
    clear()
  }
  const onSelectedBrand = (brand) => {
    dispatch(setSelectedBrand(brand))
    dispatch(setPage(1))
    clear()
  }
  const onSelectLimit = (limit) => {
    dispatch(setLimit(limit.limit))
  }

  if(message) {
    return (
      <View style={gStyle.container}>
        <Header navigation={navigation} route={route} search={search} onChange={onChange} />
        <View style={[gStyle.container, styles.loading]}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    )
  }
  if (isLoading) {
    return (
      <View style={gStyle.container}>
        <Header navigation={navigation} route={route} />
        <View style={[gStyle.container, styles.loading]}>
          <ActivityIndicator size='large' color={$active} />
        </View>
      </View>
    )
  }
  return (
    <View style={gStyle.container}>
      <Header navigation={navigation} route={route} search={search} onChange={onChange} clear={clear}/>
      <View style={styles.menu}>
        <Accordeon title={t('Categories')} items={device.types} callBackFunction={onSelectedType}/>
        <Accordeon title={t('Brands')} items={device.brands} callBackFunction={onSelectedBrand} />
      </View>
      <DeviceList navigation={navigation} search={search} />
      
      <View style={styles.pagination}>
        <Pages />
        <Limit title={device.limit} items={limitMenu} callBackFunction={onSelectLimit} />
        <View style={styles.blokLimit}>
          <Text style={styles.textLimit}>{t('Show')}</Text>
        </View>  
      </View>
    </View>
  );
};
export default Shop;

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 20,
    color: $danger
  },
  menu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blokLimit: { 
    height: 28, 
    justifyContent: 'center',
    backgroundColor: $back
  },
  textLimit: {
    fontSize: $fontSize,
    color: $primary,
    fontFamily: 'mt',
    textAlign: 'center',
    marginLeft: 5,
    backgroundColor: $back
  },
  pagination: {
    marginVertical: 10,
    flexDirection: 'row-reverse', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    width: '100%'
  }
})