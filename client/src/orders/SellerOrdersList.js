import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { isAuth } from '../components/auth/helpers';
import Spinner from '../components/Spinner';
import { getSellerOrders } from "../JS/actions/order"
import SellerOrder from "./SellerOrder"


const SellerOrdersList = () =>{
  const dispatch = useDispatch()

  const orders = useSelector(state=>state.orderReducer.orders)

  const loadOrders = useSelector(state=>state.orderReducer.loadOrders)

  useEffect(()=>{
      dispatch(getSellerOrders(isAuth()._id))
  },[])

  return (
    <div >
      {loadOrders ? 
            <Spinner/>
        :   ( 
          orders.map(el=> <SellerOrder key={el._id} order={el}/>)
            
        ) }
  
    </div>
  );
}

export default SellerOrdersList;