import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import Navigate from './navigate';
import React, { useState } from 'react';
import { gStyle, $active } from './styles/style';
//import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import './i18n';

/* const fonts = Font.loadAsync({
  'mt-300': require('./assets/fonts/Montserrat-Light.ttf'),
  'mt-300-italic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
  'mt': require('./assets/fonts/Montserrat-Regular.ttf'),
  'mt-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
  'mt-600': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  'mt-600-italic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  'mt-800': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
  'mt-800-italic': require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
  'icomoon': require('./assets/fonts/icomoon.ttf'),
}) */

export default function App() {
  //const [font, setFont] = useState(false)
  const [fontsLoaded] = useFonts({
    'mt-300': require('./assets/fonts/Montserrat-Light.ttf'),
    'mt-300-italic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
    'mt': require('./assets/fonts/Montserrat-Regular.ttf'),
    'mt-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
    'mt-600': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'mt-600-italic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'mt-800': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'mt-800-italic': require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    'icomoon': require('./assets/fonts/icomoon.ttf'),
  })
  
  /* if (!font) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={setFont(true)}
        onError={console.warn}
      />
    )
  }  */

  if (!fontsLoaded) {
    return (
      <View style={[gStyle.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size='large' color={$active} />
      </View>    
    )
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer >
      <StatusBar
        backgroundColor={gStyle.statusbar.backgroundColor}
        barStyle='dark-content'
        hidden={false}
      />
      <Navigate/>
    </NavigationContainer>
    </Provider>
    
    
    );
    
}
