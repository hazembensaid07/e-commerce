import React  from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
      media: {
        height: '10rem',
        width:  '10rem'
      },
    }));

const Product = ()=> {
    const classes = useStyles();
    const theme = useTheme();

  return (

    <Grid >
        <Grid item><img className={classes.media} src='http://localhost:5000/client/public/uploads/ProductsImages/P0%20(2).jpg'></img></Grid>
        <Grid item>100dt</Grid>
    </Grid>

)}

export default Product
