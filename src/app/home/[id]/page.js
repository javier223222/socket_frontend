"use client"

import Descripcion from '@/componets/Descripcion'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chat = ({params}) => {
  
  const [idChat,setIdChat]=useState(params.id)
  const [allMessages,setAllMessages]=useState([])
  const [showDescription,setShowDescription]=useState(false)
  const [message,setMessage]=useState(null)
  useEffect(()=>{

    axios.get(`http://localhost:80/foros?idforo=${params.id}`,{
      headers:{
        "x-aceess-token":localStorage.getItem("token")
      }
     }).then(data=>{
      setAllMessages(data.data.result)
      console.log(data)
     })
   




     nuevosMensajes()
    


     
  },[])
  const showDescriptionHandler=()=>{
    setShowDescription(!showDescription)
  }


  const nuevosMensajes=()=>{
    let nuevoMensaje=null
    axios.get(`http://localhost:80/foros/newmessages?idforo=${idChat}`,{
     headers:{
      "x-aceess-token":localStorage.getItem("token")
     }
   }).then((data)=>{
    nuevoMensaje=data.data
    
   }).finally(()=>{
    console.log(nuevoMensaje)
    if(nuevoMensaje){
      setAllMessages(x=>{
        return [
          ...x,
          nuevoMensaje
        ]
      })
    }
    
    nuevosMensajes()
   })


  }


  const handleChange=(e)=>{
    setMessage(e.target.value)

  }


 

 
  const addMessage=async()=>{

    if(!message){
      alert("escribe un mensaje")
      return null
    }
    const res=await axios.post(`http://localhost:80/foros`,{
      idforo:idChat,
      message:message
    },{
      headers:{
        "x-aceess-token":localStorage.getItem("token")
      }
    })

  
  }

  return (

    <div>
    {
      !showDescription?<button
       onClick={showDescriptionHandler}>Ver descripcion</button>:<></>
    }
    
    {
      showDescription?<><Descripcion idChat={idChat}></Descripcion>
       <button onClick={showDescriptionHandler}>cerrar descripcion</button>
      </>:<></>
    }
    {
      allMessages.length>0?allMessages.map((x,i)=>
      <div key={i}>
      <div>
      <h3>username  {x.username}</h3>
      </div>
      <p>{x.message}</p>
      
       
    </div>
      ):<p>no hay mensajes</p>
    }
    

    
    <input onChange={handleChange} type="text" placeholder="escribe un mensaje"></input>
    <button onClick={addMessage}>enviar</button>
    </div>
  )
}

export default Chat