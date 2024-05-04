import React from 'react'
import {BrowserRouter,Routes ,Route } from "react-router-dom"
import Home from './pages/Home'
import Header from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
