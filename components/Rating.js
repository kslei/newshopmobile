import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image, Pressable } from 'react-native';


const Rating = (props) => {
  const rate = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ]
  
  const renderItem = ({item}) => {
    return (
      <Pressable onPress={()=>props.setRating(item.value)}>
        <Image style={styles.image} source={item.value<=props.rating ? require('../assets/images/star2.png') : require('../assets/images/star1.png') }/>
      </Pressable>
      
    )
  }

  return (
  <View>
    <FlatList data={rate} horizontal={true} renderItem={renderItem} />
  </View>
  );
};
export default Rating;

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    marginLeft: 5
  }
})