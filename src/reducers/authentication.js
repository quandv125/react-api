import * as Types from './../constants/ActionType';
let user = JSON.parse(sessionStorage.getItem('authentication'));

const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

// const initialState = {};
const authentication = (state = initialState, action) => {
    switch(action.type){
        case Types.LOGIN:
            sessionStorage.setItem('authentication', JSON.stringify(action.user));
            if(state.loggedIn === false && action.user.loggedIn === true){
                state = { loggedIn: true, user: JSON.parse(sessionStorage.getItem('authentication')) };
            }
            return action.user;
        case Types.LOGOUT:
            sessionStorage.removeItem('authentication');
            state = { loggedIn: false };
            return state;
        default: 
            return state;
    }
}

export default authentication;