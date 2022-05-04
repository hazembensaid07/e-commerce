import {GET_ORDERS_FAIL, 
    GET_ORDERS_SUCCESS,
    GET_ORDERS_LOAD,
} from '../constants/orders';
import axios from 'axios';


export const getBuyerOrders =(id)=> async (dispatch)=>{

    dispatch({type:GET_ORDERS_LOAD})

    try {
        let result = await  axios.get(`http://localhost:5000/api/order/buyer/${id}`)
        dispatch({type:GET_ORDERS_SUCCESS,
                  payload:result.data.response})
    } catch (error) {
        dispatch({type:GET_ORDERS_FAIL,
                  payload:error 
        })
    } 
};


export const getSellerOrders =(id)=> async (dispatch)=>{

    dispatch({type:GET_ORDERS_LOAD})

    try {
        let result = await  axios.get(`http://localhost:5000/api/order/seller/${id}`)
        dispatch({type:GET_ORDERS_SUCCESS,
                  payload:result.data.response})
    } catch (error) {
        dispatch({type:GET_ORDERS_FAIL,
                  payload:error 
        })
    } 
};

export const addOrder = (order) => async (dispatch) =>{

    try {
        await axios.post(`http://localhost:5000/api/order/add`,order)
        
    } catch (error) {
        dispatch({payload:error})
    }        
};


export const editOrder =(id,order)=> async (dispatch)=>{
    try {
       await axios.put(`http://localhost:5000/api/order/update/${id}`,order)
    } catch (error) {
        dispatch({
                  payload:error 
        })
    } 
};


export const deleteOrder =(id,sellerID)=> async (dispatch)=>{
        
    try {
       await axios.delete(`http://localhost:5000/api/order/delete/${id}`)
       dispatch(getSellerOrders(sellerID))
    } catch (error) {
        dispatch({
                  payload:error 
        })
    } 
};