import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, TextInput } from 'react-native';
import { $back, $danger, $primary, $sizeIcon, gStyle } from '../styles/style';
import Icon from './Icon';
import { useTranslation } from 'react-i18next';
import {setStore} from '../store/asyncstore';
import Language from './Language';
import { useDispatch, useSelector } from 'react-redux';
import { setVis } from '../store/searchReducer';

const Header = ({navigation, route, search, onChange, clear}) => {
  const [searchVisible, setSearchVisible] = useState(false)
  const {t, i18n} = useTranslation()
  const visible = useSelector(state=>state.vis)
  const device = useSelector(state=>state.device)
  const dispatch = useDispatch()
  const languages = [
    { id: 0, value: "en", name: "EN", img: require('../assets/images/EN.png') },
    { id: 1, value: "ru", name: "RU", img: require('../assets/images/RU.png') },
    { id: 2, value: "uk", name: "UA", img: require('../assets/images/UK.png') },
  ]
  useEffect(()=>{
    if (route.name !== 'Shop') {
      dispatch(setVis(false))
    }
  }, [route.name])

  const onSearchVisible = () => {
    if (route.name !== 'Shop') {
      navigation.navigate("Shop")
    }
    dispatch(setVis(true))
  }
  
  /* const clear = () => {
    onChange('')
    dispatch(setVis(false))
  } */

  const changeLanguage = (lng) => {
    setStore('language', lng.value).then(data => i18n.changeLanguage(lng.value))
  }
    
  return (
  <View style={styles.header}>
      {route.name == 'Home' || route.name == 'About' || route.name == 'Delivery' || route.name == 'User' 
    ? <View style={styles.icon}></View>
    : <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
        <Icon name='double-left' size={$sizeIcon} color={$primary} />
      </Pressable>
    }
    {!visible.vis &&
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Image style={styles.image} source={require('../assets/images/favicon.png')}/>
      </Pressable> 
    }
    {!visible.vis
      ? <Pressable style={styles.icon} onPress={() => onSearchVisible()}>
          <Icon name='search' size={$sizeIcon} color={$primary} />
        </Pressable>
        : <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} /* onBlur={() => dispatch(setVis(false))} */ >
            <TextInput style={gStyle.searchInput} placeholder={t('Search_by_name')} 
              value={search} onChangeText={text => onChange(text)} readOnly={route.name==="Shop"? false : true}
            />
            <Pressable onPress={() => clear()}>
              <Icon name='close' size={$sizeIcon} color={$danger} />
            </Pressable>
          </View>
    }
    <View style={{flexDirection: 'row', width: 65, justifyContent: 'space-between'}}>
      <Language languages={languages} setLanguage={changeLanguage}/>
      <Pressable style={styles.icon} onPress={() => navigation.navigate('Basket')}>
        <Icon name='shopping-cart' size={$sizeIcon} color={$primary} />
      </Pressable>
    </View>
    
  </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: $back,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: $primary,
    borderBottomWidth: 1,
  },
  image: {
    width: 130,
    height: 50,
    marginRight: 20
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClose: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: $danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginRight: 5
  }
})
export default Header;