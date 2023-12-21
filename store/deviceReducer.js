const defaultState = {
  devices: [],
  types: [],
  brands: [],
  selectedType: [],
  selectedBrand: [],
  page: 1,
  totalCount: 0,
  limit: 10,
  news: false,
  discount: 1,
};

const SET_TYPES = 'setTypes';
const SET_BRANDS = 'setBrands';
const SET_DEVICES = 'setDevices';
const SET_SELECTED_TYPE = 'setSelectedType';
const SET_SELECTED_BRAND = 'setSelectedBrand';
const SET_PAGE = 'setPage';
const SET_TOTAL_COUNT = 'setTotalCount';
const SET_LIMIT = 'setLimit';
const SET_NEWS = 'setNews';
const SET_DISCOUNT = 'setDiscount';

export const deviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TYPES:
      return {...state, types: action.payload}
    case SET_BRANDS:
      return { ...state, brands: action.payload }
    case SET_DEVICES:
      return { ...state, devices: action.payload }
    case SET_SELECTED_TYPE:
      return { ...state, selectedType: action.payload }
    case SET_SELECTED_BRAND:
      return { ...state, selectedBrand: action.payload }
    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }
    case SET_PAGE:
      return { ...state, page: action.payload }
    case SET_LIMIT:
      return { ...state, limit: action.payload }
    case SET_NEWS:
      return { ...state, news: action.payload }
    case SET_DISCOUNT:
      return { ...state, discount: action.payload}
    default:
      return state
  }
}

export const setTypes = (payload) => ({
  type: SET_TYPES, payload
})
export const setBrands = (payload) => ({
  type: SET_BRANDS, payload
})
export const setDevices = (payload) => ({
  type: SET_DEVICES, payload
})
export const setSelectedType = (payload) => ({
  type: SET_SELECTED_TYPE, payload
})
export const setSelectedBrand = (payload) => ({
  type: SET_SELECTED_BRAND, payload
})
export const setTotalCount = (payload) => ({
  type: SET_TOTAL_COUNT, payload
})
export const setPage = (payload) => ({
  type: SET_PAGE, payload
})
export const setLimit = (payload) => ({
  type: SET_LIMIT, payload
})
export const setNews = (payload) => ({
  type: SET_NEWS, payload
})
export const setDiscount = (payload) => ({
  type: SET_DISCOUNT, payload
}) 