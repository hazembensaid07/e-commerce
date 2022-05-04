import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import {isAuth,signout} from './auth/helpers'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';


const SLink = styled(Link)`
color:black;
text-decoration: none
`


const Header = ({children,history})=> {
  //Drop down menu of user ---------------
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  //-------------------------------------
  const isActive = (path) =>{
    if (history.location.pathname === path ) {
      return {color:'blue'}
  }}

  const NotAuth = ()=>{
    return(

      <Grid container >
        <Grid item md={1}><SLink to="/" style={isActive('/')}><h2 >NooVa</h2 ></SLink></Grid>
        <Grid item md={9}></Grid>
        <Grid item md={1}><SLink to="/signin" style={isActive('/signin')}><h4 >Login</h4 ></SLink></Grid>
        <Grid item md={1}><SLink to="/signup" style={isActive('/signup')}><h4>Sell something?</h4></SLink></Grid>
      </Grid>
    ) 
  }

  const Auth = ()=>{
    return(

      <Grid container >
        <Grid item md={1}><SLink to="/" style={isActive('/')}><h2 >NooVa</h2 ></SLink></Grid>
        <Grid item md={6}></Grid>
        <Grid item md={1} ><SLink to="/chat" style={isActive('/chat')}><h4>Global Chat</h4></SLink></Grid>
        <Grid item md={1} ><SLink to="/AddProduct" style={isActive('/AddProduct')}><h4>Add Product</h4></SLink></Grid>
        <Grid item md={1}><SLink to="/productlist" style={isActive('/productlist')}><h4 >Products </h4 ></SLink></Grid>
        
        
        <Grid item md={1} >
          <SLink  to="/orders" style={isActive('/orders')}><h4>My orders</h4></SLink>
        </Grid>
        <Grid item md={1}>

            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
              <h4>{isAuth().first_name  }</h4>
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {isAuth().role === 'admin' && (
                <MenuItem onClick={handleClose}><SLink to="/admin">Admin Panel</SLink></MenuItem>
              )}
              <MenuItem onClick={handleClose}><SLink onClick={() => {window.location.href=`/profile/${isAuth().username}` }} >Profile</SLink></MenuItem>
              <MenuItem onClick={handleClose}><SLink to="/private">My Account</SLink></MenuItem>
              <MenuItem onClick={handleClose}>
                  <span onClick={()=>{
                  signout(() => {
                      history.push("/")}); }}>
                        Logout
                  </span>
              </MenuItem>
            </Menu>
            </Grid>

      </Grid>
    ) 
  }

  // <div>{!isAuth() ? NotAuth() : null}</div>
  return (
    <div>{!isAuth() ? NotAuth() : Auth()}</div>
  );
};

export default withRouter(Header)
