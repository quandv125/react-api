import * as Types from './../constants/ActionType';
var initialState = {};

const login = (state = initialState, action) => {
    switch(action.type){
        case Types.LOGIN:
       
            if(action.user.status){
                localStorage.setItem('loginAuth', JSON.stringify(action.user));
            } else {
                localStorage.setItem('loginAuth', JSON.stringify(action.user));
            }
           
           return action.user;
        default: 
        return state;
    }
}

export default login;