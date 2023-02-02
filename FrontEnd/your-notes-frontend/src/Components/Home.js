import {React, useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import About from './About';
import AddNote from './ModalComponents/RootModal';
import NavBar from './NavBar';
import Notes from './Notes';

function Home() {

    
  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default Home
