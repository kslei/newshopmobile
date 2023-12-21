import React, {useState} from 'react';
import { StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import Icon from './Icon';
import { $back, $fontSize, $primary, $white, $sizeIcon } from '../styles/style';
import { useTranslation } from 'react-i18next';

const Accordeon = ({title, items, callBackFunction}) => {
  const [visible, setVisible] = useState(false)
  const {t} = useTranslation()
  
  const onPressItem = (item) => {
    setVisible(false);
    callBackFunction(item)
  }

  return (
  <View style={styles.accordeon}>
    <Pressable onPress={() => setVisible(!visible)} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, styles.titleButton]}>
      <Text style={styles.title}>{title}</Text>
      <Icon name='double-down' size={$fontSize} color={$primary} />
    </Pressable>
    {visible && <Pressable onPress={() => onPressItem(-1)} style={({ pressed }) => [{ backgroundColor: pressed ? $primary : $white, color: pressed ? $white : $primary }, styles.item]}>
      <Text style={styles.itemText}>{t('All')}</Text>
    </Pressable>}
    {visible && <FlatList style={styles.list} data={items} renderItem={({ item }) => (
      <Pressable key={item.id} onPress={() => onPressItem(item)} style={({ pressed }) => [{backgroundColor: pressed ? $back : $white}, styles.item]}>
        <Text style={styles.itemText}>{item.name}</Text>
      </Pressable>
      )}
    />}
  </View>
  );
};
export default Accordeon;

const styles = StyleSheet.create({
  accordeon: {
    width: '50%',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 5
  },
  title: {
    fontSize: $fontSize,
    color: $primary,
    fontFamily: 'mt',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  titleButton: {
    width: '100%',
    backgroundColor: $back,
    borderColor: $primary,
    borderWidth: 1,
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //marginHorizontal: 10,
    padding: 2,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
    
  },
  list: {
    width: '100%',
    flexGrow: 1
  },
  item: {
    width: '100%',
    //backgroundColor: $white,
    borderColor: $primary,
    paddingHorizontal: 1,
    paddingVertical: 3,
    color: $primary
  },
  itemText: {
    fontSize: $fontSize,
    fontFamily: 'mt',
    color: $primary,
    textAlign: 'center',
  }
})