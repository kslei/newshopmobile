const defaultState = {
  discountDevices: [],
};

const SET_DISCOUNT_DEVICES = 'setDiscountDevices';

export const discountReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DISCOUNT_DEVICES:
      return { ...state, discountDevices: action.payload }
    default:
      return state
  }
}

export const setDiscountDevices = (payload) => ({
  type: SET_DISCOUNT_DEVICES, payload
})