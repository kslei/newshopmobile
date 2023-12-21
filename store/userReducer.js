const defaultState = {
  isAuth: false,
  user: false,
  name: '',
  email: '',
  role: '',
  id: '',
  phone: '',
};

const SET_ISAUTH = 'setIsAuth'
const SET_USER = 'setUser'
const SET_NAME = 'setName'
const SET_EMAIL = 'setEmail'
const SET_ROLE = 'setRole'
const SET_ID = 'setId'
const SET_PHONE = 'setPhone'

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ISAUTH:
      return {...state, isAuth: action.payload}
    case SET_USER:
      return {...state, user: action.payload}
    case SET_NAME:
      return {...state, name: action.payload}
    case SET_EMAIL:
      return {...state, email: action.payload}
    case SET_ROLE:
      return {...state, role: action.payload}
    case SET_ID:
      return {...state, id: action.payload}
    case SET_PHONE:
      return {...state, phone: action.payload}
    default:
      return state
  }
}

export const setIsAuth = (payload) => ({
  type: SET_ISAUTH, payload
})
export const setUser = (payload) => ({
  type: SET_USER, payload
})
export const setName = (payload) => ({
  type: SET_NAME, payload
})
export const setEmail = (payload) => ({
  type: SET_EMAIL, payload
})
export const setRole = (payload) => ({
  type: SET_ROLE, payload
})
export const setId = (payload) => ({
  type: SET_ID, payload
})
export const setPhone = (payload) => ({
  type: SET_PHONE, payload
})