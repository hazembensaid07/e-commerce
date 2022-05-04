import React from 'react'
import {Switch,Route} from 'react-router'
import AddOrder from './AddOrder'
import orders from './Orders'




const Routes = () => {

    return (
        <Switch>
        <Route exact path="/orders" component={orders}/>
        <Route exact path="/newOrder/:id" component={AddOrder}/>
        
        
        
      </Switch>
    )

}

export default Routes;