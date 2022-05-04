import {GET_PRODUCTS_FAIL, 
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_LOAD,
    GET_USER_PRODUCTS_FAIL, 
    GET_USER_PRODUCTS_SUCCESS,
    GET_USER_PRODUCTS_LOAD,
    GET_PRODUCT,
} from '../constants/products';
import axios from 'axios';


export const getProductsRefresh =()=> async (dispatch)=>{
    dispatch({type:GET_PRODUCTS_LOAD})
    try {
        const result = await  axios.get("http://localhost:5000/api/product/products")

        dispatch({type:GET_PRODUCTS_SUCCESS,
                  payload:{products:result.data.response, pages:0}
                })
    } catch (error) {
        dispatch({type:GET_PRODUCTS_FAIL,
                  payload:error 
        })
    } 
};

export const getProducts = (name, pageNumber) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_LOAD });
  try {   
    const result = await axios.get(
      `http://localhost:5000/api/product/productsCategorey?search=${name}&page=${pageNumber}`
    );

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: {  products:result.data.result, pages:result.data.totalPages },
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error,
    });
    console.log(error);
  }
};

export const getUserProducts =(username)=> async (dispatch)=>{
    dispatch({type:GET_USER_PRODUCTS_LOAD})

    try {
        let result = await  axios.get(`http://localhost:5000/api/product/get/userPosts/${username}`)
        
        dispatch({type:GET_USER_PRODUCTS_SUCCESS,
                  payload:result.data.response})
    } catch (error) {
        dispatch({type:GET_USER_PRODUCTS_FAIL,
                  payload:error 
        })
    } 
};




export const getProduct =(id)=> async (dispatch)=>{
    dispatch({type:GET_PRODUCTS_LOAD})
    try {
       const result = await axios.get(`http://localhost:5000/api/product/${id}`)

       dispatch({type:GET_PRODUCT,payload: result.data.response})
    } catch (error) {
        dispatch({type:GET_PRODUCTS_FAIL,
                  payload:error 
        })
    } 
};



export const editProduct =(id,product)=> async (dispatch)=>{
    dispatch({type:GET_PRODUCTS_LOAD})  
    try {
       await axios.put(`http://localhost:5000/api/product/update/${id}`,product)
       dispatch(getProduct(id))
    } catch (error) {
        dispatch({type:GET_PRODUCTS_FAIL,
                  payload:error 
        })
    } 
};

export const deleteProduct =(id)=> async (dispatch)=>{
  dispatch({type:GET_PRODUCTS_LOAD})  
  try {
   await axios.delete(`http://localhost:5000/api/product/delete/${id}`)
     dispatch(getProduct(id))
  } catch (error) {
      dispatch({
                payload:error 
      })
  } 
};

// export const deleteProduct = (id) => dispatch =>{
//     axios.delete(`http://localhost:5000/api/product/delete/${id}`)
//             .then((res)=>dispatch(getProducts()))
//             .catch((err)=> console.log(err))
// };



