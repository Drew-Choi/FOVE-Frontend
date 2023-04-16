import { combineReducers } from 'redux';
import user from './modules/user';
import cart from './modules/cart';
import cartmodal from './modules/cartmodal';
import order from './modules/order';
import payment from './modules/payment';
import recipient from './modules/payment';

export default combineReducers({
  cart,
  user,
  cartmodal,
  order,
  payment,
  recipient,
});
