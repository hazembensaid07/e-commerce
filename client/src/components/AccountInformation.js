import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {isAuth, getcookie, signout, updateUser} from './auth/helpers'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from './button'
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


const Private = ({history})=> {

  const [values, setValues] = useState ({
    username:'',
    first_name:'',
    last_name:'',
    birth_date:'',
    phone:'',
    location:'',
    profile_description:'',
    email:'',
    password:'',
    buttonText:'Submit',
    role:'',
})

const token = getcookie('token');

useEffect(()=>{
    loadProfile()
},[])

const loadProfile =()=>{
    axios({
        method:'GET',
        url:`${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        console.log("Profile update",response)
        const {username,first_name,last_name,location,phone,birth_date,profile_description, email,role} = response.data
        setValues({...values,username,first_name,last_name,location,phone,birth_date,profile_description, email,role})
    })
    .catch(error=>{
        console.log("profile update error",error)
        
        if(error.response.status === 401 ){
            signout(()=>{
                history.push("/")
            })
        }
    })
}
const {username,first_name,last_name,location,phone,birth_date,profile_description, email,role,buttonText,password} =values

const handleChange =(name)=>(event)=>{
    
    setValues({...values,[name]:event.target.value})
}

const clickSubmit = event =>{

  event.preventDefault()
  setValues({...values, buttonText: 'Submitting'})
  axios({
        method:'PUT',
        url:`${process.env.REACT_APP_API}/user/update`,
        data:{first_name,last_name,phone,birth_date,location,profile_description,password},
        headers: {
          Authorization:`Bearer ${token}`
      }
  })
  .then(response=>{
    updateUser(response,()=>{
      //window.location.reload()
      toast.success("Profile updated Successfully")
      setValues({...values, buttonText:'Submited'})
    })

   
  })
  .catch(error=>{
  console.log('Profile update error', error.response.data)
  setValues({...values, buttonText:'Submit'})
  toast.error(error.response.data.error)
  })
}
  return (
    <form >

    <Grid container justify="center" >
            <Grid item xs={12} container justify="center">
              <Grid item><h3>Account information</h3>  </Grid>

            </Grid>

        <Grid item xs={1} md={4} ></Grid>


         <Grid  item xs={10} md={4} container spacing={3}  >
         <Grid item xs={12} md={12} ><Divider  /></Grid>
            <Grid item xs={12} md={12}><h4>Update your account information</h4>  </Grid>
            <ToastContainer/>
            <Grid item xs={12} md={6}><StyledTextField  value={first_name} onChange={handleChange('first_name')} id="name" label="First name" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={last_name} onChange={handleChange('last_name')} id="name" label="Last name" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={username} disabled id="email" label="Username" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={email} disabled id="email" label="Email adress" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><StyledTextField  value={birth_date} onChange={handleChange('birth_date')} id="name" label="Birth Date" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={location} onChange={handleChange('location')} id="name" label="location" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={phone} onChange={handleChange('phone')} id="name" label="Phone" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><StyledTextField value={profile_description}  onChange={handleChange('profile_description')} id="name" label="Profile description" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={role} disabled id="role" label="role" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><StyledTextField  value={password} onChange={handleChange('password')} id="password" label="Password" type="password" variant="outlined" fullWidth/></Grid>
            {/* <Grid item xs={12} md={12}><p>Use 8 or more characters with a mix of letters, numbers & symbols</p>  </Grid> */}
            <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children={buttonText} /></Grid>
            <Grid item xs={12} md={12}><Divider  /></Grid>
            
           
        </Grid>
        

        <Grid  item xs={1} md={4}></Grid>

        </Grid>
        </form>

  );
};

export default Private
import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {isAuth, getcookie, signout, updateUser} from './auth/helpers'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from './button'
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


const Private = ({history})=> {

  const [values, setValues] = useState ({
    name:'',
    email:'',
    password:'',
    buttonText:'Submit',
    role:'',
})

const token = getcookie('token');

useEffect(()=>{
    loadProfile()
},[])

const loadProfile =()=>{
    axios({
        method:'GET',
        url:`${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        console.log("Profile update",response)
        const {role, name, email} = response.data
        setValues({...values,role,name,email})
    })
    .catch(error=>{
        console.log("profile update error",error)
        
        if(error.response.status === 401 ){
            signout(()=>{
                history.push("/")
            })
        }
    })
}
const {name,email,password,buttonText,role} =values

const handleChange =(name)=>(event)=>{
    
    setValues({...values,[name]:event.target.value})
}

const clickSubmit = event =>{

  event.preventDefault()
  setValues({...values, buttonText: 'Submitting'})
  axios({
        method:'PUT',
        url:`${process.env.REACT_APP_API}/user/update`,
        data:{name,password},
        headers: {
          Authorization:`Bearer ${token}`
      }
  })
  .then(response=>{
    updateUser(response,()=>{
      //window.location.reload()
      toast.success("Profile updated Successfully")
      setValues({...values, buttonText:'Submited'})
    })

   
  })
  .catch(error=>{
  console.log('Profile update error', error.response.data)
  setValues({...values, buttonText:'Submit'})
  toast.error(error.response.data.error)
  })
}
  return (
    <form >

    <Grid container justify="center" >
            <Grid item xs={12} container justify="center">
              <Grid item><h3>Account information</h3>  </Grid>

            </Grid>

        <Grid item xs={1} md={4} ></Grid>


         <Grid  item xs={10} md={4} container spacing={3}  >
         <Grid item xs={12} md={12} ><Divider  /></Grid>
            <Grid item xs={12} md={12}><h4>Update your account information</h4>  </Grid>
            <ToastContainer/>
            <Grid item xs={12} md={6}><StyledTextField  value={name} onChange={handleChange('name')} id="name" label="First name" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  id="name" label="Last name" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={email} disabled id="email" label="Email adress" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={role} disabled id="role" label="role" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><StyledTextField  value={password} onChange={handleChange('password')} id="password" label="Password" type="password" variant="outlined" fullWidth/></Grid>
            {/* <Grid item xs={12} md={12}><p>Use 8 or more characters with a mix of letters, numbers & symbols</p>  </Grid> */}
            <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children={buttonText} /></Grid>
            <Grid item xs={12} md={12}><Divider  /></Grid>
            
           
        </Grid>
        

        <Grid  item xs={1} md={4}></Grid>

        </Grid>
        </form>

  );
};

export default Private
