import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Dimensions, Pressable, FlatList } from 'react-native';
//import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Rotate from './Rotate';
import { REACT_APP_API_URL } from 'react-native-dotenv';

import Icon from './Icon';
import { $primary, $sizeIcon, $white, gStyle } from '../styles/style';
import ModalImage from './ModalImage';

const DeviceImage = ({img, images, frames}) => {
  const [icons, setIcons] = useState([]);//массив иконок
  
  const [countImage, setCountImage] = useState(0);
  const [isi, setISI] = useState(0)
  const [move1, setMove1] = useState(false)
  const [move2, setMove2] = useState(false)
  const [onindex1, setOnindex1] = useState(0)
  const [onindex2, setOnindex2] = useState(0)
  const width = Dimensions.get('window').width
  const iconWidth = width - 20 - 2*40
  /* Modal */
  const [vis, setVis] = useState(false)
  const [modal, setModal] = useState('')
  //const [panEnabled, setPanEnabled] = useState(false)
  /* NoModal*/
  const flatlistRef1 = useRef()
  const flatlistRef2 = useRef()
  
  if (frames.length !== 0) { frames = frames.sort((a, b) => a.id - b.id); }
  if (images.length !== 0) { images = images.sort((a, b) => a.id - b.id); }

  useEffect(() => {
    if (flatlistRef2.current) {
      scrollToIndex2(isi)}
  }, [isi])

  const getItemLayout1 = (data, index) => ({
    length: images.length,
    offset: index * (width - 20),
    index,
  })
  const scrollToIndex1 = (index) => {
    //console.log('scroll to index called !', index)
    flatlistRef1.current.scrollToIndex({ animated: true, index: index })
  }

  const getItemLayout2 = (data, index) => ({
    length: images.length,
    offset: index * (iconWidth/3),
    index,
  })
  const scrollToIndex2 = (index) => {
    //console.log('scroll to index called !', index)
    flatlistRef2.current.scrollToIndex({ animated: true, index: index })
  }

  const offset1 = (e) => {
    let offset = e.nativeEvent.contentOffset.x
    let index = Math.round(offset/(width - 20))
    if(move1) setOnindex1(index)
  }
  const offset2 = (e) => {
    let offset = e.nativeEvent.contentOffset.x
    let index = Math.round(offset/(iconWidth/3))
    if(move2) setOnindex2(index)
  }
  const onend1 = () => {

    setMove1(false)
    scrollToIndex1(onindex1)
  }
  const onend2 = () => {
    setMove2(false);
    setISI(onindex2)
  }

  const next = () => {
    if(isi < images.length-1) {setISI(isi + 1)} else {setISI(0)}
  }
  const prev = () => {
    if(isi < 1) {setISI(images.length - 1)} else {setISI(isi - 1)}
  }
  /* Modal */
  const onZoom = (img) => {
    setVis(true)
    setModal(img)
  }
  const onHide = () => {
    setModal('')
    //reset()
    setVis(false)
  }
        
  if (images.length === 0 && frames.length === 0) {
    return (
      <View style={styles.deviceImage}>
        <ModalImage vis={vis} modal={modal} onHide={onHide}/>
        <Pressable onPress={() => onZoom(img)} >
          <ImageBackground style={styles.image} resizeMode='contain' source={{ uri: REACT_APP_API_URL + img }}/>
        </Pressable>
      </View>
    );} else {
    return (
      <View style={styles.deviceImage}>
        <View style={{width: '100%', overflow: 'hidden'}}>
          <ModalImage vis={vis} modal={modal} onHide={onHide}/>
          <FlatList
            data={images} 
            style={{width: width-20, aspectRatio: 1/1}} 
            //showsHorizontalScrollIndicator={false} 
            ref={flatlistRef1}
            getItemLayout={getItemLayout1}
            horizontal={true}
            onScroll={(e) => offset1(e)}
            onScrollBeginDrag={() => setMove1(true)} 
            onScrollEndDrag={() => onend1()}
            renderItem={({item}) => (
              <Pressable onPress={() => onZoom(item.img)} >
                <Image style={[styles.image, {width: width - 20}]} resizeMode='contain' source={{uri: REACT_APP_API_URL + item.img}}/>
              </Pressable>
            )}/>
        </View>
        <View style={styles.icons}>
          <Pressable style={({pressed}) => [styles.btn, {opacity: pressed ? 0.5 : 1}]} onPress={()=>prev()} disabled={isi < 1?true:false} >
            <Icon name='double-left' size={16} color={isi < 1 ? $primary : $white} />
          </Pressable>
          <View style={{width: iconWidth, overflow: 'hidden', backgroundColor: $white}}>
            <FlatList
              data={images}
              //showsHorizontalScrollIndicator={false}
              ref={flatlistRef2}
              getItemLayout={getItemLayout2}
              horizontal={true}
              onScroll={(e) => offset2(e)}
              onScrollBeginDrag={() => setMove2(true)} 
              onScrollEndDrag={()=>onend2()}
              //initialScrollIndex={isi}
              renderItem={({ item, index }) => (
                <Pressable onPress={() => scrollToIndex1(index)} >
                  <Image style={{ width: iconWidth / 3, height: 60 }} resizeMode='contain' source={{ uri: REACT_APP_API_URL + item.img }} />
                </Pressable>
              )}
            />
          </View>
          <Pressable style={({ pressed }) => [styles.btn, { transform: [{ rotateY: '180deg' }], opacity: pressed ? 0.5 : 1 }]} onPress={() => next()} disabled={isi < images.length-3 ? false : true} >
            <Icon name='double-left' size={16} color={isi < images.length-3 ? $white : $primary} />
          </Pressable>
        </View>
        
      </View>
    )
  }
};
export default DeviceImage;

const styles = StyleSheet.create({
  deviceImage: {
    width: '100%'
  },
  images: {
    width: '100%',
    aspectRatio: 1/1,
  },
   image: {
    aspectRatio: 1/1
  },
  icons: {
    flex: 1,
    width: '100%',
    paddingVertical: 1,
    backgroundColor: $primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  btn: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})