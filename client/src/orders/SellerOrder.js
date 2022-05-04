import { CardHeader } from '@material-ui/core';
import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {red} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { editOrder,deleteOrder } from '../JS/actions/order';
import { useDispatch } from 'react-redux';
import { editProduct } from '../JS/actions/product';

import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  last: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    
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
}));

const SLink = styled(Link)`
color:black;
text-decoration: none
`
const SellerOrder = ({order}) =>{
    const dispatch = useDispatch();

    const [confirmation, setValue] = useState({
        confirmed:order.confirmed,
        delivered:order.delivered
    });
    const {confirmed,delivered} =confirmation


    const classes = useStyles();
      
        const handleChange  =(name)=>(event)=>{
            setValue({...confirmation,[name]:event.target.value})
        };


        const clickSubmit = event =>{
          dispatch(editOrder(order._id,confirmation))
          toast.success("Order Status Updated")
      }

      const clickSubmitDelete = event =>{
        dispatch(deleteOrder(order._id,order.seller))
        dispatch(editProduct(order.product._id,{active:true}))
    }

    return(
        
        <Card className={classes.root}>
                    <img  
          alt=''
          className={classes.media}
          src={`http://localhost:5000/${order.product.imgSrc}`}
          
        />
        <ToastContainer/>
        <div className={classes.details} style={{marginRight:'auto'}}>
  
          <CardContent className={classes.content}>

            <Typography >
              {`Product Name : ${order.product.name}`}
            </Typography>
            <Typography >
            {`Size : ${order.product.size}`}
            </Typography>
            <Typography >
            {`Price : ${order.product.price} $`}
            </Typography>

            <SLink  to={`/ProductDetails/${order.product._id}`}  style={{marginLeft:'auto'}}> 
            
            <Button variant="contained" color='grey'size="medium" >See More Details</Button> 
            </SLink>
            
          </CardContent>

        </div>

        <div className={classes.details} style={{marginRight:'auto'}}>
  
         <CardContent className={classes.content}>
            <Typography >
                Buyer informations 
            </Typography>

            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}  src={`http://localhost:5000/${order.buyer.imgSrc}`}>
                    </Avatar>}
                title= { <SLink to={`/profile/${order.buyer.username}`}>{order.buyer.username}</SLink>}         
            />
            <Typography >
                {`Delivery Adress : ${order.address}`}
            </Typography>

            <Typography >
                {`Contact : ${order.contact}`}
            </Typography>  
        </CardContent>

    </div>
    


<div className={classes.details} style={{marginRight:'2rem'}}>
  
  <CardContent >
                <FormControl component="fieldset">
                <FormLabel component="legend">Confirmation</FormLabel>
                <RadioGroup row aria-label="gender" name="Confirmation" value={confirmed} onChange={handleChange('confirmed')}>
                    <FormControlLabel value={"true"} control={<Radio />} label="Confirmed" />
                    <FormControlLabel value={"false"} control={<Radio />} label="Not Confirmed" />
                </RadioGroup>
                
                <FormLabel component="legend">Delivery</FormLabel>
                <RadioGroup row aria-label="gender" name="gender1" value={delivered} onChange={handleChange('delivered')}>
                    <FormControlLabel value={"true"} control={<Radio />} label="Delivered" />
                    <FormControlLabel value={"false"} control={<Radio />} label="Not Delivered" />
                </RadioGroup>
                
               
                </FormControl>
                

  </CardContent>

</div>



<div className={classes.last}  style={{marginRight:'2rem'}}>

<Button  style={{marginTop:'1rem'}} variant="contained" color='primary'size="medium" onClick={clickSubmit}>Update</Button>
<Button  style={{marginTop:'1rem'}} variant="contained" color='secondary'size="medium" onClick={clickSubmitDelete}>Cancel Order</Button>

</div>





      </Card>
    )

}

export default SellerOrder;