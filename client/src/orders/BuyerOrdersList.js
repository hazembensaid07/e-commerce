import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { isAuth } from '../components/auth/helpers';
import Spinner from '../components/Spinner';
import { getBuyerOrders } from "../JS/actions/order"
import BuyerOrder from "./BuyerOrder"


const BuyerOrdersList = () =>{
  const dispatch = useDispatch()

  const orders = useSelector(state=>state.orderReducer.orders)

  const loadOrders = useSelector(state=>state.orderReducer.loadOrders)

  useEffect(()=>{
      dispatch(getBuyerOrders(isAuth()._id))
  },[])

  return (
    <div >
      {loadOrders ? 
            <Spinner/>
        :   ( 
          orders.map(el=> <BuyerOrder key={el._id} order={el}/>)
            
        ) }
  
    </div>
  );
}

export default BuyerOrdersList;