import {createStore, combineReducers} from 'redux';
import { deviceReducer } from './deviceReducer';
import {userReducer} from './userReducer';
import { searchReducer } from './searchReducer';
import { newReducer } from './newReduser';
import { discountReducer } from './discountReducer';

const rootReducer = combineReducers({
  device: deviceReducer,
  newDevice: newReducer,
  discountDevice: discountReducer,
  user: userReducer,
  vis: searchReducer,
})

export const store = createStore(rootReducer)