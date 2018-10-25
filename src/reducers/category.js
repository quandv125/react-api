import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, category: null };

const category = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_CATEGORY:
            if (action.category.status){
                state = {
                    status: action.category.status, 
                    category: action.category.data
                }
            }
            return state;
        case Types.DELETE_CATEGORY:
            var index = findIndex(state.category, { id: action.id });
            if (index !== -1) {
				state.category.splice(index, 1);
            }
            state = {
                status: false,
                category: state.category
            }
            return state;
        default: 
            return state;
    }
}

export default category;