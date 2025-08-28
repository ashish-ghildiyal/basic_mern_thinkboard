import { useState } from 'react'

import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import DetailNote from './pages/DetailNote'
import NotesNotFound from './components/NotesNotFound'

function App() {

  return (
    <>
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-note" element={<CreateNote/>} />
        <Route path="/note/:id" element={<DetailNote/>} />
        <Route path="*" element={<NotesNotFound/>} />

      </Routes>
      </div>
     
    </>
  )
}

export default App
