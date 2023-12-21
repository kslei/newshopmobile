import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Pressable, Modal, TextInput, Image, ScrollView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setEmail, setIsAuth, setName, setId, setRole, setPhone } from '../store/userReducer';
import Icon from '../components/Icon';
import Header from '../components/Header';
import { check, login, registration } from '../API/userAPI';
import { $back, $danger, $fontSize, $white, $primary, $active, gStyle, $sizeIcon } from '../styles/style';
import { deleteStore, getValueFor } from '../API/store';
import { useTranslation } from 'react-i18next';
import Orders from '../components/Orders';

const User = ({navigation, route}) => {
  const user = useSelector(state => state.user)
  const [vis, setVis] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [sequrityPass, setSequrityPass] = useState(true)
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const { t } = useTranslation()
  //validation states
  const [emailError, setEmailError] = useState(`email ${t("cannot be empty")}`)
  const [passwordError, setPasswordError] = useState(`password ${t("cannot be empty")}`)
  const [nameError, setNameError] = useState(`${t("Name")} ${t("cannot be empty")}`)
  const [phoneError, setPhoneError] = useState(`${t("Phone")} ${t("cannot be empty")}`)
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [nameDirty, setNameDirty] = useState(false)
  const [phoneDirty, setPhoneDirty] = useState(false)
  //disabled button reg/log
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (emailError || passwordError || !isLogin && (nameError || phoneError)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [emailError, passwordError, nameError, phoneError, isLogin])

  //onblur event handling
  const blurEmail = () => {
    setEmailDirty(true)
  }
  const blurPassword = () => {
    setPasswordDirty(true)
  }
  const blurName = () => {
    setNameDirty(true)
  }
  const blurPhone = () => {
    setPhoneDirty(true)
  }
  
  //validation form
  const onEmail = (text) => {
    setemail(text)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(text).toLowerCase()) && String(text).length !== 0) {
      setEmailError(`${t("Incorrect_male")} email`)
    } else {
      setEmailError('')
    }
    if (String(text).length === 0) setEmailError(`${t("Field")} 'email' ${t("cannot be empty")}`)
  }
  const onPassword = (text) => {
    setpassword(text)
    const rp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
    if (!rp.test(String(text)) && String(text).length !== 0) {
      setPasswordError(`${t("Incorrect_male")} password`)
    } else {
      setPasswordError('')
    }
    if (String(text).length === 0) setPasswordError(`${t("Field")} 'password' ${t("cannot be empty")}`)
  }
  const onName = (text) => {
    setname(text)
    if (String(text).length > 1 && String(text).length <= 10) {
      setNameError('')
    } else {
      setNameError(`${t("Incorrect")} ${t("Name").toLowerCase()}`)
    }
    if (String(text).length === 0) setNameError(`${t("Field")} 'name' ${t("cannot be empty")}`)
  }
  const onPhone = (text) => {
    setphone(text)
    const rph = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/
    if (!rph.test(String(text)) && String(text).length !== 0) {
      setPhoneError(`${t("Incorrect_male")} ${t("Phone").toLowerCase()}`)
    } else {
      setPhoneError('')
    }
    if (String(text).length === 0) setPhoneError(`${t("Field")} 'phone' ${t("cannot be empty")}`)
  }

  //server validate errors
  const serverValidationHandler = (e) => {
    switch (e.path) {
      case 'name':
        setNameError(e.msg)
        break
      case 'email':
        setEmailError(e.msg)
        break
      case 'password':
        setPasswordError(e.msg)
        break
      case 'phone':
        setPhoneError(e.msg)
        break
      case 'role':
        alert(e.msg)
        break
    }
  }
  //click button login/registration
  const click = async () => {
    try {
      let data;
      let role;
      
      if (isLogin) {
        data = await login(email, password)
      } else {
        role = 'USER'
        data = await registration(email, password, role, name, phone)
      }
      
      dispatch(setUser(true))
      dispatch(setIsAuth(true))
      dispatch(setName(data.name))
      dispatch(setEmail(data.email))
      dispatch(setRole(data.role))
      dispatch(setId(data.id))
      dispatch(setPhone(data.phone))

      setemail('')
      setpassword('')
      setphone('') 
      setname('')
      setVis(false)
    } catch (e) {//errors heandler
      if (e.response.data.message) setMessage(e.response.data.message)
      if (e.response.data.errors) {
        //setErrorMessage(e)
        e.response.data.errors.map(error => {
          serverValidationHandler(error)
        })
      }
      console.log('ERROR', e)
    }
  }

  const logout = () => {
    deleteStore('token')
    dispatch(setUser(false))
    dispatch(setIsAuth(false))
    dispatch(setName(''))
    dispatch(setEmail(''))
    dispatch(setRole(''))
    dispatch(setId(''))
    dispatch(setPhone(''))
  }

  return (
  <View style={gStyle.container}>
    <Header navigation={navigation} route={route}/>
    <View style={styles.user}>
      {user.isAuth ? 
      <View style={styles.row}>
        <Text style={styles.text}>{t("Name")}: "{user.name}"</Text>
        <Pressable style={({ pressed }) => [styles.btn, { borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4 }]} onPress={() => logout()}>
          <Text style={styles.btnText}>{t("Sign_out")}</Text>
        </Pressable>
      </View>
      : <View style={styles.row}>
          <Text style={styles.text}>{t("Not_autorized")}?</Text>
        <Pressable 
          style={({ pressed }) => [styles.btn, { borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4 }]}
          onPress={() => setVis(true)}>
          <Text style={styles.btnText}>{t("Autorization")}</Text>
        </Pressable>
      </View>
      }
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={vis}
    >
      <ScrollView style={styles.modal}>
        <View style={styles.row}>
            <Text style={styles.title}>{isLogin ? t('Autorization') : t('Registration')}</Text>
          <Pressable onPress={() => setVis(false)}>
            <Icon name='close' size={24} color={$danger} />
          </Pressable>
        </View>
        {message.length !== 0 &&
          <View style={styles.row}>
            <Text style={gStyle.btnTextDanger}>{message}</Text>
            <Pressable onPress={() => setMessage('')} style={[gStyle.btnDanger, {width: '20%'}]}>
              <Text style={gStyle.btnTextDanger}>OK</Text>
            </Pressable>
          </View> 
        }
        <View style={styles.error}>
          {(emailDirty && emailError.length !==0) && 
          <View>
            <Text style={styles.textError}>{emailError}</Text>
          </View>}
        </View>
        <TextInput 
          style={styles.input} 
          placeholder={t("Enter") + " Email"} 
          placeholderTextColor={'gray'}
          inputMode='email'
          secureTextEntry={false}
          value={email}
          onBlur={() => blurEmail()}
          onChangeText={text=>onEmail(text)}
          name='email'
          onSubmitEditing={Keyboard.dismiss}
        />
        <View style={styles.error}>
          {(passwordDirty && passwordError.length !==0) ? <Text style={styles.textError}>{passwordError}</Text> : <Text style={[styles.textError, {color: $primary}]}>{t("password_rule")}</Text>}
        </View>
        <View style={{width: '100%', position: 'relative'}}>
          <TextInput
            style={styles.input}
            placeholder={t("Enter") + " " + t("password")}
            placeholderTextColor={'gray'}
            inputMode='text'
            keyboardType='default'
            secureTextEntry={sequrityPass}
            value={password}
            onBlur={() => blurPassword()}
            onChangeText={text => onPassword(text)}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Pressable style={{ opacity: sequrityPass ? 0.5 : 1, position: 'absolute', top: 12, right: 5}} onPress={() => setSequrityPass(!sequrityPass)}>
            <Image style={{width: 24, height: 24}} source={require('../assets/images/visibility.png')} />
          </Pressable>
        </View>
        {!isLogin &&
          <View>
            <View style={styles.error}>
              {(nameDirty && nameError.length !==0) ? <Text style={styles.textError}>{nameError}</Text> : <Text style={[styles.textError, { color: $primary }]}>{t("name_rule")}</Text>}
            </View>
            <TextInput
              style={styles.input}
              placeholder={t("Enter") + " " + t("name")}
              placeholderTextColor={'gray'}
              inputMode='text'
              secureTextEntry={false}
              value={name}
              onBlur={() => blurName()}
              onChangeText={text => onName(text)}
              onSubmitEditing={Keyboard.dismiss}
            />
            <View style={styles.error}>
              {(phoneDirty && phoneError.length !==0) ? <Text style={styles.textError}>{phoneError}</Text> : <Text style={[styles.textError, { color: $primary }]}>{t("phone_rule")}</Text>}
            </View>
            <TextInput
              style={styles.input}
              placeholder={t("Enter") + " " + t("phone")}
              placeholderTextColor={'gray'}
              inputMode='tel'
              secureTextEntry={false}
              value={phone}
              onBlur={() => blurPhone()}
              onChangeText={text => onPhone(text)}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        }
        {isLogin ?
          <View style={styles.row}>
            <Text style={styles.question}>{t("No_account?")}</Text>
            <Pressable onPress={() => setIsLogin(false)}>
              <Text style={styles.selection}>{t('Sign_up')}</Text>
            </Pressable>
          </View> 
          : <View style={styles.row}>
            <Text style={styles.question}>{t("Have_an_account?")}</Text>
            <Pressable onPress={() => setIsLogin(true)}>
              <Text style={styles.selection}>{t('Login')}</Text>
            </Pressable>
          </View> 
        }
        <View style={styles.row}>
          <Pressable style={({ pressed }) => [gStyle.btn, { borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4 }]} onPress={()=>click()} disabled={disabled}>
              <Text style={[gStyle.btnText, { textDecorationLine: disabled ? 'line-through' : 'none'}]}>{isLogin? t('Login') : t('Registration')}</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [gStyle.btnDanger, { borderWidth: pressed ? 2 : 1, padding: pressed ? 3 : 4, width: '40%' }]} onPress={()=>setVis(false)}>
              <Text style={gStyle.btnTextDanger}>{t("Cancel")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
    {user.isAuth &&
      <View style={styles.about}>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phone}</Text>
      </View>
    }
    {user.isAuth &&
      <View>
        <Text style={styles.order}>{t('Orders')}</Text>
        <Orders user={user}/>
      </View>
      
    }
  </View>
  );
};
export default User;

const styles = StyleSheet.create({
  user: {
    width: '100%',
    padding: 10,
    /* alignItems: 'center' */
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: $sizeIcon,
    fontFamily: 'mt-800',
    color: $primary
  },
  text: {
    fontSize: 15,
    fontFamily: 'mt'
  },
  question: {
    fontSize: 14,
    fontFamily: 'mt',
    color: $primary
  },
  selection: {
    fontSize: 14,
    fontFamily: 'mt-600',
    color: $active,
    textDecorationLine: 'underline'
  },
  modal: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 130,
    backgroundColor: $back,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: $active
  },
  input: {
    width: '100%',
    padding: 4,
    marginVertical: 10,
    borderColor: $primary,
    borderWidth: 1,
    //textAlign: 'center',
    fontSize: $fontSize,
    fontFamily: 'mt',
    color: 'black',
    borderRadius: 5
  },
  error: {
    marginTop: 5,
    minHeight: 12,
  },
  textError: {
    color: $danger,
    fontSize: 12
  },
  about: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'start',
  },
  aboutText: {
    fontFamily: 'mt',
    fontSize: $fontSize
  },
  order: {
    fontFamily: 'mt-600',
    fontSize: $fontSize,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: 'center'
  },
  btn: {
    width: '40%',
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderColor: $primary,
    borderRadius: 5,
    borderWidth: 1
  },
  btnText: {
    fontSize: 15,
    color: $primary,
    fontFamily: 'mt',
    textAlign: 'center'
  },
})