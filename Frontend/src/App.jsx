import React from 'react'
import {BrowserRouter,Routes ,Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About';
import Rescent from './pages/Rescent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about/:link' element={<About/>}/>
          <Route path='/wow' element={<About/>}/>
          <Route path='/recent' element={<Rescent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
