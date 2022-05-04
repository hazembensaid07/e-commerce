import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import Pbutton from '../button'
import Grid from '@material-ui/core/Grid';
import { Avatar,  CardHeader, Divider, Typography } from '@material-ui/core';
import { isAuth } from '../auth/helpers';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux"
import { getProduct } from '../../JS/actions/product';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const SLink = styled(Link)`
color:black;
text-decoration: none
`

const useStyles = makeStyles((theme) => ({
    Grid: {
      textAlign: 'center'
    },
    media: {
      height: '300px',
      width:'65%'
      
    },
    text:{
      textAlign: 'left'
    }
  }));


const ProductDetails = ({match}) =>{

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
  imgSrc:'',
  createdAt:'',
})


  const [user, setUser] = useState({
  username: '',
  imgSrc:'',})


  const productReducer = useSelector( (state) => state.productReducer.product)
  const userReducer = useSelector( (state) => state.productReducer.user)
  const load = useSelector( (state) => state.productReducer.loadProducts)

useEffect(  ()=>{
  
 dispatch(getProduct(match.params.id))
 setProduct(productReducer)
 setUser(userReducer)

}, [productReducer.name,productReducer.price,productReducer.description,productReducer.description,productReducer.brand,productReducer.shipping,productReducer.type,productReducer.createdAt,userReducer._id])

const classes = useStyles();
const buttonVlidation = ()=>{
  if (user._id === isAuth()._id){ 
  return(
    <Pbutton children='Edit Your Product' black="true" link={`/EditProduct/${product._id}`} />
    
     )}
 else if (product.active === true) {
    return(
      <Pbutton children='Buy Now' black="true" link={`/newOrder/${product._id}`} />
      )
  }else{
    return(
      
      <Typography style={{marginLeft:'auto'}} variant="h4" color='error'>
            Sold Out
          </Typography>
     )
  }
}   
    return (
      
        <Grid container className={classes.Grid}>
          {isAuth() ?  null : <Redirect to="/signin" />}
            <Grid item xs={1} md={1}></Grid>
            <Grid item xs={10} md={10} container justify='center'>

            <Grid item md={12}>{load && <Spinner/>}<h2>{`${product.name} Details`}</h2></Grid>
            <Grid item xs={10} md={6}>  <img   className={classes.media}  alt='' src={`http://localhost:5000/${productReducer.imgSrc}`} /> </Grid>
            <Grid item xs={10} md={6} container >
                <Grid item xs={12} md={12} ><CardHeader className={classes.text}
                avatar = { <Avatar alt="Remy Sharp" src={`http://localhost:5000/${user.imgSrc}`} />}
                title= { <SLink to={`/profile/${user.username}`}>{user.username}</SLink>}
                subheader={product.createdAt}
                /></Grid>

              <Grid item xs={12} md={2} ></Grid>
              <Grid item xs={12} md={8}><Divider /> </Grid>
              <Grid item xs={12} md={2} ></Grid>
              
              <Grid item xs={12} md={12} ><p>{product.description}</p></Grid>
              
              <Grid item xs={12} md={2} ></Grid>
              <Grid item xs={12} md={8}><Divider /> </Grid>
              <Grid item xs={12} md={2} ></Grid>

              <Grid item  xs={4} md={4}>Brand</Grid>
              <Grid item  xs={4} md={4}>Size</Grid>
              <Grid item  xs={4} md={4}>Delivery Method</Grid>

              <Grid item  xs={4} md={4}>{product.brand} </Grid>
              <Grid item  xs={4} md={4}>{product.size}</Grid>
              <Grid item  xs={4} md={4}>{product.shipping}</Grid>

              <Grid item xs={12} md={2} ></Grid>
              <Grid item xs={12} md={8} style={{marginTop:'30px'}}><Divider /> </Grid>
              <Grid item xs={12} md={2} ></Grid>

              <Grid item  xs={4} md={4}></Grid>
              <Grid item  xs={4} md={4}>Price</Grid>
              <Grid item  xs={4} md={4}></Grid>

              <Grid item  xs={4} md={4}> </Grid>
              <Grid item  xs={4} md={4}>{`${product.price} $`}</Grid>
              <Grid item  xs={4} md={4}></Grid>

              <Grid item  xs={4} md={2}> </Grid>
              <Grid item  xs={4} md={8}  style={{marginTop:'30px'}}>{buttonVlidation()}</Grid>
              <Grid item  xs={4} md={2}></Grid>
              
              </Grid>
              

            </Grid>
            <Grid item xs={1} md={1}></Grid>
        </Grid>

    )
}


export default ProductDetails

