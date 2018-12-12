import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, billing: null };

const billing = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_BILLING:
            if (action.billing.status){
                state = {
                    status: action.billing.status, 
                    billing: action.billing.data
                }
            }
            return state;
        case Types.DELETE_BILLING:
            var index = findIndex(state.billing, { id: action.id });
            if (index !== -1) {
				state.billing.splice(index, 1);
            }
            state = {
                status: false,
                billing: state.billing
            }
            return state;
        default: 
            return state;
    }
}

export default billing;