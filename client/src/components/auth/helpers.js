import cookie from 'js-cookie'


//set in cookie
export const setCookie =(key, value) =>{
    if(window !== 'undefined'){
        cookie.set(key,value, {
            expires:1
        })
    }
}

//remove from cookie when user signout
export const removeCookie =(key) =>{
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires:1
        })
    }
}

//get from cookie such as stored token
export const getcookie =(key) =>{
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}

//will be useful when we need to make request to server with token 

//set in local storage
export const setLocalStorage =(key, value) =>{
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))//we need to save data in local storage as json format
    }
}
//remove from local storage
export const removeLocalStorage =(key) =>{
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) =>{
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next();
}

//access user info from localstorage
export const isAuth =() =>{
    if(window !== 'undefined'){
        const cookieChecked = getcookie('token')
        if (cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else{
                return false
            }
        }else{
            return false
        }
    }
}

export const verfAuth =()=>{
    if(localStorage.getItem('user')){
        return false
    } else{
        return true
    }
}


export const signout = next =>{
    removeCookie('token')
    removeLocalStorage('user')
    next();
}


export const updateUser =(response,next)=>{
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user',JSON.stringify(auth))
    }
    next();
}