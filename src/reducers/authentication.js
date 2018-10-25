import * as Types from './../constants/ActionType';

const initialState = { loggedIn: null, loggedOut: false };

const authentication = (state = initialState, action) => {
    switch(action.type){
        case Types.LOGIN:
            if( action.user.status ){ // if login is successfully
                sessionStorage.setItem('authentication', JSON.stringify(action.user));
                state = { loggedIn: action.user.status, loggedOut: false, user: JSON.parse(sessionStorage.getItem('authentication')) };
            } else {
                state = { loggedIn: action.user.status, loggedOut: false, msg: action.user.msg };
            }
            return state;
        case Types.LOGOUT:
            sessionStorage.removeItem('authentication');
            state = { loggedIn: false, loggedOut: true, user: null, msg: null };
            return state;
        default: 
            return state;
    }
}

export default authentication;