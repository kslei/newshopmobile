import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Image, Text } from 'react-native';
import { $primary, $white } from '../styles/style';
import MapView, {Marker, Callout} from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';

const Map = () => {
  const {t} = useTranslation()
  const latitude = 47.863214
  const longitude = 35.094835
  const title = 'New Shop'
  const adress = `${t("address0")}`
  
  const MyCustomMarker = () => {
    return(
      <View style={styles.marker}>
        <Image source={require('../assets/images/marker.png')} style={{width: 24, height: 24, position: 'relative'}} />
      </View>
    )
  }
  const MyCustomCalloutView = ({title, adress}) => {
    return (
      <View style={styles.about}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.adress}>{adress}</Text>
      </View>
    )
  }
  
  return (
  <View style>
    <MapView style={styles.map}
        initialRegion={{
          latitude: 47.863214,
          longitude: 35.094835,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        provider={PROVIDER_GOOGLE}
    >
      <Marker 
        coordinate={{ latitude: latitude, longitude: longitude }}
      >
        <MyCustomMarker />
        <Callout>
          <MyCustomCalloutView title={title} adress={adress}/>
        </Callout> 
      </Marker>
    </MapView>
  </View>
  );
};
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: 250
  },
  about: {
    width: 100,
    backgroundColor: $white,
  },
  title: {
    fontFamily: 'mt-600',
    fontSize: 12,
    color: $primary,
    textAlign: 'center'
  },
  adress: {
    fontFamily: 'mt-300',
    fontSize: 10
  }
})