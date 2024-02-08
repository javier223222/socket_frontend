"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Descripcion = ({idChat}) => {
    const [allDescription,setAllDescription]=useState(null)
    const [editar,setEditar]=useState(false)
    const [descripcion,setDescripcion]=useState(null)
    useEffect(()=>{
      
        shortPollign()
    },[])

    const shortPollign=()=>{
        setInterval(async()=>{
           let response=await fetch(`http://localhost:80/foros/description?idforo=${idChat}`,{
            headers:{
                "x-aceess-token":localStorage.getItem("token")
            }
           })
           let data=await response.json()
           setAllDescription(data.result)
        },3000)
    }

    const handleChageDescripcion=(e)=>{

        setDescripcion(e.target.value)
        console.log(descripcion)
    }

    const editarHandler=()=>{
        setEditar(!editar)
    }
    const closeaHandler=()=>{
        setEditar(!editar)
        setDescripcion(null)
    }
  
  const handleEditar=()=>{
    try{
        if(descripcion){
            axios.patch(`http://localhost:80/foros`,{
                idforo:idChat,descripcion:descripcion
             },{
                headers:{
                    "x-aceess-token":localStorage.getItem("token")
                }
                
             })

             setEditar(!editar)


        }else{
            alert("no puedes dejar la descripcion vacia")
            return null
        }
    
    }catch(e){
      console.log(e)
      setEditar(!editar)
      alert("no puedes actualizar este grupo porque no lo creaste")
    }
  }
  return (
    <div>
    
    {
        !editar?<h1>  Descripcion del foro:
    
    {allDescription}</h1>:<></>
    }
  
   {
    !editar?
    <button onClick={editarHandler}>Editar</button>:<></>
   }
   {
    editar? <><input onChange={handleChageDescripcion} placeholder='agrega una descripcion'>
   </input>
    <button onClick={handleEditar}>Agregar</button>
    <button  onClick={closeaHandler}>Cancelar</button></>:<></>
   }
  
    </div>
  )
}

export default Descripcion