import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, customers: null };

const customers = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_CUSTOMERS:
            if (action.customers.status){
                state = {
                    status: action.customers.status, 
                    customers: action.customers.data
                }
            }
            return state;
        case Types.DELETE_CUSTOMERS:
            var index = findIndex(state.customers, { id: action.id });
            if (index !== -1) {
				state.customers.splice(index, 1);
            }
            state = {
                status: false,
                customers: state.customers
            }
            return state;
        // case Types.ADD_customers: 
            
        //     state = { 
        //         status: action.user.status, 
        //         customers: action.user,
        //         preUser: !action.user.status ? action.userOld : null
        //     };
        //     return state;
        // case Types.UPDATE_customers:
 
        //     let {id} = action.user.user; 
        //     index = findIndex(state.customers, { id: id });
        //     if (index !== -1) {
        //         state.customers[index] = action.user.user;
        //     }
        //     state = {
        //         status: action.user.status,
        //         customers: action.user
        //     }
        //     return state;
        // case Types.GET_USER: 
        //     if (action.user){
        //         state = {
        //             userEdit: action.user
        //         }
        //     }
        //     return state;
        default: 
            return state;
    }
}

export default customers;