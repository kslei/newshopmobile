import {StyleSheet} from 'react-native';

export const $primary = '#b1c610';
export const $back = "#f5f8dd";
export const $white = "#ffffff";
export const $active = '#7b8a0a';
export const $danger = '#fd0d95';
export const $orange = '#eca700';

export const $sizeIcon = 18;
export const $fontSize = 16;

export const gStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  headerStyle: {
    backgroundColor: $back,
    height: 50
  },
  headerTintColor: {
    color: $primary
  },
  statusbar: {
    backgroundColor: $back,
  },
  header: {
    backgroundColor: $back,
  },
  leftIcon: {
    marginLeft: 10
  },
  rightIcon: {
    marginRight: 10
  },
  searchInput: {
    width: 160,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 16,
    borderWidth: 1,
    borderColor: $primary,
    //borderRightWidth: 0,
    color: $active,
    marginLeft: 5
  },
  btn: {
    width: '40%',
    padding: 4,
    borderColor: $primary,
    borderRadius: 5,
    borderWidth: 1
  },
  btnDanger: {
    width: '30%',
    padding: 4,
    borderColor: $danger,
    borderRadius: 5,
    borderWidth: 1
  },
  btnText: {
    fontSize: $fontSize,
    color: $primary,
    fontFamily: 'mt',
    textAlign: 'center'
  },
  btnTextDanger: {
    fontSize: $fontSize,
    color: $danger,
    fontFamily: 'mt',
    textAlign: 'center'
  },
  
})