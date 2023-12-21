import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, FlatList, Pressable, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { fetchTypes, fetchBrands, fetchDevices } from '../API/deviceAPI';
import { setDevices, setTotalCount, setBrands, setTypes, setLimit, setSelectedType, setSelectedBrand, setPage, setNews, setDiscount } from '../store/deviceReducer';
import { setVis } from '../store/searchReducer';
import { setNewDevices } from '../store/newReduser';
import { setDiscountDevices } from '../store/discountReducer';
import { gStyle, $primary, $back, $danger, $active, $fontSize, $white, $orange } from '../styles/style';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import { REACT_APP_API_URL } from 'react-native-dotenv';
import Item from '../components/Item';
import News from '../components/News';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

const Home = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const dispatch = useDispatch()
  const {t, i18n} = useTranslation()
  const device = useSelector(state => state.device)
  const newdevice = useSelector(state => state.newDevice)
  const discountdevice = useSelector(state => state.discountDevice)
  const width = Dimensions.get('window').width
  
  let discountMax;
  if (discountdevice.discountDevices.length !== 0) { discountMax = discountdevice.discountDevices.slice().sort((a, b) => b.discount - a.discount)[0].discount }

  useEffect(() => {
    setIsLoading(true)
    fetchTypes(i18n.language).then(data => dispatch(setTypes(data))).catch(error => setMessage(error.message))
    fetchBrands().then(data => dispatch(setBrands(data))).catch(error => setMessage(error.message))
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, "false", 0, i18n.language).then(data => {
      dispatch(setDevices(data.rows))
      dispatch(setTotalCount(data.count))
    }).catch(error => setMessage(error.message))
    
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, "true", 0, i18n.language).then(data => {
      dispatch(setNewDevices(data))}).catch(error => setMessage(error.message))
    
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, device.news, 20, i18n.language).then(data => {
      dispatch(setDiscountDevices(data))
    }).catch(error => setMessage(error.message)).finally(() => setIsLoading(false));
    
  }, [device.selectedType, device.selectedBrand, device.page, device.limit, i18n.language])
  //Animation
  const offset = useSharedValue(-width)
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value - width}]
  }), [offset])
  useEffect(() => {
    offset.value = withTiming(-offset.value, {
      duration: 2000,
      easing: Easing.inOut(Easing.quad),
    })
  }, [])

  const clear = () => {
    //onChange('')
    dispatch(setPage(1))
    dispatch(setLimit(10))
    dispatch(setVis(false))
  }
  
  const setType = (type) => {
    dispatch(setSelectedType(type))
    dispatch(setSelectedBrand(-1))
    navigation.navigate('Shop')
  }
  const setBrand = (brand) => {
    dispatch(setSelectedType(-1))
    dispatch(setSelectedBrand(brand))
    navigation.navigate('Shop')
  }
  const setDevice = (id) => {
    navigation.navigate('Device', id)
  }

  const renderItem1 = ({item}) => (
    <View style={[styles.item1, {width: (width-20)/3}]}>
      <Image style={styles.img} resizeMode = 'contain' source={{ uri: REACT_APP_API_URL + item.img }} />
    </View>
  )
  
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
  <ScrollView style={styles.container}>
    <Header navigation={navigation} route={route} clear={clear}/>
    {newdevice.newDevices.length !==0 &&
      <Animated.View style={animatedStyles}/* style={animatedStyles} */>
        <LinearGradient colors={[$back, 'transparent']} style={styles.news}>
          <Text style={styles.newstitle}>{t("New")}</Text>
        </LinearGradient>
      </Animated.View>
    }
    {newdevice.newDevices.length !== 0 &&
      <View style={styles.newsList}>
        <News devices={newdevice.newDevices} setItem={setDevice} play={true}/>
        <Image source={require("../assets/images/new1.png")} style={styles.newstick} resizeMode='contain' />
      </View>
    }
    {discountdevice.discountDevices.length !== 0 && 
      <Animated.View style={animatedStyles}/* style={animatedStyles} */>
        <LinearGradient colors={[$back, 'transparent']} style={styles.news}>
          <Text style={styles.discounttitle}>{t("Discounts")} {t("up_to")} {discountMax}%</Text>
        </LinearGradient>
      </Animated.View>
    }
    {discountdevice.discountDevices.length !==0 &&
      <View style={styles.newsList}>
        <News devices={discountdevice.discountDevices} setItem={setDevice} play={false}/>
      </View>
    }

    <LinearGradient colors={[$back, 'transparent']} style={styles.news}>
      <Text style={styles.title}>{t("Categories")}</Text>
    </LinearGradient>
    <View style={styles.list}>
      {device.types.map(item => (
        <Item key={item.id} item={item} width={width} setItem={setType} />
      ))}
    </View>
    <LinearGradient colors={[$back, 'transparent']} style={styles.news}>
      <Text style={styles.title}>{t("Brands")}</Text>
    </LinearGradient>
    <View style={styles.list}>
      {device.brands.map(item => (
        <Item key={item.id} item={item} width={width} setItem={setBrand} />
      ))}
    </View>    
  </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  news: {
    width: '100%',
    padding: 10,
    marginTop: 5
  },
  list: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  newsList: {
    position: 'relative',
    width: '100%',
    padding: 10,
    overflow: 'hidden',
    //height: 100
  },
  loading: {
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 20,
    color: $danger
  },
  newstitle: {
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    color: $danger,
    //textAlign: 'center'
  },
  discounttitle: {
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    color: $orange,
  },
  title: {
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    color: $primary,
  },
  newstick: {
    position: 'absolute',
    width: 45, 
    height: 45,
    top: 5,
    left: 5
  }
  
})