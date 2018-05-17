import * as Types from './../constants/ActionType';
let user = JSON.parse(sessionStorage.getItem('authentication'));
const initialState = user ? { loggedIn: true, user } : {loggedIn: false};

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
        default: 
        return state;
    }
}

export default authentication;