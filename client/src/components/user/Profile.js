import { Avatar, Divider, Grid } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserProducts } from '../../JS/actions/product';
import {useDispatch, useSelector} from "react-redux"
import Product from '../products/Product';
import Spinner from '../Spinner';



const PicAvatar = styled(Avatar)`
width:100%;
height:100%
`;

const Profile =({match})=>{
    const [values, setValues] = useState ({
        _id:'',
        username:'',
        profile_description:'',
        location:'',
        imgSrc:'',
        load:false
    })

    const dispatch = useDispatch()
    const products = useSelector(state=>state.productReducer.products)
    const loadProducts = useSelector(state=>state.productReducer.loadProducts)
    useEffect(()=>{
        loadProfile()
        dispatch(getUserProducts(match.params.username))
    },[])

const {username,profile_description,location,load,imgSrc}= values
    const loadProfile =()=>{
        axios({
            method:'GET',
            url:`${process.env.REACT_APP_API}/user/profile/${match.params.username}`
        })
        .then(response=>{
            console.log("Porfile load :",response) 
            const { _id,username,profile_description,location,imgSrc} = response.data
            setValues({...values,_id,username,profile_description,location,imgSrc,load:true})
        })
        .catch(error=>{
            console.log("profile laod error",error.response)
        })
        
    }
    const prof=()=>{
        return(
            
     <Grid container>

         <Grid item xs={0} md={3}></Grid>

            <Grid container xs={12} md={6}>
                
                  <Grid item xs={3} style={{    height: "45%"}}>
                        <PicAvatar alt="Remy Sharp" src={`http://localhost:5000/${imgSrc}`}  />
                      </Grid> 
                      <Grid item xs={2} ></Grid>
                  <Grid container justify='space-between'xs={6}  style={{    height: "40%"}}>
                      <Grid item xs={12} style={{    height: "40%"}}><h2>{username}</h2></Grid>
                      <Grid item  xs={6} style={{    height: "60%"}}><h4 >0 Profile Likes</h4></Grid>
                      <Grid item  xs={6} style={{    height: "60%"}}><h4 >{`Location : ${location}`}</h4></Grid>

                    </Grid> 
                <Grid item  xs={12} ><p style={{fontSize:"12px"}}>{profile_description}</p></Grid>
                <Grid item xs={12} > <Divider/></Grid>
                <Grid item xs={12}  style={{textAlign:'center'}}><h3>Posts</h3></Grid>
                <Grid item xs={0} md={3}></Grid>
                </Grid>
            <Grid container justify="center" >
            <Grid item md={1}></Grid>
            <Grid item container md={10}>
            
            {loadProducts ? 
            <Spinner/>
        :   ( 
            products.map(el=> <Product key={el._id} product={el}/>)
            
        ) }</Grid>
            <Grid item md={1}></Grid>
        </Grid>
                
               
            </Grid>


  
        )
    }
    const err=()=>{
        return( 
        <div style={{textAlign:'center'}}>
                {/* {JSON.stringify({match.params.username})} */}
                <h1 >User not found</h1>
                <h3>The link you followed may be broken, or the page may have been removed.Please go back to Noova home page. </h3>
        </div>
        )
       
    }
 return(
   
 <div style={{margin:"5%"}}>{load ? prof():err()}</div>

)
 }
export default Profile