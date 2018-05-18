import * as Types from './../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: false, users: null };

const users = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_USERS:
            state = {
                status: false,
                users: action.users
            }
            return state;
        case Types.DELETE_USERS:
            var index = findIndex(state.users, { id: action.id });
            if (index !== -1) {
				state.users.splice(index, 1);
            }
            state = {
                status: false,
                users: state.users
            }
            return state;
        case Types.ADD_USERS: 
            state = { 
                status: action.user.success, 
                users: action.users 
            };
            return state;
        case Types.UPDATE_USERS:
            let {id} = action.user.user; 
            index = findIndex(state.users, { id: id });
            if (index !== -1) {
                state.users[index] = action.user.user;
            }
            state = {
                status: action.user.success,
                users: action.users
            }
            return state;
        default: 
            return state;
    }
}

export default users;