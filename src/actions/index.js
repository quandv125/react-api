import * as Types from './../constants/ActionType';
import * as config from './../constants/config';
import apiCaller from './../utils/apiCaller';

// Product
export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return apiCaller('GET',  config.PRODUCT_URL  , null).then( res => {
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

// Delete Product    
export const actDeleteProductRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.PRODUCT_URL  + "/" + id , null).then( res => {
            // console.log(res);
			dispatch(actDeleteProduct(id));
		}); 
    }
}

export const actDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCTS,
        id
    }
}
//
// category
export const actFetchCategoryRequest = () => {
    return (dispatch) => {
        return apiCaller('GET',  config.CATEGORY_URL  , null).then( res => {
            if(res){
                dispatch(actFetchCategory(res.data));
            }
        });
    }
}

export const actFetchCategory = (category) => {
    return {
        type: Types.FETCH_CATEGORY,
        category
    }
}

// Delete Category    
export const actDeleteCategoryRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.CATEGORY_URL  + "/" + id , null).then( res => {
			dispatch(actDeleteCategory(id));
		}); 
    }
}

export const actDeleteCategory = (id) => {
    return {
        type: Types.DELETE_CATEGORY,
        id
    }
}
///////

// SERVICE
export const actFetchServiceRequest = () => {
    return (dispatch) => {
        return apiCaller('GET',  config.SERVICE_URL  , null).then( res => {
            if(res){
                dispatch(actFetchService(res.data));
            }
        });
    }
}

export const actFetchService = (service) => {
    return {
        type: Types.FETCH_SERVICE,
        service
    }
}

// Delete Category    
export const actDeleteServiceRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.SERVICE_URL  + "/" + id , null).then( res => {
			dispatch(actDeleteService(id));
		}); 
    }
}

export const actDeleteService = (id) => {
    return {
        type: Types.DELETE_SERVICE,
        id
    }
}
//
// Order
export const actFetchOrdersRequest = () => {
    return (dispatch) => {
        return apiCaller('GET',  config.ORDER_URL  , null).then( res => {
            if(res){
                dispatch(actFetchOrders(res.data));
            }
        });
    }
}

export const actFetchOrders = (orders) => {
    return {
        type: Types.FETCH_ORDERS,
        orders
    }
}

// Delete Order    
export const actDeleteOrderRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.ORDER_URL  + "/" + id , null).then( res => {
            // console.log(res);
			dispatch(actDeleteOrder(id));
		}); 
    }
}

export const actDeleteOrder = (id) => {
    return {
        type: Types.DELETE_ORDERS,
        id
    }
}

// Role
export const actFetchRoleRequest = () => {
    return (dispatch) => {
        return apiCaller('GET',  config.ROLE_URL  , null).then( res => {
            if(res){
                dispatch(actFetchRole(res.data));
            }
        });
    }
}

export const actFetchRole = (role) => {
    return {
        type: Types.FETCH_ROLE,
        role
    }
}

// Delete Role    
export const actDeleteRoleRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.ROLE_URL  + "/" + id , null).then( res => {
			dispatch(actDeleteRole(id));
		}); 
    }
}

export const actDeleteRole = (id) => {
    return {
        type: Types.DELETE_ROLE,
        id
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
        return apiCaller('DELETE', config.USER_URL  + "/" + id , null).then( res => {
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
        return apiCaller('PUT', config.USER_URL  + "/" + id , user).then( res => {   
            if (res.data.status) {
                dispatch(actEditUser(res.data));
            }
        });
    }
}
// get infomation user
export const actGetUserRequest = id => {
    return (dispatch) => {
        return apiCaller('GET', config.USER_URL  + "/" + id, null).then(res => {
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


// customers
export const actFetchCustomersRequest = () => {
    return (dispatch) => {
        return apiCaller('GET', config.CUSTOMER_URL  , null).then( res => {     
            if(res){     
                dispatch(actFetchCustomers(res.data));
            }
           
		});
    }
}

export const actFetchCustomers = (customers) => {
    return {
        type: Types.FETCH_CUSTOMERS,
        customers
    }
}
// Delete customer    
export const actDeleteCustomerRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.CUSTOMER_URL  + "/" + id , null).then( res => {
			dispatch(actDeleteCustomer(id));
		}); 
    }
}

export const actDeleteCustomer = (id) => {
    return {
        type: Types.DELETE_CUSTOMERS,
        id
    }
}

// Calling
export const actFetchCallingRequest = () => {
    return (dispatch) => {
        return apiCaller('GET', config.CRMWORLDFONE_URL  , null).then( res => {     
            if(res){     
                dispatch(actFetchCalling(res.data));
            }
		});
    }
}

export const actFetchCalling = (Calling) => {
    return {
        type: Types.FETCH_CALLING,
        Calling
    }
}
// Delete Calling    
export const actDeleteCallingRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.CRMWORLDFONE_URL  + "/" + id , null).then( res => {
			dispatch(actDeleteCalling(id));
		}); 
    }
}

export const actDeleteCalling = (id) => {
    return {
        type: Types.DELETE_CALLING,
        id
    }
}

// SMS
export const actFetchSmsRequest = () => {
    return (dispatch) => {
        return apiCaller('GET', config.SMS_URL  , null).then( res => {     
            if(res){     
                dispatch(actFetchSms(res.data));
            }
		});
    }
}

export const actFetchSms = (sms) => {
    return {
        type: Types.FETCH_SMS,
        sms
    }
}
// Delete SMS    
export const actDeleteSmsRequest = (id) => {
    return (dispatch) => {
        return apiCaller('DELETE', config.SMS_URL  + "/" + id , null).then( res => {
			dispatch(actDeleteSms(id));
		}); 
    }
}

export const actDeleteSms = (id) => {
    return {
        type: Types.DELETE_SMS,
        id
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
            console.log(res);
            dispatch(actLogin(res.data));
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
            // console.log(res);   
            dispatch(actLogout());
        });   
    }
}