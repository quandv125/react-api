import { combineReducers } from 'redux';
import login from './login';
import users from './users';
import user from './user';
// import errors from './errors';
const appReducers = combineReducers({
    login,
    users,
    user,
    // errors
});

export default appReducers;