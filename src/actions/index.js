import * as Types from './../constants/ActionType';
import * as config from './../constants/config';
import apiCaller from './../utils/apiCaller';
//test 14/07
// Product
export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return apiCaller('GET', config.API_URL + config.PRODUCTS + config.TOKEN , null).then( res => {
			dispatch(actFetchProducts(res.data));
        });
    }
}

export const actFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}
// Users
export const actFetchUsersRequest = () => {
    return (dispatch) => {
        return apiCaller('GET', config.API_URL + config.USERS + config.TOKEN , null).then( res => {            
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
        return apiCaller('DELETE', config.APP_URL+'/destroy/'+id, null).then( res => {
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
        return apiCaller('POST', config.APP_URL+'/store', user).then( res => {
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
        return apiCaller('PUT', config.APP_URL+'/update/'+ id, user).then( res => {   
            if (res.data.success) {
                // console.log(res.data);         
                dispatch(actEditUser(res.data));
            }
        });
    }
}

export const actGetUserRequest = id => {
    return (dispatch) => {
        return apiCaller('GET', config.APP_URL+'/edit/'+id, null).then(res => {
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
// Login & logout
export const actLogin = (user) => {
    return {
        type: Types.LOGIN,
        user
    }
}

export const actLoginRequest = (user) => {
    return dispatch => {
        return apiCaller('POST', config.LOGIN_URL, user).then(res => {
            console.log('status login:', res.data);
            if (res.data.status) {
                dispatch(actLogin(res.data));
            } else {
                alert(res.data.data);
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
        return apiCaller('GET', config.LOGOUT_URL+token, null).then(res => {
            console.log('status logout: ',res.data.success);
            if(res.data.success){
                dispatch(actLogout());
            } else {
                alert("logout error");
            }
        });   
    }
}