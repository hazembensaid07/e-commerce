import React, {useState} from 'react';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from '../button'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

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


const ForgotPassword = ({history})=> {

  const [values, setValues] = useState ({
    email:'',
    buttonText:'Send Email',
  })
  const {email,buttonText} =values

  const handleChange =(name)=>(event)=>{
    
    setValues({...values,[name]:event.target.value})
}


const clickSubmit = event =>{
  event.preventDefault() 
  setValues({...values, buttonText: 'Submitting'})
  
  
  axios({
        method:'PUT',
        url:`${process.env.REACT_APP_API}/auth/forgot-password`,
        data:{email}
  })
  .then(response=>{
    console.log('this',response)
    setValues({...values, buttonText: 'Submitted'})
    toast.success(response.data.message)
  })
  .catch(error=>{
  console.log('ForgotPassword error', error.response.data)
  setValues({...values, buttonText:'Submit'})
  toast.error(error.response.data.error)
  })
}

  return (
    <Grid container justify="center" >
    <Grid item xs={12}  justify="center" container>
      <Grid item><h3>PASSWORD RESET REQUEST</h3>  </Grid>    
    </Grid>
    
    <Grid item xs={1} md={4} ></Grid>
    
    
    <Grid  item xs={10} md={4} justify="center" container spacing={3}  >
    <Grid item xs={12} md={12} ><Divider  /></Grid>
    <ToastContainer/>
    <Grid item xs={12} md={12} ><h5 >In order to reset your password you must verify a link that will be sent to your email.</h5></Grid>
    <Grid item xs={12} md={12}><StyledTextField onChange={handleChange('email')} id="email" label="Email" type="" variant="outlined" fullWidth/></Grid>
    <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children={buttonText} /></Grid>
    <Grid item xs={12} md={12}><Divider  /></Grid>
    <Grid item xs={12} md={12}><Pbutton black="true" link="/signin" children={"Try to Signin"} /></Grid>
    
    </Grid>
    
    
    <Grid  item xs={1} md={4}></Grid>
    
    </Grid>

  );
};

export default ForgotPassword

