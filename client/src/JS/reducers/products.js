import {GET_PRODUCTS_FAIL, 
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_LOAD,
    GET_USER_PRODUCTS_FAIL, 
    GET_USER_PRODUCTS_SUCCESS,
    GET_USER_PRODUCTS_LOAD,
    GET_PRODUCT,
} from '../constants/products';


const initialstate={
    products:[],
    loadProducts:false,
    pages:0,
    errors:null,
    product:{},
    user:{}
}



export const productReducer=(state=initialstate,{type,payload})=>{
    
    switch (type) {
        case GET_PRODUCTS_LOAD: return{...state,loadProducts:true}
        case GET_PRODUCTS_SUCCESS:return{...state,products: payload.products,pages:payload.pages,loadProducts:false}
        case GET_PRODUCTS_FAIL:return{...state,loadProducts:false, errors : payload}

        case GET_USER_PRODUCTS_LOAD: return{...state,loadProducts:true}
        case GET_USER_PRODUCTS_SUCCESS:return{...state,products: payload, loadProducts:false}
        case GET_USER_PRODUCTS_FAIL:return{...state,loadProducts:false, errors : payload}

        case GET_PRODUCT:return{...state,product: payload,user:payload.postedBy, loadProducts:false}
        
        default: return state
    }

}