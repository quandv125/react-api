import * as Types from './../constants/ActionType';
// let user = JSON.parse(sessionStorage.getItem('authentication'));

// const initialState = user ? { loggedIn: true, user } : { loggedIn: false };
const initialState = { loggedIn: false };

// const initialState = {};
const authentication = (state = initialState, action) => {
    switch(action.type){
        case Types.LOGIN:
        // console.log(action);
        // console.log(action.user);
            if(action.user && action.user.status){
                sessionStorage.setItem('authentication', JSON.stringify(action.user));
                state = { loggedIn: true, user: JSON.parse(sessionStorage.getItem('authentication')) };
            }
            return state;
        case Types.LOGOUT:
            sessionStorage.removeItem('authentication');
            state = { loggedIn: true };
            return state;
        default: 
            return state;
    }
}

export default authentication;