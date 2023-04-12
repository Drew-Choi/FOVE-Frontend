import { combineReducers } from 'redux';
import user from './modules/user';
import cart from './modules/cart';

export default combineReducers({
  cart,
  user,
});
