import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'
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
import {useDispatch, useSelector} from "react-redux"
import { editProduct, getProduct } from '../../JS/actions/product';
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


const EditProduct = ({match}) =>{

  const dispatch = useDispatch();
  const [product, setProduct] = useState({
  name: '',
  price:'',
  description:'',
  size:'',
  brand:'',
  shipping:'',
  type:'',
  discount:'',
  postedBy:'',
})
  const productReducer = useSelector( (state) => state.productReducer.product)
  const load = useSelector( (state) => state.productReducer.loadProducts)

useEffect(()=>{
 dispatch(getProduct(match.params.id))
 setProduct(productReducer)
}, [productReducer.name,productReducer.price,productReducer.description,productReducer.description,productReducer.brand,productReducer.shipping,productReducer.type])

const handleChange =(name)=>(event)=>{
    
  setProduct({...product,[name]:event.target.value})
}
const clickSubmit = event =>{
  if (isAuth()._id !== product.postedBy._id){
    toast.error("This is not your product")
  }else{
    toast.success("Product Updated")
    event.preventDefault()
    dispatch(editProduct(productReducer._id,product))
  }
  

}
 

    return (
        <form >
      {isAuth() ?  null : <Redirect to="/signin" />}
      

    <Grid container justify="center" >
            <Grid item xs={12} container>
            <Grid container justify='center'>
            <Grid item> {load && <Spinner/>}
              <h2>Update Your Product Information</h2>   
            </Grid>
            </Grid>
              
            </Grid>

        <Grid item xs={1} md={4} ></Grid>
        

        <Grid  item xs={10} md={4} container spacing={3}  >
        <Grid item xs={12} md={12} ><Divider  /></Grid>
            <Grid item xs={12} md={12}><h4>You can update your profile information by retyping them on the fields below</h4>  </Grid>
            <ToastContainer/>
            <Grid item xs={12} md={12} ><StyledTextField  value={product.name} onChange={handleChange('name')} id="name" label="Name your product" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={product.brand} onChange={handleChange('brand')} id="brand" label="Brand" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={6}><StyledTextField  value={product.size} onChange={handleChange('size')} id="size" label="Size" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} ><StyledTextField  value={product.description} onChange={handleChange('description')} id="description" label="Poduct Description" type="" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12} >
                <FormControl style={{width:'100%'}}>
                    <InputLabel id="demo-simple-select-label">Delivery Method</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={product.shipping}
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
                    value={product.type}
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
            <Grid item xs={6} md={6} ><StyledTextField  value={product.price} onChange={handleChange('price')} id="price" label="Price" type="price" variant="outlined" fullWidth/></Grid>
            <Grid item xs={12} md={12}><Pbutton  onclick={clickSubmit} children='Update' /></Grid>
            <Grid item xs={12} md={12}><Divider  /></Grid>
           
        </Grid>

        <Grid  item xs={1} md={4}></Grid>

        </Grid>
        </form>

    )
}


export default EditProduct