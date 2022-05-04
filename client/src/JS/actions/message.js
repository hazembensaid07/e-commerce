import {GET_MESSAGES_FAIL, 
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_LOAD,
} from '../constants/message';
import axios from 'axios';



export const getMessages =()=> async (dispatch)=>{

    dispatch({type:GET_MESSAGES_LOAD})

    try {
        let result = await  axios.get(`http://localhost:5000/api/message/getAll/`)
        dispatch({type:GET_MESSAGES_SUCCESS,
                  payload:result.data.response})
    } catch (error) {
        dispatch({type:GET_MESSAGES_FAIL,
                  payload:error 
        })
    } 
};


export const addNewMessage = (message) => async (dispatch) =>{

    try {
        await axios.post(`http://localhost:5000/api/message/add`,message)
        dispatch(getMessages())
    } catch (error) {
        dispatch({payload:error})
    }        
};
