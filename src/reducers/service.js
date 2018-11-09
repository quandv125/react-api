import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, service: null };

const service = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_SERVICE:
            if (action.service.status){
                state = {
                    status: action.service.status, 
                    service: action.service.data
                }
            }
            return state;
        case Types.DELETE_SERVICE:
            var index = findIndex(state.service, { id: action.id });
            if (index !== -1) {
				state.service.splice(index, 1);
            }
            state = {
                status: false,
                service: state.service
            }
            return state;
        default: 
            return state;
    }
}

export default service;