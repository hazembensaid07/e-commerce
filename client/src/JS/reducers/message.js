import {GET_MESSAGES_FAIL, 
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_LOAD,
} from '../constants/message';

const initialstate={
    messages:[],
    loadMessages:false,
    errors:null,
    product:{},
    user:{}
}


export const messageReducer=(state=initialstate,{type,payload})=>{
    
    switch (type) {

        case GET_MESSAGES_LOAD: return{...state,loadMessages:true}
        case GET_MESSAGES_SUCCESS:return{...state,messages: payload, loadMessages:false}
        case GET_MESSAGES_FAIL:return{...state,loadMessages:false, errors : payload}
        
        default: return state
    }

}