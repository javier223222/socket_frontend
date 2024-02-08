'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const Navbar = props => {
    const [socket,setSocket]=useState(null)
    const [showadd,setShowAdd]=useState(false)
    const [datafor,setDataforo]=useState({
        nameforo:null,
        descripcion:null
    })
    const router=useRouter()
    const [foros,setForos]=useState([])
    const [token,setToken]=useState(null)
  
    useEffect(()=>{
      setToken(localStorage.getItem("token"))

      const socket=io("http://localhost:80/foros",{
        auth:{
          token:localStorage.getItem("token")
        }
      })
  
      socket.on("success",(data)=>{
        console.log("join succefully "+ data)
      })
      socket.emit("joinRoom","allforos")
      
      socket.on("newForos",(data)=>{
        console.log(data)
        setForos(data)
      })

      setSocket(socket)
    },[])

    const handleShowAdd=(e)=>{
      e.preventDefault()
      setShowAdd(x=>!x)
    }
    
    const handleChange=async(e)=>{
        const {name,value}=e.target
        setDataforo(x=>{
            return {
                ...x,
                [name]:value
            }
        })
    }

    const handleSubmit=(e)=>{
       e.preventDefault()
      socket.emit("createForo",{nameForo:datafor.nameforo,descripcionForo:datafor.descripcion},token)

    }

    const cancelAll=(e)=>{
      e.preventDefault()
      setShowAdd(x=>!x)
      setDataforo(x=>{
        return {
          nameforo:null,
          descripcion:null
        }
      })
    }

  return (
    <>
    <div>
    {
      !showadd?<button onClick={handleShowAdd} >anadir</button>:<></>
    }
        
        {
            showadd?<div>
                <input name='nameforo' placeholder='nameforo' onChange={handleChange} ></input>
                <input name='descripcion' placeholder='descripcion' onChange={handleChange} ></input>
              
                <button onClick={handleSubmit}>anadir</button>
                <button onClick={cancelAll}>cancelar</button>
            </div>:<></>

        }
    </div>
    {
      foros.map((x,i)=><div key={i}>
        <p> <Link href={`/home/${x.idforo}`} >{x.nameForo}</Link></p>
      </div>)
    }
    </>
  )
}



export default Navbar