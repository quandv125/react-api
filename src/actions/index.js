import * as Types from './../constants/ActionType';
import * as config from './../constants/config';
import callApi from './../utils/apiCaller';
//test
export const actFetchUsersRequest = () => {
    return (dispatch) => {
        return callApi('GET', config.APP_URL , null).then( res => {
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

export const actAddUser = (user, userOld) => {
    return {
        type: Types.ADD_USERS,
        user,
        userOld
    }
}

export const actAddUserRequest = (user) => {
    return (dispatch) => {
        return callApi('POST', config.APP_URL+'/store', user).then( res => {
            // console.log(res.data);
            dispatch(actAddUser(res.data, user));
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
        return callApi('PUT', config.APP_URL+'/update/'+ id, user).then( res => {   
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
        return callApi('POST', config.LOGIN_URL , user).then(res => {
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
        return callApi('GET', config.LOGOUT_URL+token, null).then(res => {
            console.log('status logout: ',res.data.success);
            if(res.data.success){
                dispatch(actLogout());
            } else {
                alert("logout error");
            }
        });   
    }
}