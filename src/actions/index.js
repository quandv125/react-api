import * as Types from './../constants/ActionType';
import * as config from './../constants/config';
import apiCaller from './../utils/apiCaller';

// Product
export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return apiCaller('GET', config.API_URL + config.PRODUCTS  , null).then( res => {
            if(res){
                dispatch(actFetchProducts(res.data));

            }
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
        return apiCaller('GET', config.USER_URL  , null).then( res => {     
            if(res){     
                dispatch(actFetchUsers(res.data));
            }
		});
    }
}

export const actFetchUsers = (users) => {
    return {
        type: Types.FETCH_USERS,
        users
    }
}
// Delete User    
export const actDeleteUserRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.USER_URL + id , null).then( res => {
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
// Add User
export const actAddUser = (user, userOld) => {
    return {
        type: Types.ADD_USERS,
        user,
        userOld
    }
}

export const actAddUserRequest = (user) => {
    return (dispatch) => {
        return apiCaller('POST', config.USER_URL , user).then( res => {
            dispatch(actAddUser(res.data, user));
        });
    }
}
//
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
        return apiCaller('PUT', config.USER_URL + id , user).then( res => {   
            if (res.data.status) {
                dispatch(actEditUser(res.data));
            }
        });
    }
}
// get infomation user
export const actGetUserRequest = id => {
    return (dispatch) => {
        return apiCaller('GET', config.USER_URL +id, null).then(res => {
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
            if (res.data.status) {
                dispatch(actLogin(res.data));
            } else {
                console.log(res.data);
                alert(res.data.msg);
            }
        });
    }
}

export const actLogout = () => {
    return {
        type: Types.LOGOUT,
    }
}

export const actLogoutRequest = () => {
    return dispatch => {
        return apiCaller('POST', config.LOGOUT_URL, null).then(res => {           
            if(res.data.status){
                dispatch(actLogout());
            } else {
                alert("logout error");
            }
        });   
    }
}