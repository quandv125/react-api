import { combineReducers } from 'redux';
// import login from './login';
import users from './users';
import products from './products';
import authentication from './authentication';
const appReducers = combineReducers({
    // login,
    users,
    products,
    authentication
});

export default appReducers;