import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from '../button'
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import jwt from 'jsonwebtoken'


const Activate = ({match})=> {

  const [values, setValues] = useState ({
    name:'',  
    token:'',
    show: true,
})

useEffect(()=>{
    let token = match.params.token
    let {name} = jwt.decode(token)
    console.log("TOKEN:",name)
    if(token){
        setValues({...values,name, token})
    }
},[])
const {name,token,show} =values


const clickSubmit = event =>{
  event.preventDefault()
  axios({
        method:'POST',
        url:`${process.env.REACT_APP_API}/auth/accountActivation`,
        data:{token}
  })
  .then(response=>{
    toast.success(response.data.message)
    setValues({...values,show:false})
   
  })
  .catch(error=>{
  toast.error(error.response.data.error)
  })
}
  return (
    <Grid container justify="center" >
            <Grid item xs={12}  justify="center" container>
              <Grid item><h3>ACCOUNT ACTIVATION</h3>  </Grid>
              <Grid item xs={12} md={12} ><Divider  /></Grid>
            </Grid>

        <Grid item xs={1} md={4} ></Grid>


        <Grid  item xs={10} md={4} justify="center" container spacing={3}  >
            <ToastContainer/>
            <Grid item xs={12} md={12} ><h5>Hello {name}, in order to activate your account you must click on the button below.</h5></Grid>
            <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children={"Activate"} /></Grid>
            <Grid item xs={12} md={12}><Divider  /></Grid>
           
        </Grid>
        

        <Grid  item xs={1} md={4}></Grid>

        </Grid>

  );
};

export default Activate
