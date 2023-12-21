const defaultState = {
  newDevices: [],
};

const SET_NEW_DEVICES = 'setNewDevices';

export const newReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_NEW_DEVICES:
      return { ...state, newDevices: action.payload }
    default:
      return state
  }
}

export const setNewDevices = (payload) => ({
  type: SET_NEW_DEVICES, payload
})
