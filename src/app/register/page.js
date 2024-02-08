"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = props => {
    const [registerData,setRegisterData]=useState({
        username:null,
        email:null,
        password:null
    })
    const router=useRouter()
    const handleChange=(e)=>{
        const {value,name}=e.target
       setRegisterData(x=>{
        return {
            ...x,
            [name]:value
        }
       })



    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
           const respuesta=axios.post("http://localhost:80/auth/",{
            username:registerData.username,email:registerData.email,password:registerData.password
           })

           router.replace("/login")
           
        }catch(e){
            console.log(e)
            alert("error to regisster")
        }
    }
  return (
    <div>
        <input name='username' placeholder='username' onChange={handleChange}  ></input>
        <input name='email' placeholder='email'  onChange={handleChange} ></input>
        <input name='password' placeholder='password' onChange={handleChange} ></input>
        <button onClick={handleSubmit}>Registrarse</button>
    </div>
  )
}



export default Register