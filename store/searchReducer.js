const defaultState = {
  vis: false,
};

const SET_VIS = 'setVis'

export const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_VIS:
      return { ...state, vis: action.payload }
    default:
      return state
  }
}

export const setVis = (payload) => ({
  type: SET_VIS, payload
})