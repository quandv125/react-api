import * as Types from './../constants/ActionType';

// const initialState = user ? { loggedIn: true, user } : { loggedIn: false };
const initialState = { loggedIn: sessionStorage.getItem('authentication') ? true : false, loggedOut: false };

const authentication = (state = initialState, action) => {
    switch(action.type){
        case Types.LOGIN:
            if(action.user && action.user.status){
                sessionStorage.setItem('authentication', JSON.stringify(action.user));
                state = { loggedIn: true, loggedOut: false, user: JSON.parse(sessionStorage.getItem('authentication')) };
            }
            return state;
        case Types.LOGOUT:
            sessionStorage.removeItem('authentication');
            state = { loggedIn: false, loggedOut: true, user: null };
            return state;
        default: 
            return state;
    }
}

export default authentication;