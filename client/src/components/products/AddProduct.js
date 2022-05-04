import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from '../button'
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import { isAuth } from '../auth/helpers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const AddProduct = () =>{
    
  const [values, setValues] = useState ({
    name:'',
    price:'',
    description:'',
    size:'',
    brand:'',
    shipping:'',
    type:'',
    discount:'',
    postedBy:(isAuth()._id),
    imgSrc:'',
    buttonText:'Add',
})
const {name,price,description,size,brand,type,shipping,imgSrc,postedBy,buttonText} =values

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

  formData.append('name',name)
  formData.append('price',price)
  formData.append('size',size)
  formData.append('brand',brand)
  formData.append('type',type)
  formData.append('shipping',shipping)
  formData.append('postedBy',postedBy)
  formData.append('imgSrc',imgSrc)

  
  
console.log(postedBy)
  axios({
        method:'POST',
        url:`${process.env.REACT_APP_API}/product/add`,
        data:formData

  })
  .then(response=>{
    toast.success("Product added")
    setValues({...values, name:'',size:'',brand:'',size:'',brand:'',type:'',shipping:'',buttonText:'Submited',})
   
  })
  .catch(error=>{
  console.log('Adding product error', error.response.data)
  setValues({...values, buttonText:'Submit'})
  toast.error(error.response.data.error)
  })
}
    return (
        <form >
      {!isAuth() ? <Redirect to="/signin" /> : null}
    <Grid container justify="center" >
            <Grid item xs={12} container>
            <Grid container justify='center'>
            <Grid item  >
              <h2>Add New Product</h2>  
            </Grid>
            </Grid>
              
            </Grid>

        <Grid item xs={1} md={4} ></Grid>
        

        <Grid  item xs={10} md={4} container spacing={3}  >
        <Grid item xs={12} md={12} ><Divider  /></Grid>
            <Grid item xs={12} md={12}><h4>You need to provide us with some details of your product</h4>  </Grid>
            <ToastContainer/>
            <Grid item xs={6} md={6}>Upload picture of your Vintage :  </Grid>
            <Grid item xs={6} md={6}><div>
              <input type='file' onChange={fileSelectHandler}></input>
              </div></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={name} onChange={handleChange('name')} id="name" label="Name your product" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={brand} onChange={handleChange('brand')} id="brand" label="Brand" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={size} onChange={handleChange('size')} id="size" label="Size" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={description} onChange={handleChange('description')} id="description" label="Poduct Description" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} >
                <FormControl style={{width:'100%'}}>
                    <InputLabel id="demo-simple-select-label">Delivery Method</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={shipping}
                    onChange={handleChange('shipping')}
                    >
                    <MenuItem value={'Aramex delivery'}>Aramex delivery</MenuItem>
                    <MenuItem value={'Post office'}>Post office</MenuItem>
                    <MenuItem value={'Hand to hand'}>Hand to hand</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6} md={6} >
                <FormControl style={{width:'100%'}}>
                    <InputLabel id="demo-simple-select-label">What are you selling</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    onChange={handleChange('type')}
                    >
                    <MenuItem value={'Shirt'}>Shirt</MenuItem>
                    <MenuItem value={'Pant'}>Pant</MenuItem>
                    <MenuItem value={'Shoes'}>Shoes</MenuItem>
                    <MenuItem value={'Hat'}>Hat</MenuItem>
                    <MenuItem value={'Glasses'}>Glasses</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={6} ><StyledTextField  value={price} onChange={handleChange('price')} id="price" label="Price" type="price" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children={buttonText} /></Grid>
            <Grid item xs={12} md={12}><Divider  /></Grid>
           
        </Grid>

        <Grid  item xs={1} md={4}></Grid>

        </Grid>
        </form>

    )
}


export default AddProduct