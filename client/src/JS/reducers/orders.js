import {GET_ORDERS_FAIL, 
    GET_ORDERS_SUCCESS,
    GET_ORDERS_LOAD,
} from '../constants/orders';


const initialstate={
    orders:[],
    loadOrders:false,
    errors:null,
    product:{},
    user:{}
}



export const orderReducer=(state=initialstate,{type,payload})=>{
    
    switch (type) {

        case GET_ORDERS_LOAD: return{...state,loadProducts:true}
        case GET_ORDERS_SUCCESS:return{...state,orders: payload, loadProducts:false}
        case GET_ORDERS_FAIL:return{...state,loadProducts:false, errors : payload}
        
        default: return state
    }

}