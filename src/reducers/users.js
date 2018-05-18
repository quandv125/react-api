import * as Types from './../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = [];

const users = (state = initialState, action) => {
    switch(action.type){
        case Types.FETCH_USERS:
            state = action.users
            return [...state];
        case Types.DELETE_USERS:
            var index = findIndex(state, { id: action.id });
            if (index !== -1) {
				state.splice(index, 1);
            }
            return [...state];
        case Types.ADD_USERS: 
            // if( action.user.success ) {
            //     console.log('save ok');
            // } else {
            //     console.log('save error');
            // }
            // console.log(action);
            state = action.user;
            // state = action
            return state;
        case Types.UPDATE_USERS:
            let {id} = action.user.user; 
            index = findIndex(state, { id: id });
            if (index !== -1) {
				state[index] = action.user.user;
            }
            return [...state];
        default: 
            return [...state];
    }
}

export default users;