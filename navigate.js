import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Device from './pages/Device';
import About from './pages/About';
import Delivery from './pages/Delivery';
import User from './pages/User';
import Contacts from './pages/Contacts';
import Basket from './pages/Basket';
import React, { useState, useEffect } from 'react';
import { Image, Pressable, View, ActivityIndicator } from 'react-native';
import Icon from './components/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setId, setName,setIsAuth, setRole, setUser } from './store/userReducer';
import { check } from './API/userAPI';
import { $back, $primary, $white, gStyle, $active } from './styles/style';
import { useTranslation } from 'react-i18next';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack({navigation, route}) {
  
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {height: 35, backgroundColor: $back},
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 14, fontWeight: '400', fontFamily: 'mt' },
        headerTintColor: $primary,
        headerShown: false
        //headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name='Shop'
        component={Shop}
      />
      <Stack.Screen 
        name='Device'
        component={Device}
      />
      <Stack.Screen
        name='Contacts'
        component={Contacts}
      />
      <Stack.Screen
        name='Basket'
        component={Basket}
      />
    </Stack.Navigator>
  )
}

export default function Navigate () {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const {t} = useTranslation()
  
  //authorization check
  useEffect(() => {
    check().then(data => {
      if (data.id) {
        dispatch(setUser(true))
        dispatch(setIsAuth(true))
        dispatch(setRole(data.role))
        dispatch(setId(data.id))
        dispatch(setName(data.name))
        dispatch(setEmail(data.email))
      }
    }).catch(e => { console.log(e.response.data.message) })
      .finally(() => setLoading(false))
  }, [])
  
  //page loading widget
  if(loading) {
    return (
      <View style={[gStyle.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size='large' color={$active} />
      </View>
    )
  }
  return (
    <Tab.Navigator
      initialRouteName='HomeStack'
      screenOptions={{
        headerStyle: gStyle.headerStyle,
        headerTransparent: false,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: $white,
        tabBarActiveBackgroundColor: $primary,
        tabBarInactiveBackgroundColor: $back,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack "
        component={HomeStack}
        options={{ 
          tabBarLabel: `${t('Shop')}`,
          tabBarIcon: ({ color, size }) => <Icon name="store" size={size} color={color} />,
          headerShadowVisible: false
        }} />
      <Tab.Screen
        name="About"
        component={About}
        options={{ 
          tabBarLabel: `${t('About_Store')}`,
          tabBarIcon: ({ color, size }) => <Icon name="info" size={size} color={color} />,
          
        }} />
      <Tab.Screen 
      name="Delivery"
      component={Delivery}
      options={{ 
        tabBarLabel: `${t("Payment")+'-'+t("Delivery")}`,
        tabBarIcon: ({ color, size }) => <Icon name="cash-on-delivery" size={size} color={color} /> 
        }} />
      <Tab.Screen
        name='User'
        component={User}
        options={{
        tabBarLabel: `${t('Profile')}`,
        tabBarIcon: ({ color, size }) => <Icon name={user.isAuth? "user-auth" : "font-user"} size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

