import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main } from './views/Main'
import { AddBlog } from './views/AddBlog'
import { BlogPage } from './views/BlogPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/add-blog" element={<AddBlog />}/>
      <Route path="/blog/:id" element={<BlogPage />}/>
    </Routes>
  )
}

export default App
