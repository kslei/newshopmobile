import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { $white, $fontSize, $danger } from '../styles/style';

const Message = ({message, setMessage}) => {
  
  return (
    <View style={styles.message}>
      <Text style={styles.text}>{message}</Text>
      <Pressable onPress={() => setMessage('')} style={styles.btnDanger}>
        <Text style={styles.btnTextDanger}>OK</Text>
      </Pressable>
    </View>
  );
};
export default Message;

const styles = StyleSheet.create({
  message: {
    position: 'absolute',
    width: '100%',
    marginTop: '50%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: $white
  },
  text: {
    width: '80%',
    fontSize: $fontSize,
    color: $danger,
    fontFamily: 'mt-600',
  },
  btnDanger: {
    width: 60,
    height: 60,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: $danger,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: $danger
  },
  btnTextDanger: {
    fontSize: 20,
    color: $white,
    fontFamily: 'mt-600',
  }

})