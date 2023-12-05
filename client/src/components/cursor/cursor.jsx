import React, { useEffect, useState } from 'react';
import "./cursor.scss";
import { motion } from 'framer-motion';

const Cursor = () => {
    const [position,setPosition] =useState({x:0,y:0})

    const updateMousePosition =(e)=>{
        setPosition({x:e.clientX,y:e.clientY})
    }

    useEffect(()=>{
        
        window.addEventListener("mousemove",updateMousePosition)

        return()=>{
            window.removeEventListener("mousemove",updateMousePosition)
        }
    },[])
      return (
    <motion.div 
    className="cursor"
    animate={{x:position.x , y:position.y}}></motion.div>
  )
}

export default Cursor