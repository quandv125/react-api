import * as Types from './../constants/ActionType';
var initialState = [];

var findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if(user.id === id) {
            result = index;
        }
    });
    return result;
}

const users = (state = initialState, action) => {
    switch(action.type){
        case Types.FETCH_USERS:
            state = action.users
            return [...state];
        case Types.DELETE_USERS:
            var index = findIndex(state, action.id);
            if (index !== -1) {
				state.splice(index, 1);
            }
            return [...state];
        case Types.ADD_USERS: 
            // console.log(action);
            state.push(action.user);
            return [...state];
        case Types.UPDATE_USERS:
            let {id} = action.user.user; 
            index = findIndex(state, id);
            if (index !== -1) {
				state[index] = action.user.user;
            }
            return [...state];
        default: 
            return [...state];
    }
}

export default users;