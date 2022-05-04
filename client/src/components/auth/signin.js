import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from '../button'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import {authenticate, isAuth} from './helpers'
import {Link} from 'react-router-dom'
import Google from './Google'
//import Facebook from './Facebook';

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

const SLink = styled(Link)`
color:black;
`

const Signin = ({history})=> {

  const [values, setValues] = useState ({
    email:'',
    password:'',
    buttonText:'Login',
  })
  const {email,password,buttonText} =values

  const handleChange =(name)=>(event)=>{
    
    setValues({...values,[name]:event.target.value})
}

const informParent = response =>{
  authenticate(response,()=>{
    isAuth() && isAuth().role=== 'admin' ? history.push('/admin') :
    history.push('/private')
  })
}


const clickSubmit = event =>{
  event.preventDefault() 
  setValues({...values, buttonText: 'Submitting'})
  
  
  axios({
        method:'POST',
        url:`${process.env.REACT_APP_API}/auth/signin`,
        data:{email,password}
  })
  .then(response=>{

    //save the response (user,token) user in localstorage/ token in cookie
    authenticate(response,()=>{
      setValues({...values,email:'',password:'',buttonText:'Submited'})
      isAuth() && isAuth().role=== 'admin' ? history.push('/admin') :
      history.push('/private')
    })
   
  })
  .catch(error=>{
  console.log('SignIN error', error.response.data)
  setValues({...values, buttonText:'Submit'})
  toast.error(error.response.data.error)
  })
}

  return (
    <form>
      {isAuth() ? <Redirect to="/" />   : null}
      
    <Grid container >
            <ToastContainer/>
            <Grid container justify='center'>
            <Grid item  >
              <h1>Login to continue</h1>  
            </Grid>
            </Grid>
        <Grid item xs={1} md={4}></Grid>

        <Grid  item xs={10} md={4} container spacing={3} >
        <Grid item xs={12} md={12} ><Divider  /></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={email} onChange={handleChange('email')} id="email" label="Email adress" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><StyledTextField  value={password} onChange={handleChange('password')} id="password" label="Password" type="password" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><p><SLink to ="/forgot-password">Forgot you password?</SLink></p>  </Grid>
            <Grid item xs={12} md={12}><Pbutton black="true" onclick={clickSubmit} children={buttonText} /></Grid>
            <Grid container xs={12} md={12} justify='center' >
            <Grid item ><Google informParent={informParent}/></Grid>
            </Grid>
            
            {/* <Grid item xs={12} md={12}><Facebook  informParent={informParent}/></Grid> */}
            <Grid item xs={12} md={12}><Divider  /></Grid>
            <Grid item xs={12} md={12}><Pbutton children={"SignUP"} link={"/signup"} /></Grid>
        </Grid>
        

        <Grid  item xs={1} md={4}></Grid>
      
        </Grid>
        </form>

  );
};

export default Signin

        // /* <Grid Style="border:2px solid black;" item xs={10} md={4} container spacing={3} >
        // <Grid item md={12}><StyledTextField  id="email" label="Email adress" type="" variant="outlined" fullWidth/></Grid>
        // <Grid item md={12}><StyledTextField  id="" label="Password" type="" variant="outlined" fullWidth/></Grid>