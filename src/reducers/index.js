import { combineReducers } from 'redux';
import sms from './sms';
import users from './users';
import role from './role';
import orders from './orders';
import products from './products';
import billing from './billing';
import calling from './calling';
import category from './category';
import service from './service';
import customers from './customers';
import authentication from './authentication';
const appReducers = combineReducers({
    sms,
    users,
    role,
    orders,
    products,
    billing,
    calling,
    category,
    service,
    customers,
    authentication
});

export default appReducers;