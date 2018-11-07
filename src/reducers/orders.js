import * as Types from '../constants/ActionType';
import {findIndex} from 'lodash';
var initialState = { status: null, orders: null , order_by_date: null};

const orders = (state = initialState, action) => {
   
    switch(action.type){
        case Types.FETCH_ORDERS:
            if (action.orders.status){
                state = {
                    status: action.orders.status, 
                    orders: action.orders.data,
                    order_by_date: action.orders.order_by_date
                }
            }
            return state;
        case Types.DELETE_ORDERS:
            var index = findIndex(state.orders, { id: action.id });
            if (index !== -1) {
				state.orders.splice(index, 1);
            }
            state = {
                status: false,
                orders: state.orders
            }
            return state;
        default: 
            return state;
    }
}

export default orders;