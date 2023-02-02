import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import { AnimatePresence,motion } from "framer-motion"
import Home from './Components/Home';
import Notes from './Components/Notes';
import About from './Components/About';
import UploadNote from './Components/ModalComponents/UploadNote';
import EditNote from './Components/ModalComponents/EditNote';


function AnimatedRoute() {
  const location= useLocation();
  return (
    <AnimatePresence>
      <Routes  location={location} key={location.pathname} >
        <Route  path='/home' element={<Home/>}></Route>
        <Route  path='/notes' element={<Notes/>}></Route>
        <Route  path='/about' element={<About/>}></Route>
        <Route  path='/addnote' element={<UploadNote/>}></Route>
        <Route  path='/editnote' element={<EditNote/>}></Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoute
