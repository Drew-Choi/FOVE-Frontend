import { combineReducers } from 'redux';
import user from './modules/user';
import cart from './modules/cart';
import cartmodal from './modules/cartmodal';

export default combineReducers({
  cart,
  user,
  cartmodal,
});
