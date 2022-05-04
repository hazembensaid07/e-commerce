import React from 'react'
import {Switch,Route} from 'react-router'
import signin from './components/auth/signin'
import Signup from './components/auth/Signup'
import activate from './components/auth/activate'
import home from './components/home/Home'
import product from './components/home/product'
import UploadForm from './components/UploadForm'
import Private from './components/Private'
import Admin from './components/Admin'
import PrivateRoute from './components/auth/PrivateRoute'
import AdminRoute from './components/auth/AdminRoute'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Profile from './components/user/Profile'
import ProductList from './components/products/ProductList'
import AddProduct from './components/products/AddProduct'
import EditProduct from './components/products/EditProduct'
import ProductDetails from './components/products/ProductDetails'
import Spinner from './components/Spinner'
import Chat from './components/messages/Chat'


const Routes = () => {

    return (
        <Switch>
        <Route exact path="/" component={home}/>
        <Route exact path="/product" component={product}/>
        <Route exact path="/signin" component={signin}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/activate/:token" component={activate}/>
        <Route exact path="/forgot-password" component={ForgotPassword}/>
        <Route exact path="/reset-password/:token" component={ResetPassword}/>
        <PrivateRoute exact path="/private" component={Private}/>
        <PrivateRoute exact path="/profile/:username" component={Profile}/>
        <AdminRoute exact path="/admin" component={Admin}/>
        <Route exact path="/upload" component={UploadForm}/>
        <Route exact path="/productlist" component={ProductList}/>
        <Route exact path="/AddProduct" component={AddProduct}/>
        <Route exact path="/EditProduct/:id" component={EditProduct}/>
        <Route exact path="/ProductDetails/:id" component={ProductDetails}/>
        <Route exact path="/Spinner" component={Spinner}/>
        <Route exact path="/Chat" component={Chat}/>
        
        
        
      </Switch>
    )

}

export default Routes;