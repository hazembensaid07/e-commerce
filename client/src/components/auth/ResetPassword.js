import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from '../button'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import jwt from 'jsonwebtoken'

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


const ResetPassword = ({match})=> {

  const [values, setValues] = useState ({
    name:'',
    token:'',
    newPassword:'',
    buttonText:'Change password',
  })

  useEffect(()=>{
    let token = match.params.token
    let {name} = jwt.decode(token)

    if(token){
      setValues({...values,name,token})
    }
  },[])


  const {name,token,newPassword,buttonText} =values

  const handleChange =(event)=>{
    
    setValues({...values, newPassword:event.target.value})
}


const clickSubmit = event =>{
  event.preventDefault() 
  setValues({...values, buttonText: 'Submitting'})
  
  
  axios({
        method:'PUT',
        url:`${process.env.REACT_APP_API}/auth/reset-password`,
        data:{newPassword, resetPasswordLink:token}
  })
  .then(response=>{
    console.log('this',response)
    setValues({...values, buttonText: 'Password Changed'})
    toast.success(response.data.message)
  })
  .catch(error=>{
  console.log('reset Password error', error.response.data)
  setValues({...values, buttonText:'Submit'})
  toast.error(error.response.data.error)
  })
}

  return (
    <Grid container justify="center" >
    <Grid item xs={12}  justify="center" container>
      <Grid item><h3>PASSWORD RESET</h3>  </Grid>
      
    </Grid>
    
    <Grid item xs={1} md={4} ></Grid>
    
    <Grid  item xs={10} md={4} justify="center" container spacing={3}  >
    <Grid item xs={12} md={12} ><Divider  /></Grid>
    <ToastContainer/>
    <Grid item xs={12} md={12} ><h5 >Welcome {name}, you can change your password by typing new one below</h5></Grid>
    <Grid item xs={12} md={12}><StyledTextField onChange={handleChange} id="password" label="Password" type="" variant="outlined" fullWidth/></Grid>
    <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children={buttonText} /></Grid>
    <Grid item xs={12} md={12}><Divider  /></Grid>
    <Grid item xs={12} md={12}><Pbutton black="true" link="/signin" children={"Try to Signin"} /></Grid>
    
    </Grid>
    
    
    <Grid  item xs={1} md={4}></Grid>
    
    </Grid>

  );
};

export default ResetPassword

