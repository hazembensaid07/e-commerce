import { CardHeader } from '@material-ui/core';
import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {red} from '@material-ui/core/colors';

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
}));

const SLink = styled(Link)`
color:black;
text-decoration: none
`
const BuyerOrder = ({order}) =>{
    const classes = useStyles();

const confirmation =()=>{

        if (order.confirmed === 'false')
        {
            return(    
                <Button variant="contained" color='secondary'size="medium" >Unconfirmed</Button>
            
            )}
            else{
                return(
                    <Typography >
                    <Button variant="contained" color='primary'size="medium" >Confirmed</Button>
                    </Typography>
                )
            }        
}

const delivery =()=>{

    if (order.delivered === 'false')
    {
        return(    
            <Button variant="contained" color='secondary'size="medium" >Not delivered</Button>
        
        )}
        else{
            return(
                <Typography >
                <Button variant="contained" color='primary'size="medium" >Delivered</Button>
                </Typography>
            )
        }        
}
    return(

        <Card className={classes.root}>
                    <img  
          alt=''
          className={classes.media}
          src={`http://localhost:5000/${order.product.imgSrc}`}
          
        />
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
                Seller informations 
            </Typography>

            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}  src={`http://localhost:5000/${order.seller.imgSrc}`}>
                    </Avatar>}
                title= { <SLink to={`/profile/${order.seller.username}`}>{order.seller.username}</SLink>}         
            />
            <Typography >
                {`Location : ${order.seller.location}`}
            </Typography>

            <Typography >
                {`Email : ${order.seller.email}`}
            </Typography>  
        </CardContent>

    </div>

    <div className={classes.details} style={{marginRight:'auto'}}>
  
  <CardContent className={classes.content} >

    <Typography >
      Order Details
    </Typography>
    
    <Typography style={{marginBottom:'1rem'}} >
    {confirmation()}
    </Typography>

    <Typography >
    {delivery()}
    </Typography>

    
  </CardContent>

</div>
                

      </Card>
    )

}

export default BuyerOrder;