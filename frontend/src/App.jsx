import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import DetailNote from './pages/DetailNote'

function App() {

  return (
    <>
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-note" element={<CreateNote/>} />
        <Route path="/note/:id" element={<DetailNote/>} />

      </Routes>
      </div>
     
    </>
  )
}

export default App
