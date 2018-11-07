import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, Calling: null };

const Calling = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_CALLING:
            if (action.Calling.status){
                state = {
                    status: action.Calling.status, 
                    Calling: action.Calling.data
                }
            }
            return state;
        case Types.DELETE_CALLING:
            var index = findIndex(state.Calling, { id: action.id });
            if (index !== -1) {
				state.Calling.splice(index, 1);
            }
            state = {
                status: false,
                Calling: state.Calling
            }
            return state;
        // case Types.ADD_Calling: 
            
        //     state = { 
        //         status: action.user.status, 
        //         Calling: action.user,
        //         preUser: !action.user.status ? action.userOld : null
        //     };
        //     return state;
        // case Types.UPDATE_Calling:
 
        //     let {id} = action.user.user; 
        //     index = findIndex(state.Calling, { id: id });
        //     if (index !== -1) {
        //         state.Calling[index] = action.user.user;
        //     }
        //     state = {
        //         status: action.user.status,
        //         Calling: action.user
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

export default Calling;