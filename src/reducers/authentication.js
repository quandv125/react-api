import * as Types from './../constants/ActionType';
let user = JSON.parse(sessionStorage.getItem('authentication'));
const initialState = user ? { loggedIn: true } : {loggedIn: false};
// const initialState = {};
const authentication = (state = initialState, action) => {
    switch(action.type){
        case Types.LOGIN:
            // console.log(state);
            if(state.loggedIn === false && action.user.loggedIn === true){
                state = { loggedIn: true };
                sessionStorage.setItem('authentication', JSON.stringify(action.user));
            }
            // console.log(state);
            return action.user;
        case Types.LOGOUT:
        // console.log('reducer logout');
            state = { loggedIn: false };
            sessionStorage.removeItem('authentication');
            return state;
        default: 
            return state;
    }
}

export default authentication;