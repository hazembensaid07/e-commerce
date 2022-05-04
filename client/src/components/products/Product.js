import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { isAuth } from '../auth/helpers';
import {  Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { deleteProduct, getProducts } from '../../JS/actions/product';
import { useDispatch } from 'react-redux';

const SLink = styled(Link)`
color:black;
text-decoration: none
`



const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: '300px',
      width:'100%'
      // paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardcontent: {
      textAlign:'center'
    },
    
  }));

  
  const Product =({product})=>{
    const dispatch = useDispatch();
      //---------------Alert box------------------------------------------
  const [open2, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);  
  };

  const handleClose2 = () => {
    setOpen(false);  
  };

  const deleteClose =()=>{
    handleClose2()

    dispatch(deleteProduct(product._id))
    dispatch(getProducts())
    
    
  }
  //-------------------------------------------------------------------
  //---------------------Drop Mernu--------------------------------------
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);

    };

//----------------------------------------------  

    const classes = useStyles();
    const AcitveVlidation = ()=>{
      if (product.active === true){ 
      return(
        <SLink to={`/ProductDetails/${product._id}`}  style={{marginLeft:'auto'}}> <Button size="small" >See More Details</Button> </SLink>
      )}else{
        return(
            <Typography style={{marginLeft:'auto'}} variant="h6" color='error'>
            Sold Out
          </Typography>)}
    }
    
    return(
      <Grid container md={4}>
      <Grid item md={1}>   </Grid>
      <Grid item md={10}>
        <Card className={classes.root}>
                    
        <CardHeader
        
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}  src={`http://localhost:5000/${product.postedBy.imgSrc}`}>
            </Avatar>
          }
          action={ isAuth()._id === product.postedBy._id && (
         
            <div>  
              <Button  aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
              </Button>
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}><SLink to={`/EditProduct/${product._id}`}  >Edit</SLink></MenuItem>
                <MenuItem onClick={handleClose}> <span  onClick={handleClickOpen}>Delete</span></MenuItem>
              </Menu>
              <Dialog
              fullScreen={fullScreen}
              open={open2}
              onClose={handleClose2}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Delete product?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this product
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose2} color="primary">
                  Disagree
                </Button>
                <Button onClick={deleteClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            </div>
          )}

          title= { <SLink to={`/profile/${product.postedBy.username}`}>{product.postedBy.username}</SLink>}
          subheader={product.createdAt.substring(0, 10)}
        />
        <img  
          className={classes.media}
          alt=''
          src={`http://localhost:5000/${product.imgSrc}`}
          
        />
        <CardContent className={classes.cardcontent}>

          <Typography variant="body1" color="primary" component="p">
              {product.name}
          </Typography>
          <Typography variant="body2" color="primary" component="p">
              {`${product.price} $`}
          </Typography>


        </CardContent>
        <CardActions disableSpacing>

          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          
          
            {AcitveVlidation()}
          
         
        </CardActions>

      </Card>
      <Grid item md={1}></Grid>
      </Grid></Grid>
    )
}


export default Product