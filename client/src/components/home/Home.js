import React, { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getProductsRefresh } from "../../JS/actions/product"
import Grid from '@material-ui/core/Grid';
import cover from './img/cover.PNG'
import Pbutton from '../button'
import { makeStyles } from '@material-ui/core/styles';
import Spinner from "../Spinner";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign:'center'
  },
  media: {
    height: '10rem',
    width:  '10rem'
  },
  
}));


const Home = ()=> {
  const classes = useStyles();

  const dispatch = useDispatch()

    const productReducer = useSelector(state=>state.productReducer.products)
    const load = useSelector( (state) => state.productReducer.loadProducts)

    useEffect(()=>{
        dispatch(getProductsRefresh())
    },
    [])

    
  
  const product =(product)=>{
    return (
      <Grid >
      <Grid item><img alt='' className={classes.media} src={`http://localhost:5000/${product.imgSrc}`}></img></Grid>
      <Grid item>{`${product.price} $`}</Grid>
      </Grid>
    )
  }
  console.log("heeere",productReducer)


  return (<div  style={{margin:"2%"}}>
    <Grid  container md={12}  >
    <Grid item xs={1}>{load && <Spinner/>}</Grid>
      
        <Grid item xs={12} container justify="center" style={{    height: "55px"}}>
          <h1>Sell and buy</h1>
        </Grid>
        <Grid item xs={12} container justify="center" alignItems="center" >
          <Grid item ><h2>second-hand clothes from your couch.</h2></Grid>
        </Grid>

      <Grid container > 
        <Grid  item xs={1} ></Grid>
        
        <Grid  container  xs={10}  >

          <Grid container  xs={12} md={6} >
              <Grid item xs={12}  md={12}>
                <h2>What is Noova</h2>
                <p>Noova is the fashion marketplace platform where the next generation come to discover unique items. With a global community buying, selling and connecting to make fashion more inclusive, diverse and less wasteful. This is what transforming fashion looks like.</p>
              </Grid>
              <Grid item xs={8} md={4}><Pbutton children={"Get Started"}/>  </Grid> 
          </Grid>
          <Grid item xs={12} md={6}><img src={cover} alt="cover" style={{height:"80%"} ,{width:"90%"}} /></Grid>
          
        </Grid>
        
        
        <Grid  item xs={1}></Grid>
        </Grid>

    </Grid>

<Grid container  justify="center" className={classes.center}>
<Grid item xs={12}> <h2>Latest Products</h2> </Grid>
<Grid item xs={1}> </Grid>

    {productReducer.length>0 && 
        
        
        <Grid container xs={10} >
        <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3} className={classes.center}>

        <Grid item xs={3}>
        {product(productReducer[0])}
        </Grid>
        <Grid item xs={3}>
        {product(productReducer[1])}
        </Grid>
        <Grid item xs={3}>
        {product(productReducer[2])}
        </Grid>
        <Grid item xs={3}>
        {product(productReducer[3])}
        </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3} className={classes.center}>
        <Grid item xs={3}>
        {product(productReducer[4])}
        </Grid>
        <Grid item xs={3}>
        {product(productReducer[5])}
        </Grid>
        <Grid item xs={3}>
        {product(productReducer[6])}
        </Grid>
        <Grid item xs={3}>
        {product(productReducer[7])}
        </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={3}><Grid item xs={5} md={5}> </Grid><Grid item xs={2}><Pbutton link={'/productlist'} children={"Dive In+"}/> </Grid> </Grid>
        </Grid>
      
         }


        
<Grid item xs={1}></Grid>
</Grid>
</div>


)}

export default Home
