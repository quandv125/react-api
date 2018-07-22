import * as Types from './../constants/ActionType';
// import {findIndex} from 'lodash';
var initialState = { status: null, products: null };

const products = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_PRODUCTS:
            if (action.products.status){
                state = {
                    status: action.products.status, 
                    products: action.products.data
                }
            }
            return state;
        
        default: 
            return state;
    }
}

export default products;