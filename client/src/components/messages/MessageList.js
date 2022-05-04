import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { Grid } from '@material-ui/core'
import { getMessages } from '../../JS/actions/message'
import Message from './Message';
import Spinner from '../Spinner';



const MessageList = () => {
    const dispatch = useDispatch()
    const messages = useSelector(state=>state.messageReducer.messages)
    const loadMessages = useSelector(state=>state.messageReducer.loadMessages)
    useEffect(()=>{
        dispatch(getMessages())
    },[messages.length])

return(

    <div>  {loadMessages && 
        <Spinner/> }
                    { messages.length !== 0 && 
            messages.map(el=> <Message key={el._id} message={el}/> )}
    </div>

)}

export default MessageList