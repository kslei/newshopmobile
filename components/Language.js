import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, FlatList, Pressable, Image } from 'react-native';


const Language = ({languages, setLanguage}) => {
  const {i18n} = useTranslation()
  const [value, setvalue] = useState(languages.find(item=>item.value === i18n.language).id)
  
  const setId = () => {
    if(value < languages.length-1) {
      setvalue(value + 1)
    } else {
      setvalue(0)
    }
  }
  useEffect(()=>{
    setLanguage(languages[value])
  }, [value])
  
  return (
  <View >
    <Pressable style={styles.language} onPress={setId}>
      <Image
        style={{width: 25, height: 18}}
        resizeMode='cover' source={languages[value].img}
      />
    </Pressable>
  </View>
  );
};
export default Language;

const styles = StyleSheet.create({
  language: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})