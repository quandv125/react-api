import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, sms: null, info: null };

const sms = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_SMS:
            if (action.sms.status){
                state = {
                    status: action.sms.status, 
                    sms: action.sms.data,
                    info: action.sms.info
                }
            }
            return state;
        case Types.DELETE_SMS:
            var index = findIndex(state.sms, { id: action.id });
            if (index !== -1) {
				state.sms.splice(index, 1);
            }
            state = {
                status: false,
                sms: state.sms
            }
            return state;
        // case Types.ADD_SMS: 
            
        //     state = { 
        //         status: action.user.status, 
        //         sms: action.user,
        //         preUser: !action.user.status ? action.userOld : null
        //     };
        //     return state;
        // case Types.UPDATE_SMS:
 
        //     let {id} = action.user.user; 
        //     index = findIndex(state.sms, { id: id });
        //     if (index !== -1) {
        //         state.sms[index] = action.user.user;
        //     }
        //     state = {
        //         status: action.user.status,
        //         sms: action.user
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

export default sms;