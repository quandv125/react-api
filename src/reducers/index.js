import { combineReducers } from 'redux';
import sms from './sms';
import users from './users';
import orders from './orders';
import products from './products';
import category from './category';
import customers from './customers';
import authentication from './authentication';
const appReducers = combineReducers({
    sms,
    users,
    orders,
    products,
    category,
    customers,
    authentication
});

export default appReducers;