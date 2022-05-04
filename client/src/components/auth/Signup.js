import React, {useState} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {isAuth} from './helpers'
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


const Signup = ()=> {

  const [values, setValues] = useState ({
    username:'',
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    imgSrc:'',
    buttonText:'Submit',
})
const {username,email,first_name,last_name,imgSrc,password,buttonText} =values

const handleChange =(name)=>(event)=>{
    
    setValues({...values,[name]:event.target.value})
}
const fileSelectHandler = event =>{

  setValues({...values, imgSrc:event.target.files[0]})
  console.log("here",imgSrc)
}
const clickSubmit = event =>{

  event.preventDefault()
  setValues({...values, buttonText: 'Submitting'})
  const formData = new FormData();
  formData.append('imgSrc',imgSrc)
  formData.append('username',username)
  formData.append('email',email)
  formData.append('first_name',first_name)
  formData.append('last_name',last_name)
  formData.append('password',password)
  

  axios({
        method:'POST',
        url:`${process.env.REACT_APP_API}/auth/signup`,
        data:formData

  })
  .then(response=>{
    toast.success("Check your email to finish your Signup")
    setValues({...values, username:'',first_name:'',last_name:'',email:'',password:'',buttonText:'Submited',imgSrc:''})
   
  })
  .catch(error=>{
  console.log('Signup error', error.response.data)
  setValues({...values, buttonText:'Submit'})
  toast.error(error.response.data.error)
  })
}
  return (
    <form >
      {isAuth() ? <Redirect to="/" /> : null}
    <Grid container justify="center" >
            <Grid item xs={12} container>
            <Grid container justify='center'>
            <Grid item  >
              <h2>Join Noova Community</h2>  
            </Grid>
            </Grid>
              
            </Grid>

        <Grid item xs={1} md={4} ></Grid>
        

        <Grid  item xs={10} md={4} container spacing={3}  >
        <Grid item xs={12} md={12} ><Divider  /></Grid>
            <Grid item xs={12} md={12}><h4>Create your Account to continue to Noova</h4>  </Grid>
            <ToastContainer/>
            <Grid item xs={12} md={12} ><StyledTextField  value={username} onChange={handleChange('username')} id="username" label="Username" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={first_name} onChange={handleChange('first_name')} id="first_name" label="First name" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={last_name} onChange={handleChange('last_name')} id="last_name" label="Last name" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={email} onChange={handleChange('email')} id="email" label="Email adress" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><StyledTextField  value={password} onChange={handleChange('password')} id="password" label="Password" type="password" variant="outlined" fullWidth/></Grid>
            <Grid item xs={6} md={6}>Upload your porifle picture :</Grid>
            <Grid item xs={6} md={6}><div>
              <input type='file' onChange={fileSelectHandler}></input>
              </div></Grid>
            {/* <Grid item xs={12} md={12}><p>Use 8 or more characters with a mix of letters, numbers & symbols</p>  </Grid> */}
            <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children={buttonText} /></Grid>
            <Grid item xs={12} md={12}><Divider  /></Grid>
            <Grid item xs={12} md={12}><Pbutton  black="true" children="Login"  link={"/signin"}/></Grid>
           
        </Grid>
        

        <Grid  item xs={1} md={4}></Grid>

        </Grid>
        </form>

  );
};

export default Signup
