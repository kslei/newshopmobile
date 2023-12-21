import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Pressable } from 'react-native';
import { Button, Image } from 'react-native';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import { $active } from '../styles/style';

let width = Dimensions.get('window').width
const Item = ({item}) => (
  <Image style={styles.frame} source={{ uri: REACT_APP_API_URL + item.frame }} resizeMode='contain' />
)

const Rotate = ({frames}) => {
  const [ind, setInd] = useState(0)
  const [playAuto, setPlayAuto] = useState(true)
  const width = Dimensions.get('window').width
  const flatlistRef = useRef()

  useEffect(() => {
    if (flatlistRef.current) {
      scrollToIndex(ind)
    }
  }, [ind])

  useEffect(() => {
    if (playAuto) {
      const int = setInterval(() => {
        prev()
      }, 150)
      return () => clearInterval(int)
    }
  }, [ind, playAuto])

  const getItemLayout = (data, index) => ({
    length: frames.length,
    offset: index * width,
    index,
  })
  const scrollToIndex = (index) => {
    flatlistRef.current.scrollToIndex({ animated: false, index: index })
  }

  const prev = () => {
    if(ind>0) {
      setInd(ind - 1)
    } else {
      setInd(frames.length - 1)
    }
  }
  const onplay = () => {
    setPlayAuto(!playAuto)
  }
  
  /* setTimeout(()=>{
    prev()
  }, 100) */
  const renderItem = ({item}) => {
    return (
      <Item item={item}/>
    )
  }

  console.log(ind)
  return (
  <View style={styles.rotate}>
    <Pressable onPress={() => onplay()}>
      <FlatList
        data={frames}
        style={{ width: width, aspectRatio: 1 / 1 }}
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        horizontal={true}
        removeClippedSubviews = {true}
        renderItem={renderItem} 
        />
    </Pressable>
  </View>
  );
};
export default Rotate;

const styles = StyleSheet.create({
  rotate: {
    width: '100%',
    overflow: 'hidden'
  },
  frames: {
    flex: 1,
    width: '100%',
    color: $active,
    
  },
  frame: {
    //flex: 1,
    width: width,
    aspectRatio: 1/1
  }
})