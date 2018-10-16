import { combineReducers } from 'redux';
import users from './users';
import products from './products';
import authentication from './authentication';
const appReducers = combineReducers({
    users,
    products,
    authentication
});

export default appReducers;