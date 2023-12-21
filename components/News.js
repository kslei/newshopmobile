import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Pressable, Dimensions, FlatList } from 'react-native';
import Icon from './Icon';
import { $white, $primary, $back, $active, $orange } from '../styles/style';
import { REACT_APP_API_URL } from 'react-native-dotenv';

const News = ({ devices, setItem, play }) => {
  let imagesNum = 3;
  const width = Dimensions.get('window').width
  let widthImg = (width - 20) / imagesNum//width 1 img
  const [duration, setDuration] = useState(5000);//delay / задержка
  //const [play, setPlay] = useState(true);//play / pause
  const [count, setCount] = useState(0);//counter / счетчик
  const [items, setItems] = useState([]);//array of count devices
  const [move, setMove] = useState(false)
  const [onindex, setOnindex] = useState(0)
  const flatlistRef = useRef()
  //const [offset, setOffset] = useState(0);//offset icon__images in % / смещение icon__images в %
  //const [transition, setTransition] = useState(time); //offset delay icon__images / задержка смещения icon__images

  if (devices.length <= imagesNum) imagesNum = devices.length
  useEffect(()=>{
    if (devices.length > imagesNum) {
      for(let i=0; i<imagesNum; i++) {
        devices.push(devices[i])
      }
  }
  },[])
  

  useEffect(() => {
    if (play && devices.length > imagesNum) {
      const int = setInterval(() => {
        next  ()
      }, duration)
      return () => clearInterval(int)
    }
  }, [count, play])
  
  useEffect(() => {
    if (flatlistRef.current) {
      scrollToIndex(count)
    }
  }, [count])

  const getItemLayout = (data, index) => ({
    length: devices.length,
    offset: index * widthImg,
    index,
    data
  })
  const scrollToIndex = (index) => {
    //console.log('scroll to index called !', index)
    flatlistRef.current.scrollToIndex({ animated: index!==0? true : play?false:true, index: index })
  }

  const offset = (e) => {
    let offset = e.nativeEvent.contentOffset.x
    let index = Math.round(offset / widthImg)
    if (move) setOnindex(index)
  }
  const onend = () => {
    setMove(false);
    setCount(onindex)
  }
  const next = () => {
    if (devices.length > imagesNum) {
      if (count < devices.length - imagesNum) {
        setCount(count + 1)
        if (count !== devices.length - imagesNum) setDuration(5000) 
        } else { setDuration(50)
                  setCount(0) }
    } else {
      if (count < devices.length - 1) { setCount(count + 1) } else { setCount(0) }
    }
  }
  
  const prev = () => {
    console.log(count)
    if (devices.length > imagesNum) {
      if (count < 1) {
        setCount (devices.length - imagesNum)
      } else { setCount( count - 1)}
    } else {
      if (count < 1) { setCount(devices.length - 1) } else { setCount(count - 1) }
    }
    
  }
  
  return (
    <View style={styles.news} >
      <FlatList
        data={devices}
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        horizontal={true}
        onScroll={(e) => offset(e)}
        onScrollBeginDrag={() => setMove(true)}
        onScrollEndDrag={() => onend()}
        keyExtractor={(item, index) => 'key' + index}
        //inverted={true}
        renderItem={({ item, index }) => (
          <Pressable style={[styles.item, { width: widthImg }]}onPress={() => setItem(item.id)} >
            <Image style={{ width: widthImg, height: widthImg }} resizeMode='contain' source={{ uri: REACT_APP_API_URL + item.img }} />
            <Text style={styles.itemName}>{item.name}</Text>
            {item.discount !==0 && !play &&
            <ImageBackground source={require('../assets/images/discount.png')} style={[styles.discount, {width: widthImg/4, height: widthImg/4}]} resizeMode='contain'>
              <Text style={[styles.discountText, {fontSize: widthImg/12}]}>-{item.discount}%</Text>
            </ImageBackground>}
          </Pressable>
        )}
      />
      {!play && count!==0 &&
        <Pressable style={({ pressed }) => [styles.btn, { top: widthImg/2, opacity: pressed ? 0.5 : 1 }]} onPress={() => prev()} disabled={play ? true : false} >
          <Icon name='double-left' size={16} color={$white} />
        </Pressable>}
      {!play && count < (devices.length-imagesNum) && 
        <Pressable style={({ pressed }) => [styles.btn, { top: widthImg/2, right: 0, transform: [{ rotateY: '180deg' }], opacity: pressed ? 0.5 : 1 }]} onPress={() => next()} disabled={play ? true : false} >
        <Icon name='double-left' size={16} color={$white} />
      </Pressable>}
    </View>

  );
};
export default News;

const styles = StyleSheet.create({
  news: {
    position: 'relative',
    overflow: 'hidden'
  },
  item: {
    position: 'relative',
    backgroundColor: $white,
  },
  itemName: {
    textAlign: 'center',
    color: $primary,
    fontFamily: 'mt-300',
    fontSize: 10,
    height: 27
  },
  img: {
  width: '100%',
    aspectRatio: 1/1
  },
  btn: {
    position: 'absolute',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $orange,
    borderRadius: 14,
  },
  discount: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    fontFamily: 'mt',
    color: $white,
  }
})