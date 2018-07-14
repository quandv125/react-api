import { combineReducers } from 'redux';
// import login from './login';
import users from './users';
import userEdit from './userEdit';
import authentication from './authentication';
const appReducers = combineReducers({
    // login,
    users,
    userEdit,
    authentication
});

export default appReducers;