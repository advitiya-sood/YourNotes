
import React, { useState } from 'react'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AnimatedRoute from './AnimatedRoute';
import NavBar from './Components/NavBar';

import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import PrivateRoutes from './PrivateRoutes';
import Home from './Components/Home';
import Notes from './Components/Notes';
import About from './Components/About';
import UploadNote from './Components/ModalComponents/UploadNote';
import EditNote from './Components/ModalComponents/EditNote';
import Error from './Components/Error';
import DataGrid from './Components/DataGridComp';
import DataGridComp from './Components/DataGridComp';




function App() {

  // const [token,setToken]=useState(localStorage.getItem('JWT-token'));
  
  return (
    <>
    <Router>
      <Routes>                               
        <Route  path='/' element={<Login/>}></Route>
        <Route  path='/register' element={<Register/>}></Route>
        <Route  path='*' element={<Error/>}></Route>
        <Route  element={<PrivateRoutes />}>                         {/* Concept of nested routes used, outlet */}
           <Route   element={<Home/>}>                               {/* naveBar in homecomponent */}
            <Route  path='/notes' element={<Notes/>}></Route>
            <Route  path='/about' element={<About/>}></Route>
            <Route  path='/DataGrid' element={<DataGridComp/>}></Route>

            <Route  path='/addnote' element={<UploadNote/>}></Route>
            <Route  path='/editnote/:noteid' element={<EditNote/>}></Route>
          </Route>
        </Route>
  
      </Routes>
        
    </Router>
    </>
  )
}

export default App

