import { combineReducers } from 'redux';
import user from './modules/user';
import cartdata from './modules/cartdata';

export default combineReducers({
  cartdata,
  user,
});
