import * as Types from './../constants/ActionType';
import * as config from './../constants/config';
import callApi from './../utils/apiCaller';

export const actFetchUsersRequest = () => {
    return (dispatch) => {
        return callApi('GET', 'http://127.0.0.1:8000/api/v2/user', null).then( res => {
			dispatch(actFetchUsers(res.data));
		});
    }
}

export const actFetchUsers = (users) => {

    return {
        type: Types.FETCH_USERS,
        users
    }
}
    
export const actDeleteUserRequest = (id) => {
    return (dispatch) => {
        return callApi('DELETE', config.APP_URL+'/destroy/'+id, null).then( res => {
			dispatch(actDeleteUser(id));
		}); 
    }
}

export const actDeleteUser = (id) => {
    return {
        type: Types.DELETE_USERS,
        id
    }
}

export const actAddUser = (user) => {
    return {
        type: Types.ADD_USERS,
        user
    }
}

export const actAddUserRequest = (user) => {
    return (dispatch) => {
        return callApi('POST', config.APP_URL+'/store', user).then( res => {
            dispatch(actAddUser(res.data));
        });
    }
}
export const actError = (status, msg) => {
    return {
        type: Types.ERROR,
        status,
        msg
    }
}
export const actEditUser = (user) => {
    return {
        type: Types.UPDATE_USERS,
        user
    }
}

export const actEditUserRequest = (user, id) => {
    return (dispatch) => {        
        return callApi('PUT', 'http://127.0.0.1:8000/api/v2/user/update/'+ id, user).then( res => {   
            if (res.data.success) {
                // console.log(res.data);         
                dispatch(actEditUser(res.data));
            }
        });
    }
}

export const actGetUserRequest = id => {
    return (dispatch) => {
        return callApi('GET', config.APP_URL+'/edit/'+id, null).then(res => {
            dispatch(actGetUser(res.data));
        });
    }
}

export const actGetUser = (user) => {
    return {
        type: Types.GET_USER,
        user
    }
}

export const actLogin = (user) => {
    return {
        type: Types.LOGIN,
        user
    }
}

export const actLoginRequest = (user) => {
    return dispatch => {
        return callApi('POST', 'http://127.0.0.1:8000/api/v2/login', user).then(res => {
            console.log('status login:', res.data.loggedIn);
            if (res.data.loggedIn) {
                dispatch(actLogin(res.data));
            } else {
                alert('login error');
            }
        });
    }
}

export const actLogout = () => {
    return {
        type: Types.LOGOUT,
    }
}

export const actLogoutRequest = (token) => {
    return dispatch => {
        return callApi('GET', 'http://127.0.0.1:8000/api/v2/logout?token='+token, null).then(res => {
            console.log('status logout: ',res.data.success);
            if(res.data.success){
                dispatch(actLogout());
            } else {
                alert("logout error");
            }
        });   
    }
}