import React from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import FacebookLogin from 'react-facebook-login';


const Facebook =({informParent= f => f})=>{
    const componentClicked= (response)=>{
        console.log(response)
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/auth/facebook-login`,
            data:{userID:response.userID, accessToken: response.accessToken}
        })
        .then(response=>{
            console.log("Facebook signin success",response)
            //inform parent component 
            informParent(response)
        })
        .catch(error=>{
            console.log("Facebook signin error",error.response)
        })

    }
    return (
        <div>
<FacebookLogin
    appId={`${process.env.REACT_APP_FACEBOOK_CLIENT_ID}`}
    autoLoad={false}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={componentClicked} />
        </div>
    )
}

export default Facebook