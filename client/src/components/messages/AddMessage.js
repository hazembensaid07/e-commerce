import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { Grid } from '@material-ui/core'
import { addNewMessage , getMessages } from '../../JS/actions/message'
import Message from './Message';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Pbutton from '../button'
import { isAuth } from '../auth/helpers';
import Spinner from '../Spinner';

const StyledTextField  = styled(TextField)`
.MuiFormLabel-root.Mui-focused{
  color : black;
  
}
.MuiOutlinedInput-root {
  fieldset {
    border-color: black; 
  }
  &.Mui-focused fieldset {
    border-color: black;
  }
  border-radius: 0px;
  
`;



const AddMessage = () => {

    const [message, setValues] = useState ({
        user:isAuth()._id,
        message:'',
        
    })
    const dispatch = useDispatch()
    const messages = useSelector(state=>state.messageReducer.messages)
    const loadMessages = useSelector(state=>state.messageReducer.loadMessages)
    useEffect(()=>{
        
    },[messages.length])

    const handleChange =(name)=>(event)=>{
    
        setValues({...message,[name]:event.target.value})
    }


    const clickSubmit = event =>{
        dispatch(addNewMessage(message))
    }

return(

    <Grid container spacing={6}>
        {loadMessages && 
        <Spinner/> }
    <Grid item xs={6} md={6}><StyledTextField onChange={handleChange('message')} id="message" label="Message" type="" variant="outlined" fullWidth/></Grid>  
    <Grid item xs={6} md={6}><Pbutton onclick={clickSubmit} children={"Add new message"} link={"/chat"} /></Grid>  
    
    </Grid>

)}

export default AddMessage