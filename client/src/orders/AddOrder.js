import { CardHeader, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {red} from '@material-ui/core/colors';
import { editProduct, getProduct } from '../JS/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import Pbutton from '../components/button';
import { isAuth } from '../components/auth/helpers';
import { addOrder } from '../JS/actions/order';

const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
      height:10,
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  media: {
    height: '10rem',
    width:  '10rem'
  },
  avatar: {
    backgroundColor: red[500],
  },
  text:{
    textAlign: 'left'
  }
}));

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
text-decoration: none
`
const AddOrder = ({match}) =>{
    const [order, setValues] = useState ({
        contact:'',
        address:'',
        product:'',
        seller:'',
        buyer:'',
    })
    const {contact,address} = order

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
  //const load = useSelector( (state) => state.productReducer.loadProducts)

  useEffect(  ()=>{
    dispatch(getProduct(match.params.id))
    setProduct(productReducer)
    setUser(userReducer)
    setValues({...order,product:productReducer._id,seller:userReducer._id,buyer:isAuth()._id})
   },[productReducer.name,productReducer.price,productReducer.description,productReducer.description,productReducer.brand,productReducer.shipping,productReducer.type,productReducer.createdAt])

    const classes = useStyles();

    const handleChange =(name)=>(event)=>{
    
        setValues({...order,[name]:event.target.value})
    }


    const clickSubmit = event =>{
        dispatch(editProduct(productReducer._id,{active:false}))
        dispatch(addOrder(order))
    }
    return(
    <Grid container>
            
        <Grid item xs={3} md={3}></Grid>
        <Grid item xs={6} md={6} container justify='center' spacing={3}>
            <Grid item ><h1 >Make New Order</h1></Grid>
            <Grid item xs={12} md={12}>
            <Grid item ><h3 >Product Information :</h3></Grid>
            <Card className={classes.root}>
                        <img  
                  alt=''
                  className={classes.media}
                  src={`http://localhost:5000/${product.imgSrc}`}
                  
                        />
            <div className={classes.details} style={{marginRight:'auto'}}>
    
            <CardContent className={classes.content}>

                <Typography >
                {`Product Name : ${product.name}`}
                </Typography>
                <Typography >
                {`Size : ${product.size}`}
                </Typography>
                <Typography >
                {`Delivery Method: ${product.shipping}`}
                </Typography>
                <Typography >
                {`Price : ${product.price} $`}
                </Typography>
                

                <SLink  to={`/ProductDetails/${product._id}`}  style={{marginLeft:'auto'}}> 
                
                <Button variant="contained" color='grey'size="medium" >See More Details</Button> 
                </SLink>
                
            </CardContent>

            </div>

            <div className={classes.details} style={{marginRight:'auto'}}>
    
            <CardContent className={classes.content}>
                <Typography >
                    Seller informations 
                </Typography>

                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}  src={`http://localhost:5000/${user.imgSrc}`}>
                        </Avatar>}
                    title= { <SLink to={`/profile/${user.username}`}>{user.username}</SLink>}         
                />
                <Typography >
                    {`Location : ${user.location}`}
                </Typography>

                <Typography >
                    {`Email : ${user.email}`}
                </Typography>  
            </CardContent>

        </div>


                    

        </Card>
            </Grid>
            
            <Grid item xs={12} md={12} container justify='center' spacing={3}>
            <Grid item ><h3 >PLEASE FILL OUT YOUR DETAILS… IT WILL ONLY TAKE A MINUTE</h3></Grid>
           
            <Grid item xs={12} md={4}><StyledTextField value={contact} onChange={handleChange('contact')}  id="contact" label="Email or Phone" type="" variant="outlined" fullWidth/></Grid>
            <Grid item  xs={12} md={2}></Grid>
            <Grid item xs={12} md={4}><StyledTextField  value={address} onChange={handleChange('address')} id="address" label="Delivery address" type="" variant="outlined" fullWidth/></Grid>
            
            </Grid>
            <Grid item xs={12} md={4}><Pbutton black="true" children="Confirm Order"  link={"/orders"} onclick={clickSubmit}/></Grid>
      </Grid>
      <Grid item xs={3} md={3}></Grid>
    </Grid>
    )

}

export default AddOrder;