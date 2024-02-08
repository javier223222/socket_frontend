import Navbar from '@/componets/navbar'
import React from 'react'

const LayoutHome = ({children}) => {
  return (
    <div>
    <Navbar></Navbar>
    
    {children}</div>
  )
}

export default LayoutHome