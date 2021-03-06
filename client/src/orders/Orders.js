import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BuyerOrdersList from './BuyerOrdersList';
import SellerOrdersList from './SellerOrdersList';
import { isAuth } from '../components/auth/helpers';
import { Redirect } from 'react-router';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    tab:{
        fontSize:"100%",
        
    }
  }));

const Orders = () =>{
    const classes = useStyles();
  const [value, setValue] = React.useState(0);


  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };

  return (
    <div className={classes.root}>
        {isAuth() ?  null : <Redirect to="/signin" />}
    <AppBar position="static" color="red">
      <Tabs 
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        style={{color:'#8700FF'}}
      >
        <Tab className={classes.tab} label="My Product Orders" {...a11yProps(0)} />
        <Tab  className={classes.tab} label="My Orders" {...a11yProps(1)} />

      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
    <SellerOrdersList/>
    </TabPanel>
    <TabPanel value={value} index={1}>
    <BuyerOrdersList/>
    
    </TabPanel>


  </div>
  );
}

export default Orders;