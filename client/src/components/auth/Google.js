import React from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import GoogleLogin from 'react-google-login'


const Google =({informParent= f => f})=>{
    const responseGoogle= (response)=>{
        console.log(response)
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/auth/google-login`,
            data:{idToken:response.tokenId}
        })
        .then(response=>{
            console.log("Google signin success",response)
            //inform parent component 
            informParent(response)
        })
        .catch(error=>{
            console.log("Google signin error",error.response)
        })

    }
    return (
        <div>
        <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
  />
        </div>
    )
}

export default Google