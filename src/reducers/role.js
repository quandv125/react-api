import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, role: null };

const role = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_ROLE:
            if (action.role.status){
                state = {
                    status: action.role.status, 
                    role: action.role.data
                }
            }
            return state;
        case Types.DELETE_ROLE:
            var index = findIndex(state.role, { id: action.id });
            if (index !== -1) {
				state.role.splice(index, 1);
            }
            state = {
                status: false,
                role: state.role
            }
            return state;
        default: 
            return state;
    }
}

export default role;