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
                if(res.data.success){
                    user.id = res.data.id;
                }
                dispatch(actAddUser(user));
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
export const actEditUser = (user, id) => {
    return {
        type: Types.UPDATE_USERS,
        user, id
    }
}

export const actEditUserRequest = (user, id) => {
    return (dispatch) => {        
        return callApi('PUT', config.APP_URL+'/update/'+ id, user).then( res => {            
            dispatch(actEditUser(user, id));
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
            dispatch(actLogin(res.data));
        });
      
        
    }
}

// export const actLogout = (user) => {
//     return {
//         type: Types.LOGOUT,
//         user
//     }
// }

// export const actLogoutRequest = (user) => {
//     return dispatch => {
//         return callApi('POST', 'http://cquiz.local/api/v2/logout', user).then(res => {
//             dispatch(actLogout(res.data));
//         });
      
        
//     }
// }