import { useState } from 'react'

import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import NotesNotFound from './components/NotesNotFound'
import EditNote from './pages/EditNote'

function App() {

  return (
    <>
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-note" element={<CreateNote/>} />
        <Route path="/edit/:id" element={<EditNote/>} />
        <Route path="*" element={<NotesNotFound/>} />

      </Routes>
      </div>
     
    </>
  )
}

export default App
