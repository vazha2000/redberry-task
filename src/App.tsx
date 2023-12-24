import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main } from './views/Main'
import { AddBlog } from './views/AddBlog'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/add-blog" element={<AddBlog />}/>
    </Routes>
  )
}

export default App
