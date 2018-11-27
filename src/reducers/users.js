import * as Types from './../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, users: null };

const users = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_USERS:
            if (action.users.status){
                state = {
                    status: action.users.status, 
                    users: action.users.data
                }
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
                status: action.user.status, 
                users: action.user,
                preUser: !action.user.status ? action.userOld : null
            };
            return state;
        case Types.UPDATE_USERS:
           
            let {id} = action.user.user; 
            index = findIndex(state.users, { id: id });
            if (index !== -1) {
                state.users[index] = action.user.user;
            }
            state = {
                status: action.user.status,
                users: action.user
            }
            return state;
        case Types.GET_USER: 
            if (action.user){
                state = {
                    userEdit: action.user
                }
            }
            return state;
        default: 
            return state;
    }
}

export default users;