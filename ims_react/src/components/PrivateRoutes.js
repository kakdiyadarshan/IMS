// import { Outlet, Navigate } from 'react-router-dom'

// const PrivateRoutes = () => {

//     let token = sessionStorage.getItem('login')

//     const getAuthToken = () => {
//         if (token === undefined) {
//             return null;
//         }
//         return token;
//     }

//     let auth = getAuthToken();

//     return(
//         auth ? (<Outlet/>) : <Navigate to="/"/>
//     )
// }

// export default PrivateRoutes

import React from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import {Navigate } from 'react-router-dom'

const PrivateRoutes=({children})=> {
    const {isLogin}=useSelector((state)=>state.common)
    console.log(isLogin)
    if(!isLogin) return  <Navigate to="/" replace/>
  return children
}
export default PrivateRoutes