"use client"
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Login = props => {
    const [infoLogin,setInfoLogin]=useState({
        username:null,
        password:null
    })
    const router=useRouter()
    const handleChnages = (e) => {
        const {value,name}=e.target
        setInfoLogin(x=>{
            return {
                ...x,
                [name]:value
            }
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        
        try{
           const login=await axios.post("http://localhost:80/auth/login",{
            usernameofUser:infoLogin.username,passwordofUser:infoLogin.password
           })
           localStorage.setItem("token",login.data.token)
           router.replace("/home")

        }catch(error){
         console.log(error)
         alert("bad login")
         
        }
    }
  return (
    <div>
        <input name='username' placeholder='username' onChange={handleChnages}></input>
        <input name='password' placeholder='password' onChange={handleChnages}></input>
        <button onClick={handleSubmit}>inciar sesion</button>
    </div>
  )
}


export default Login