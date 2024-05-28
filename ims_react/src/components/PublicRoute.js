import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute=({children})=> {
    const {isLogin}=useSelector((state)=>state.common)
    console.log(isLogin )

    if(isLogin) return  <Navigate to="/home" replace/>
  return children
}
export default PublicRoute;