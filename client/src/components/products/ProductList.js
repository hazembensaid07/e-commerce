import { Grid, styled, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getProducts } from "../../JS/actions/product"
import Spinner from "../Spinner"
import Product from "./Product"

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

const ProductList = ()=>{
    const [pageNumber, setPageNumber] = useState(0);
    const numberOfpages = useSelector((state) => state.productReducer.pages);
    const pages = new Array(numberOfpages).fill(null).map((v, i) => i);
    const [name, setName] = useState("");


    const dispatch = useDispatch()
    const products = useSelector(state=>state.productReducer.products)
    const loadProducts = useSelector(state=>state.productReducer.loadProducts)

    useEffect(()=>{
        dispatch(getProducts(name,pageNumber))
    },
    [name,pageNumber])

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };
    
      const gotoNext = () => {
        setPageNumber(Math.min(numberOfpages - 1, pageNumber + 1));
      };
    
    return (
        <Grid container justify="center"  >
           
           
            <Grid item container md={10} justify="center" spacing={3}>
            <Grid item xs={12} md={12}><h2>Products available on NooVa Store</h2>        
            </Grid>
            <Grid item ><StyledTextField   onChange={(e) => setName(e.target.value)} id="name" label="Search for product" type="text" variant="outlined" /></Grid>
            <Grid item xs={12} md={12} container>
            {loadProducts && 
            <Spinner/> }
            
            { products.length !== 0 && 
            products.map(el=> <Product key={el._id} product={el}/> )}
              </Grid>
         </Grid>

         <Grid xs={12} md={12} item>   
         { numberOfpages > 1  &&  <button
              onClick={() => {
                gotoPrevious();
              }}
            >
              Previous
            </button>}

            { products.length !== 0  &&  pages.map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => {
                  setPageNumber(pageIndex);
                }}
              >
                {pageIndex + 1}
              </button>
            ))}


            { numberOfpages > 1  &&   <button
              onClick={() => {
                gotoNext();
              }}
            >
              Next
            </button>}

            {products.length === 0 && <h1>There is no course in this category</h1>}
            </Grid>
              
        </Grid>
    )
}

export default ProductList